import { COLOR_MAP } from '../../scripts/theme.js';

async function fetchRegionName(regionCode) {
  const response = await fetch('https://extdataportalqa.worldbank.org/qa/api/data360/metadata/codelist?type=REF_AREA');
  const data = await response.json();
  const region = data.REF_AREA.find((item) => item.id === regionCode);
  return region ? region.name : regionCode;
}

async function fetchLineChartData({ datasetId, indicatorId, regionCode }) {
  const url = `https://extdataportalqa.worldbank.org/qa/api/data360/data/indicator?filter=DATASET='${datasetId}' AND IND_ID='${indicatorId}' AND REF_AREA='${regionCode}'`;
  const response = await fetch(url);
  const data = await response.json();
  if (!Array.isArray(data) || !data.length) return { xAxis: [], yAxis: [] };
  const { xAxis, yAxis } = data[0].data;
  return { xAxis, yAxis };
}

async function fetchIndicatorName(indicatorId) {
  const response = await fetch('https://data360apiqa.worldbank.org/data360/searchv2', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'ocp-apim-subscription-key': '24c5af8777164761a1e05493970181fe',
    },
    body: JSON.stringify({
      count: true,
      facets: [],
      orderby: '',
      select: 'series_description/idno,series_description/name,series_description/database_id,additional',
      searchFields: '',
      search: '*',
      top: 1000,
      skip: 0,
      filter: `series_description/idno eq '${indicatorId}'`,
    }),
  });
  const result = await response.json();
  return result?.value?.[0]?.series_description?.name || indicatorId;
}

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

export default async function decorate(block) {
  const Highcharts = await loadHighchartsScript();
  const data = window.chartsData;
  const regionCode = data?.regionCode || 'LCN';
  const regionName = await fetchRegionName(regionCode);
  const datasetId = data?.datasetId || 'WB_WDI';
  const indicatorId = data?.indicatorId || 'WB_WDI_SP_DYN_LE00_IN';
  const indicatorName = await fetchIndicatorName(indicatorId);
  const { xAxis, yAxis } = await fetchLineChartData({ datasetId, indicatorId, regionCode });
  const latestValue = parseFloat(yAxis[yAxis.length - 1]);
  const latestYear = xAxis[xAxis.length - 1];

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

  const dataIndicatorContainer = document.createElement('section');
  dataIndicatorContainer.className = 'default bg-neutrals-10-gradient data-indicator-container';
  dataIndicatorContainer.setAttribute('data-section-status', 'loaded');
  dataIndicatorContainer.setAttribute('data-sec-spacing', 'section-padding-between');
  dataIndicatorContainer.setAttribute('data-sec-spacing-bottom', 'section-padding-between');

  const wrapperDiv = document.createElement('div');

  const dataIndicatorChart = document.createElement('div');
  dataIndicatorChart.className = 'data-indicator-chart';

  const dataIndicatorHeader = document.createElement('div');
  dataIndicatorHeader.className = 'data-indicator-header';
  const dataIndicatorTitle = document.createElement('div');
  dataIndicatorTitle.className = 'data-indicator-title';
  const titleA = document.createElement('a');
  titleA.href = `/search?indicator=${indicatorId}`;
  titleA.textContent = `${latestValue.toFixed()} Years`;
  dataIndicatorTitle.appendChild(titleA);
  const descriptionP = document.createElement('p');
  descriptionP.className = 'data-indicator-description';
  descriptionP.textContent = `${indicatorName}, ${latestYear}`;
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

  const dataIndicatorWrapper = document.createElement('div');
  dataIndicatorWrapper.className = 'data-indicator-wrapper';
  const ul = document.createElement('ul');
  ul.className = 'data-indicator-list';

  data.indicators.forEach((stat) => {
    const li = document.createElement('li');
    li.className = 'data-indicator-item';
    const listTitle = document.createElement('div');
    listTitle.className = 'data-indicator-listtitle';
    const a = document.createElement('a');
    a.href = `/search?indicator=${stat.id || stat.label}`;
    a.textContent = stat.label;
    listTitle.appendChild(a);
    const valueP = document.createElement('p');
    valueP.className = 'data-indicator-value';
    valueP.textContent = stat.value;
    li.appendChild(listTitle);
    li.appendChild(valueP);
    if (stat.hasIncreased) {
      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'data-up-arrow';
      li.appendChild(arrowDiv);
    }
    ul.appendChild(li);
  });

  dataIndicatorWrapper.appendChild(ul);

  wrapperDiv.appendChild(dataIndicatorChart);
  wrapperDiv.appendChild(dataIndicatorWrapper);

  dataIndicatorContainer.appendChild(wrapperDiv);
  block.appendChild(dataIndicatorContainer);

  Highcharts.chart('lifeChart', {
    chart: {
      type: 'line',
      backgroundColor: null,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
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
    series: [{
      name: 'Life Expectancy',
      data: yAxis.map((val) => parseFloat(val)),
      color: COLOR_MAP[regionCode],
      lineWidth: 2,
      marker: { enabled: false },
    }],
    legend: { enabled: false },
    credits: { enabled: false },
  });
}
