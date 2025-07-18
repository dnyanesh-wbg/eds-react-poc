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
} from '../../scripts/api.js';
import { endpointLabels } from '../../scripts/enum.js';

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
      apiEndpoint: 'https://data360apiqa.worldbank.org/data360/searchv2',
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
      apiEndpoint: 'https://extdataportalqa.worldbank.org/qa/api/data360/data/indicator',
      endpointLabel: 'data',
    },
  ],
};

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
  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'main-heading heading';
  const h2 = document.createElement('h2');
  h2.id = 'featured-news';
  h2.innerHTML = `<strong>${regionName?.toUpperCase()}</strong><span> BY THE NUMBERS</span>`;
  const paragraph = document.createElement('p');
  paragraph.className = 'button-container';
  const anchor = document.createElement('a');
  anchor.href = `/search?region=${regionCode}`;
  anchor.title = 'Explore More Data';
  anchor.className = 'button';
  anchor.setAttribute('aria-labelledby', 'featured-news');
  anchor.textContent = 'Explore More Data';
  paragraph.appendChild(anchor);
  headingWrapper.appendChild(h2);
  headingWrapper.appendChild(paragraph);
  block.appendChild(headingWrapper);
}

async function createLeftChart(block, Highcharts, chartConfig, regionCode, regionName, unitMeasureCodelist) {
  const {
    datasetId, indicatorId, endpointList, apiKeyName, apiKeyValue,
  } = chartConfig;

  const indicatorNameEndpoint = getEndpointFromConfig(endpointList, endpointLabels.Metadata)?.apiEndpoint;
  const indicatorName = await fetchIndicatorNames(indicatorNameEndpoint, [indicatorId], {
    accept: 'application/json',
    'content-type': 'application/json',
    'Ocp-Apim-Subscription-Key': apiKeyValue,
  });

  const urlsForLineChart = {
    data: getEndpointFromConfig(endpointList, endpointLabels.Data)?.apiEndpoint,
    disaggregation: getEndpointFromConfig(endpointList, endpointLabels.Disaggregation)?.apiEndpoint,
  };
  const { indicatorData } = await fetchLineChartData(urlsForLineChart, { datasetId, indicatorId, regionCode });

  const xAxis = Array.isArray(indicatorData) && indicatorData.length ? indicatorData[0].data.xAxis : [];
  const yAxisRaw = Array.isArray(indicatorData) && indicatorData.length ? indicatorData[0].data.yAxis : [];
  const unitMeasure = Array.isArray(indicatorData) && indicatorData.length ? indicatorData[0].unitMeasure : '';
  const decimals = Array.isArray(indicatorData) && indicatorData.length ? indicatorData[0].decimals : 0;
  const unitMeasureName = unitMeasureCodelist.find((item) => item.id === unitMeasure)?.name || unitMeasure;
  const latestValue = yAxisRaw.length ? parseFloat(yAxisRaw[yAxisRaw.length - 1]) || 0 : 0;
  const yAxis = yAxisRaw.map((val) => (val === 'null' ? null : parseFloat(val))).filter((val) => val !== null);
  const latestYear = xAxis.length ? xAxis[xAxis.length - 1] : '';

  const dataIndicatorChart = document.createElement('div');
  dataIndicatorChart.className = 'data-indicator-chart';
  const dataIndicatorHeader = document.createElement('div');
  dataIndicatorHeader.className = 'data-indicator-header';
  const dataIndicatorTitle = document.createElement('div');
  dataIndicatorTitle.className = 'data-indicator-title';
  const titleA = document.createElement('a');
  titleA.href = `/search?indicator=${indicatorId}`;
  titleA.textContent = `${formatNumberOnUnitMeasure(latestValue, unitMeasure, decimals)} ${formatUnitMeasure(unitMeasure, unitMeasureName)}`;
  dataIndicatorTitle.appendChild(titleA);
  const descriptionP = document.createElement('p');
  descriptionP.className = 'data-indicator-description';
  descriptionP.textContent = `${indicatorName[indicatorId]}, ${latestYear}`;
  dataIndicatorHeader.appendChild(dataIndicatorTitle);
  dataIndicatorHeader.appendChild(descriptionP);
  const dataIndicatorBlock = document.createElement('div');
  dataIndicatorBlock.className = 'data-indicator-block';
  dataIndicatorBlock.id = 'lifeChart';
  const sourceA = document.createElement('a');
  sourceA.href = '#';
  sourceA.className = 'data-indicator-flip';
  sourceA.textContent = 'source';
  dataIndicatorChart.appendChild(dataIndicatorHeader);
  dataIndicatorChart.appendChild(dataIndicatorBlock);
  dataIndicatorChart.appendChild(sourceA);
  block.appendChild(dataIndicatorChart);

  Highcharts.chart('lifeChart', {
    chart: { type: 'line', backgroundColor: null },
    title: { text: null },
    subtitle: { text: null },
    xAxis: {
      categories: xAxis,
      labels: {
        style: { color: '#7f8c8d' },
        formatter() {
          return (this.pos === 0 || this.pos === xAxis.length - 1) ? this.value : '';
        },
      },
      lineColor: '#ecf0f1',
      tickColor: '#ecf0f1',
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#ecf0f1',
      labels: {
        style: { color: '#7f8c8d' },
        formatter() {
          const ticks = this.axis.tickPositions;
          return (this.value === ticks[0] || this.value === ticks[ticks.length - 1]) ? this.value : '';
        },
      },
    },
    tooltip: {
      ...LINE_CHART_OPTIONS.tooltip,
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      useHTML: true,
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
      name: indicatorName[indicatorId],
      data: yAxis.map((val) => parseFloat(val) || null),
      color: COLOR_MAP[regionCode],
      lineWidth: 2,
      marker: { enabled: false },
    }],
    legend: { enabled: false },
    credits: { enabled: false },
  });
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
        if (yAxis[i] !== null && yAxis[i] !== undefined && latestValue === null) {
          latestValue = yAxis[i];
        } else if (yAxis[i] !== null && yAxis[i] !== undefined && latestValue !== null && secondLatestValue === null) {
          secondLatestValue = yAxis[i];
        }
        if (latestValue !== null && secondLatestValue !== null) break;
      }
      const value = latestValue !== null ? latestValue : 'N/A';
      const hasIncreased = latestValue !== null && secondLatestValue !== null ? latestValue > secondLatestValue : false;

      return {
        id,
        label: indicatorNames[id] || id,
        value: value !== 'N/A' ? `${formatNumberOnUnitMeasure(value, unitMeasure, decimals)}` : value,
        hasIncreased,
      };
    }),
  );

  const dataIndicatorWrapper = document.createElement('div');
  dataIndicatorWrapper.className = 'data-indicator-wrapper';
  const ul = document.createElement('ul');
  ul.className = 'data-indicator-list';
  indicatorListData.forEach((stat) => {
    const li = document.createElement('li');
    li.className = 'data-indicator-item';
    const listTitle = document.createElement('div');
    listTitle.className = 'data-indicator-listtitle';
    const a = document.createElement('a');
    a.href = `/search?indicator=${stat.id}`;
    a.textContent = stat.label;
    listTitle.appendChild(a);
    const valueP = document.createElement('p');
    valueP.className = 'data-indicator-value';
    valueP.textContent = stat.value;
    li.appendChild(listTitle);
    li.appendChild(valueP);
    const arrowDiv = document.createElement('div');
    arrowDiv.className = stat.hasIncreased ? 'data-up-arrow' : 'data-down-arrow';
    li.appendChild(arrowDiv);
    ul.appendChild(li);
  });
  dataIndicatorWrapper.appendChild(ul);
  block.appendChild(dataIndicatorWrapper);
}

export default async function decorate(block) {
  const Highcharts = await loadHighchartsScript();
  const regionCode = config.selector || 'MEA';

  const codeListRefArea = getEndpointFromConfig(config.endpointList, endpointLabels.Codelist)?.apiEndpoint;
  const regionName = await fetchRegionName(`${codeListRefArea}?type=REF_AREA`, regionCode);

  const unitMeasureEndpoint = getEndpointFromConfig(config.endpointList, endpointLabels.Codelist)?.apiEndpoint;
  const unitMeasureCodelist = await fetchUnitMeasureCodelist(`${unitMeasureEndpoint}?type=UNIT_MEASURE`);

  await createHeader(block, regionCode, regionName);

  const dataIndicatorContainer = document.createElement('section');
  dataIndicatorContainer.className = 'default bg-neutrals-10-gradient data-indicator-container';
  dataIndicatorContainer.setAttribute('data-section-status', 'loaded');
  dataIndicatorContainer.setAttribute('data-sec-spacing', 'section-padding-between');
  dataIndicatorContainer.setAttribute('data-sec-spacing-bottom', 'section-padding-between');

  const wrapperDiv = document.createElement('div');
  block.appendChild(dataIndicatorContainer);
  dataIndicatorContainer.appendChild(wrapperDiv);

  await createLeftChart(wrapperDiv, Highcharts, config, regionCode, regionName, unitMeasureCodelist);
  await createRightIndicators(wrapperDiv, config, regionCode, unitMeasureCodelist);
}
