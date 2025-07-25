/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { COLOR_MAP } from '../../scripts/theme.js';
import { LINE_CHART_OPTIONS } from '../../scripts/constants.js';
import { formatNumberOnUnitMeasure, formatUnitMeasure, getEndpointFromConfig } from '../../scripts/helpers.js';
import {
  fetchRegionName,
  fetchUnitMeasureCodelist,
  fetchIndicatorNames,
  fetchLineChartData,
  fetchIndicatorValue,
  fetchIndicatorMetadata,
} from '../../scripts/api.js';
import { endpointLabels } from '../../scripts/enum.js';

function loadHighchartsScript() {
  return new Promise((resolve) => {
    if (window.Highcharts) {
      resolve(window.Highcharts);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://code.highcharts.com/highcharts.js';
    script.onload = () => resolve(window.Highcharts);
    document.head.appendChild(script);
  });
}

async function createHeader(block, regionCode, regionName) {
  block.innerHTML = `
    <div class="main-heading heading">
      <h2 id="featured-news"><strong>${regionName?.toUpperCase()}</strong><span> BY THE NUMBERS</span></h2>
      <p class="button-container">
        <a href="/search?region=${regionCode}" title="Explore More Data" class="button" aria-labelledby="featured-news">Explore More Data</a>
      </p>
    </div>
  `;
}

async function createLeftChart(block, Highcharts, chartConfig, regionCode, regionName, unitMeasureCodelist) {
  const {
    datasetId, indicatorId, endpointList, apiKeyName, apiKeyValue,
  } = chartConfig;

  const indicatorNameEndpoint = getEndpointFromConfig(endpointList, endpointLabels.Metadata)?.apiEndpoint;
  const indicatorMetadata = await fetchIndicatorMetadata(
    indicatorNameEndpoint,
    [indicatorId],
    {
      accept: 'application/json',
      'content-type': 'application/json',
      [apiKeyName]: apiKeyValue,
    },
  );

  const urlsForLineChart = {
    data: getEndpointFromConfig(endpointList, endpointLabels.Data)?.apiEndpoint,
    disaggregation: getEndpointFromConfig(endpointList, endpointLabels.Disaggregation)?.apiEndpoint,
  };
  const { indicatorData } = await fetchLineChartData(urlsForLineChart, { datasetId, indicatorId, regionCode });

  const xAxis = indicatorData[0]?.data?.xAxis || [];
  const yAxisRaw = indicatorData[0]?.data?.yAxis || [];
  const unitMeasure = indicatorData[0]?.unitMeasure || '';
  const decimals = indicatorData[0]?.decimals || 0;
  const unitMeasureName = unitMeasureCodelist.find((item) => item.id === unitMeasure)?.name || unitMeasure;

  const latestValue = yAxisRaw.length
    ? parseFloat(yAxisRaw[yAxisRaw.length - 1]) || 0
    : 0;

  let secondLatestValue = null;
  // eslint-disable-next-line no-plusplus
  for (let i = yAxisRaw.length - 2; i >= 0; i--) {
    const v = parseFloat(yAxisRaw[i]);
    if (!Number.isNaN(v)) {
      secondLatestValue = v;
      break;
    }
  }
  const hasIncreased = secondLatestValue !== null ? latestValue > secondLatestValue : true;

  const yAxis = yAxisRaw
    .map((val) => (val === 'null' ? null : parseFloat(val)))
    .filter((val) => val !== null);

  const latestYear = xAxis.length ? xAxis[xAxis.length - 1] : '';

  const dataIndicatorChart = document.createElement('div');
  dataIndicatorChart.className = 'data-indicator-chart hover';
  dataIndicatorChart.innerHTML = `
    <div class="data-indicator-header">
      <div class="data-indicator-title">
        <a href="/search?indicator=${indicatorId}">${formatNumberOnUnitMeasure(latestValue, unitMeasure, decimals)} ${formatUnitMeasure(unitMeasure, unitMeasureName)} <i class="lp lp-arrow-${hasIncreased ? 'up' : 'down'}"></i></a>
      </div>
      <p class="data-indicator-description">${indicatorMetadata?.series_description?.name}, ${latestYear}</p>
    </div>
    <div class="data-indicator-block" id="lifeChart"></div>
    <a href="#" class="data-indicator-flip">source</a>
  `;

  const sourceLink = dataIndicatorChart.querySelector('.data-indicator-flip');
  sourceLink.addEventListener('click', (e) => {
    e.preventDefault();
    const sources = indicatorMetadata?.series_description?.sources || [];
    const sourceContent = sources.map((item, index) => {
      const sourceText = item.uri
        ? `<a href="${item.uri}" target="_blank">${item.source || (item.name ? `${item.name}, ${item.organization}` : item.organization)}</a>`
        : item.source || (item.name ? `${item.name}, ${item.organization}` : item.organization);
      return index > 0 ? `; ${sourceText}` : sourceText;
    }).join('');

    const datasetName = indicatorMetadata?.series_description?.database_name || '';
    const datasetUrl = `/search?dataset=${indicatorMetadata?.series_description?.database_id}`;

    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'data-indicator-source';
    sourceDiv.innerHTML = `
      <button class="close-icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.08 21.9134C19.8622 22.6955 21.1303 22.6955 21.9124 21.9134C22.6946 21.1312 22.6946 19.8631 21.9124 19.081L14.8314 12L21.9123 4.91901C22.6945 4.13686 22.6945 2.86875 21.9123 2.08661C21.1302 1.30446 19.8621 1.30446 19.0799 2.08661L11.999 9.16756L4.9181 2.08661C4.13596 1.30447 2.86785 1.30447 2.08571 2.08661C1.30357 2.86876 1.30357 4.13687 2.08571 4.91901L9.16664 12L2.08563 19.081C1.30349 19.8631 1.30349 21.1312 2.08563 21.9134C2.86777 22.6955 4.13587 22.6955 4.91802 21.9134L11.999 14.8324L19.08 21.9134Z" fill="#000D1A" fill-opacity="0.7"></path>
        </svg>
      </button>
      <div>
        <p class="tui__sm_title">Source: ${sourceContent}</p>
        <p class="tui__sm_title">Dataset: <a href="${datasetUrl}">${datasetName}</a></p>
        <p><a href="" class="button">Go to Data 360</a></p>
      </div>
    `;
    sourceDiv.querySelector('.close-icon').addEventListener('click', () => sourceDiv.remove());
    dataIndicatorChart.appendChild(sourceDiv);
  });

  block.appendChild(dataIndicatorChart);

  const lineChartOptions = {
    ...LINE_CHART_OPTIONS,
    chart: { type: 'line', backgroundColor: null },
    title: { text: null },
    subtitle: { text: null },
    xAxis: {
      categories: xAxis,
      labels: {
        style: { color: 'rgba(0,0,0,0.6)', fontSize: '12px' },
        formatter() {
          if (this.isFirst) return this.value;
          if (this.isLast) return `<span style="padding-right: 10px;">${this.value}</span>`;
          return '';
        },
        align: 'center',
        x: 0,
        y: 20,
      },
      lineColor: 'transparent',
      tickColor: '#ecf0f1',
      tickPositioner() {
        return [0, this.categories.length - 1];
      },
      tickPosition: 'middle',
      tickAmount: 2,
      gridLineWidth: 0,
      tickmarkPlacement: 'on',
      tickLength: 8,
      tickWidth: 1,
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#c2d0dd',
      gridLineDashStyle: 'Dash',
      plotLines: [{
        color: 'rgba(0, 0, 0, 0.22)',
        dashStyle: 'Dash',
        width: 1,
        value: Math.max(...yAxis),
        zIndex: 5,
        label: { text: '', align: 'right' },
      }],
      tickPositions: [Math.min(...yAxis) || 0, Math.max(...yAxis)],
      endOnTick: false,
      startOnTick: false,
      lineWidth: 0,
      gridLineWidth: 1,
      tickWidth: 0,
      labels: {
        style: { color: 'rgba(0,0,0,0.6)', fontSize: '12px' },
        formatter() {
          return formatNumberOnUnitMeasure(this.value, unitMeasure, decimals);
        },
      },
    },
    tooltip: {
      ...LINE_CHART_OPTIONS.tooltip,
      useHTML: true,
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      style: { padding: 0 },
      formatter() {
        const title = `<div class="tui_chart_tooltip_title" style="font-size: 14px; font-weight: 600; line-height: 16px; color: rgba(0, 0, 0, 0.87); padding-bottom: 4px; margin-bottom: 4px; border-bottom: 1px solid #CED4DE;">${this?.points?.[0]?.category}</div>`;
        const points = this?.points?.map((point) => {
          const symbol = '●';
          const symbolStyle = `font-size: 17px; color: ${point.color}; margin-right: 8px; vertical-align: middle; display: inline-block;`;
          return `<li style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 4px;">
                      <div class="tooltip_country" style="display: flex; align-items: center; min-width: 150px; padding-right: 10px;">
                        <span style="${symbolStyle}">${symbol}</span>
                        ${regionName} 
                      </div>
                      <span class="tooltip_value" style="font-size: 16px; font-weight: 700; line-height: 20px; color: rgba(0, 0, 0, 0.87);">
                        ${formatNumberOnUnitMeasure(point.y, unitMeasure, decimals)} ${formatUnitMeasure(unitMeasure, unitMeasureName)}
                      </span>
                    </li>`;
        }).join('');

        return `<div class="tui_chart_tooltip" style="border: 0.5px solid #CED4DE; background: #FFF; padding: 6px 8px; box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15); width: auto;">
                  ${title}
                  <ul style="padding-left: 0; list-style: none; margin: 0;">${points}</ul>
                </div>`;
      },
    },
    series: [{
      name: indicatorMetadata[indicatorId],
      data: yAxis,
      color: COLOR_MAP[regionCode],
      lineWidth: 2,
      marker: { enabled: false },
      connectNulls: true,
    }],
    legend: { enabled: false },
    credits: { enabled: false },
  };

  Highcharts.chart('lifeChart', lineChartOptions);
}

async function createRightIndicators(block, chartConfig, regionCode, unitMeasureCodelist) {
  const { indicatorIdsRightPanel, endpointList, apiKeyValue } = chartConfig;
  const datasetIds = indicatorIdsRightPanel.map((id) => `${id.split('_')[0]}_${id.split('_')[1]}`);

  const indicatorNameEndpoint = getEndpointFromConfig(endpointList, endpointLabels.Metadata)?.apiEndpoint;
  const indicatorNames = await fetchIndicatorNames(indicatorNameEndpoint, indicatorIdsRightPanel, {
    accept: 'application/json',
    'content-type': 'application/json',
    'ocp-apim-subscription-key': apiKeyValue,
  });

  const indicatorListData = await Promise.all(
    indicatorIdsRightPanel.map(async (id, index) => {
      const datasetId = datasetIds[index];
      const urlsForIndicatorValue = {
        data: getEndpointFromConfig(endpointList, endpointLabels.Data)?.apiEndpoint,
        disaggregation: getEndpointFromConfig(endpointList, endpointLabels.Disaggregation)?.apiEndpoint,
      };
      const indicatorData = await fetchIndicatorValue(urlsForIndicatorValue, { datasetId, indicatorId: id, regionCode });
      const unitMeasure = indicatorData?.unitMeasure || '';
      const unitMeasureName = unitMeasureCodelist.find((item) => item.id === unitMeasure)?.name || unitMeasure;
      const decimals = indicatorData?.decimals || 0;
      const yAxisRaw = indicatorData?.data?.yAxis || [];
      const yAxis = yAxisRaw.map((val) => (val === 'null' ? null : parseFloat(val))).filter((val) => val !== null);

      let latestValue = null;
      let secondLatestValue = null;
      // eslint-disable-next-line no-plusplus
      for (let i = yAxis.length - 1; i >= 0; i--) {
        if (yAxis[i] != null && latestValue === null) {
          latestValue = yAxis[i];
        } else if (yAxis[i] != null && latestValue !== null && secondLatestValue === null) {
          secondLatestValue = yAxis[i];
        }
        if (latestValue !== null && secondLatestValue !== null) break;
      }

      const value = latestValue !== null ? latestValue : 'N/A';
      const hasIncreased = latestValue !== null && secondLatestValue !== null
        ? latestValue > secondLatestValue
        : true;

      return {
        id,
        label: indicatorNames[id] || id,
        value: value !== 'N/A'
          ? `${formatNumberOnUnitMeasure(value, unitMeasure, decimals)}`
          : value,
        hasIncreased,
      };
    }),
  );

  const dataIndicatorWrapper = document.createElement('div');
  dataIndicatorWrapper.className = 'data-indicator-wrapper';
  const listItems = indicatorListData.map((stat) => `
    <li class="data-indicator-item">
      <div class="data-indicator-listtitle">
        <a href="/search?indicator=${stat.id}">${stat.label}</a>
      </div>
      <p class="data-indicator-value">${stat.value}</p>
      <div class="${stat.hasIncreased ? 'data-up-arrow' : 'data-down-arrow'}"></div>
    </li>
  `).join('');
  dataIndicatorWrapper.innerHTML = `<ul class="data-indicator-list">${listItems}</ul>`;
  block.appendChild(dataIndicatorWrapper);
}

export default async function decorate(block) {
  const configs = document.getElementsByClassName('charts-container')?.[0]?.dataset;
  const Highcharts = await loadHighchartsScript();
  // const config = {
  //   selector: configs.selector,
  //   endpointList: JSON.parse(configs.endpointlist),
  //   indicatorIdsRightPanel: JSON.parse(configs.indicatoridsrightpanel),
  //   datasetId: configs.datasetid,
  //   indicatorId: configs.indicatorid,
  //   apiKeyName: configs.apikeyname,
  //   apiKeyValue: configs.apikeyvalue,
  // };
  const config = {
    apiKeyName: 'Ocp-Apim-Subscription-Key',
    apiKeyValue: '24c5af8777164761a1e05493970181fe',
    selector: 'MEA',
    datasetId: 'WB_WDI',
    indicatorId: 'WB_WDI_SP_DYN_LE00_IN',
    indicatorIdsRightPanel: [
      'WB_WDI_SP_DYN_LE00_IN',
      'WB_HCP_SE_LPV_PRIM',
      'WB_WDI_SP_POP_TOTL',
      'WB_HNP_SE_ENRR',
      'WB_HCP_UISSCHBSP1WELEC',
    ],
    endpointList: [
      {
        apiEndpoint: 'https://data360api.worldbank.org/data360/searchv2',
        endpointLabel: 'metadata',
      },
      {
        apiEndpoint: 'https://extdataportalqa.worldbank.org/qa/api/data360/metadata/codelist',
        endpointLabel: 'codelist',
      },
      {
        apiEndpoint: 'https://extdataportalqa.worldbank.org/qa/api/data360/metadata/disaggregation',
        endpointLabel: 'disaggregation',
      },
      {
        apiEndpoint: 'https://extdataportal.worldbank.org/api/data360/data/indicator',
        endpointLabel: 'data',
      },
    ],
  };
  const regionCode = configs.selector;
  console.log('configs', config);

  const codeListRefArea = getEndpointFromConfig(config.endpointList, endpointLabels.Codelist)?.apiEndpoint;
  const regionName = await fetchRegionName(`${codeListRefArea}?type=REF_AREA`, regionCode);

  const unitMeasureEndpoint = getEndpointFromConfig(config.endpointList, endpointLabels.Codelist)?.apiEndpoint;
  const unitMeasureCodelist = await fetchUnitMeasureCodelist(`${unitMeasureEndpoint}?type=UNIT_MEASURE`);

  await createHeader(block, regionCode, regionName);

  const dataIndicatorContainer = document.createElement('section');
  dataIndicatorContainer.className = 'default bg-neutrals-10-gradient data-indicator-container';
  dataIndicatorContainer.setAttribute('data-sec-spacing', 'section-padding-between');
  dataIndicatorContainer.setAttribute('data-sec-spacing-bottom', 'section-padding-between');

  const wrapperDiv = document.createElement('div');
  block.appendChild(dataIndicatorContainer);
  dataIndicatorContainer.appendChild(wrapperDiv);

  await createLeftChart(wrapperDiv, Highcharts, config, regionCode, regionName, unitMeasureCodelist);
  await createRightIndicators(wrapperDiv, config, regionCode, unitMeasureCodelist);
}
