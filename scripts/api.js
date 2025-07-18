/* eslint-disable max-len */
import { buildDisaggregationFiltersWithT } from './helpers.js';

let controller = null;

const fetchData = async (
  endpoint,
  method = 'GET',
  data = null,
  headers = {},
  cancelToken = false,
) => {
  const url = `${endpoint}`;

  if (cancelToken && controller) {
    controller.abort();
  }

  let signal;

  if (cancelToken) {
    controller = new AbortController();
    signal = controller.signal;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
      ...(cancelToken && { signal }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request canceled:', error.message);
    } else if (error.message.includes('HTTP error')) {
      console.error('Request failed with status:', error.message.split('status: ')[1]);
    } else {
      console.error('Request setup error:', error.message);
    }
    throw error;
  }
};

export async function fetchRegionName(url, regionCode) {
  const data = await fetchData(url);
  const region = data?.REF_AREA.find((item) => item?.id === regionCode);
  return region ? region?.name : regionCode;
}

export async function fetchDisaggregationData(url, { datasetId, indicatorId }) {
  try {
    const data = await fetchData(url.replace('{datasetId}', datasetId).replace('{indicatorId}', indicatorId));
    return data || [];
  } catch (error) {
    console.error('Error fetching disaggregation data:', error);
    return [];
  }
}

export async function fetchUnitMeasureCodelist(url) {
  try {
    const data = await fetchData(url);
    return data.UNIT_MEASURE || [];
  } catch (error) {
    console.error('Error fetching unit measure codelist:', error);
    return [];
  }
}

export async function fetchIndicatorNames(url, indicatorIds, headers) {
  const data = {
    count: true,
    facets: [],
    orderby: '',
    select: 'series_description/idno,series_description/name,series_description/database_id,additional',
    searchFields: '',
    search: '*',
    top: 1000,
    skip: 0,
    filter: `series_description/idno eq ${indicatorIds.map((id) => `'${id}'`).join(' or series_description/idno eq ')}`,
  };
  const response = await fetchData(url, 'POST', data, headers);
  return response?.value?.reduce((acc, item) => {
    acc[item.series_description.idno] = item.series_description.name;
    return acc;
  }, {}) || {};
}

export async function fetchLineChartData(url, { datasetId, indicatorId, regionCode }) {
  const baseParams = `filter=DATASET='${datasetId}' AND IND_ID='${indicatorId}' AND REF_AREA='${regionCode}'`;

  const disaggregationData = await fetchDisaggregationData(`${url.disaggregation}?datasetId=${datasetId}&indicatorId=${indicatorId}`, { datasetId, indicatorId });
  const { params: paramsWithT, isSecondAPICallEligible } = buildDisaggregationFiltersWithT(baseParams, disaggregationData, true);
  let dataUrl = `${url.data}?${paramsWithT}`;

  let data = await fetchData(dataUrl);
  if ((!Array.isArray(data) || !data.length) && isSecondAPICallEligible) {
    const { params: paramsWithoutT } = buildDisaggregationFiltersWithT(baseParams, disaggregationData, false);
    dataUrl = `${url.data}?${paramsWithoutT}`;
    data = await fetchData(dataUrl);
  }

  return { indicatorData: data, disaggregationData };
}

export async function fetchIndicatorValue(url, { datasetId, indicatorId, regionCode }) {
  const baseParams = `filter=DATASET='${datasetId}' AND IND_ID='${indicatorId}' AND REF_AREA='${regionCode}'`;

  const disaggregationData = await fetchDisaggregationData(url.disaggregation, { datasetId, indicatorId });
  const { params: paramsWithT, isSecondAPICallEligible } = buildDisaggregationFiltersWithT(baseParams, disaggregationData, true);
  let dataUrl = `${url.data}?${paramsWithT}`;

  let data = await fetchData(dataUrl);
  if ((!Array.isArray(data) || !data.length) && isSecondAPICallEligible) {
    const { params: paramsWithoutT } = buildDisaggregationFiltersWithT(baseParams, disaggregationData, false);
    dataUrl = `${url.data}?${paramsWithoutT}`;
    data = await fetchData(dataUrl);
  }

  return Array.isArray(data) && data.length ? data[0] : null;
}

export default fetchData;
