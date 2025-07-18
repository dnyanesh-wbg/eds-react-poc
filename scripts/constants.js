import { AnalyticsTypes, chartTypes, DocType } from './enum.js';

export const EXCLUDED_DISAGGREGATIONS = [
  'UNIT_MEASURE',
  'FREQ',
  'REF_AREA',
  'TIME_PERIOD',
  'URL',
];

// Mapping of month names to numbers
export const MONTH_MAP = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const FILTER_MAPPING = {
  SEX: 'SEX',
  AGE: 'AGE',
  URBANISATION: 'URB',
  COMP_BREAKDOWN_1: 'COMP1',
  COMP_BREAKDOWN_2: 'COMP2',
  COMP_BREAKDOWN_3: 'COMP3',
  FREQ: 'FREQ',
  UNIT_MEASURE: 'UNIT',
  // following are for ifc green bond filter
  BOND_TYPE: 'BOND_TYPE',
  CURRENCY: 'CURRENCY',
  DEAL_SIZE: 'DEAL_SIZE',
  ISSUER_TYPE: 'ISSUER_TYPE',
  METRIC: 'METRIC',
  TENOR_BUCKET: 'TENOR_BUCKET',
  UNIT: 'UNIT',
};

export const FILTER_MAPPING_FOR_SECOND_INDICATOR = [
  'SEX',
  'AGE',
  'URBANISATION',
  'COMP_BREAKDOWN_1',
  'COMP_BREAKDOWN_2',
  'COMP_BREAKDOWN_3',
  'FREQ',
];

export const NOT_APPLICABLE = '_Z';

export const NONE = 'None';

export const COUNTRY_LISTING_TABS = [
  { id: 'name', name: 'Name' },
  { id: 'region', name: 'Region' },
  { id: 'incomegroup', name: 'Income Group' },
];

export const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const ALL_COUNTRIES = 'All';

export const ALL_COUNTRIES_OBJECT = {
  id: 'All',
  name: 'All',
};

export const CHART_TABS = [
  { id: chartTypes.Map, name: 'Map' },
  { id: chartTypes.Trend, name: 'Trend' },
  { id: chartTypes.Correlation, name: 'Correlation' },
  { id: chartTypes.Bar, name: 'Bar' },
  { id: chartTypes.DataTable, name: 'Data Table' },
];

export const IFC_CHART_TABS = [
  { id: chartTypes.Map, name: 'Map' },
  { id: chartTypes.StackedBar, name: 'Stacked Bar' },
  { id: chartTypes.Pie, name: 'Pie' },
];

export const PLURALS = {
  sex: 'SEX',
  age: 'AGES',
  urbanisation: 'URBANISATIONS',
  // following are for ifc green bond purals
  bond_type: 'BOND TYPES',
  currency: 'CURRENCIES',
  deal_size: 'DEAL SIZES',
  issuer_type: 'ISSUER TYPES',
  metric: 'METRICS',
  tenor_bucket: 'TENOR BUCKETS',
};

export const DISAGGREGATION_LABELS = {
  sex: 'SEX',
  age: 'AGE GROUP',
};

export const INCOME_GROUPS_ORDER = ['LIC', 'LMC', 'UMC', 'HIC'];

export const LINE_CHART_OPTIONS = {
  chart: {
    type: 'line',
    height: '600',
  },
  tooltip: {
    shared: true,
  },
  exporting: {
    // allowHTML: true,
    buttons: {
      contextButton: {
        menuItems: [
          'viewFullscreen',
          'downloadPNG',
          'downloadJPEG',
          'downloadSVG',
          'printChart',
        ],
      },
    },
  },
  title: {
    text: null,
  },
  subtitle: {
    text: null,
  },
  xAxis: {
    title: {
      text: null,
    },
  },
  yAxis: {
    title: {
      text: null,
    },
    labels: {
      format: '{text}',
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: true,
    // maxHeight: 80,
  },
  plotOptions: {
    series: {
      // connectNulls: true,
      marker: {
        enabled: false,
      },
      lineWidth: 4,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 350,
        },
        chartOptions: {
          xAxis: {
            labels: {
              step: 5,
            },
          },
        },
      },
    ],
  },
};

export const BAR_CHART_COLORS = [
  '#009FDA',
  '#98252B',
  '#00AB51',
  '#EB1C2D',
  '#B88C1D',
  '#872B90',
  '#E16A2D',
  '#614776',
  '#FDB714',
  '#009CA7',
];
export const BAR_CHART_OPTIONS = {
  tooltip: {
    shared: true,
  },
  exporting: {
    // allowHTML: true,
    buttons: {
      contextButton: {
        menuItems: [
          'viewFullscreen',
          'downloadPNG',
          'downloadJPEG',
          'downloadSVG',
          'printChart',
        ],
      },
    },
  },
  title: {
    text: null,
  },
  subtitle: {
    text: null,
  },
  xAxis: {
    title: {
      text: null,
    },
  },
  yAxis: {
    title: {
      text: null,
    },
    labels: {
      format: '{text}',
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
};

export const SCATTER_CHART_OPTIONS = {
  chart: {
    type: 'scatter',
    height: '600',
    className: 'scatter-plot',
  },
  title: {
    text: null,
  },
  subtitle: {
    text: null,
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  tooltip: { enabled: true },
  plotOptions: {
    scatter: {
      animation: false,
    },
  },
  exporting: {
    buttons: {
      contextButton: {
        menuItems: [
          'viewFullscreen',
          'downloadPNG',
          'downloadJPEG',
          'downloadSVG',
          'printChart',
        ],
      },
    },
  },
};

export const COUNTRY_COLOR = '#053657';

export const DISAGGNAME_DATANAME_MAPPING = {
  SEX: 'sex',
  AGE: 'age',
  URBANISATION: 'urbanisation',
  COMP_BREAKDOWN_1: 'compBreak1',
  COMP_BREAKDOWN_2: 'compBreak2',
  COMP_BREAKDOWN_3: 'compBreak3',
  UNIT_MEASURE: 'unitMeasure',
  FREQ: 'frequency',
  REF_AREA: 'REF_AREA',
  // following are for ifc green bond dataname mapping
  BOND_TYPE: 'bondType',
  CURRENCY: 'currency',
  DEAL_SIZE: 'dealSize',
  ISSUER_TYPE: 'issuerType',
  METRIC: 'metric',
  TENOR_BUCKET: 'tenorBucket',
};

export const CORRELATION_NONE_INDICATOR_VALUE = {
  id: 'None',
  name: 'None',
};

export const API_FILTER_PARAM_NAMES = {
  sex: 'SEX',
  age: 'AGE',
  urbanisation: 'URB',
  compBreak1: 'COMP1',
  compBreak2: 'COMP2',
  compBreak3: 'COMP3',
  unitMeasure: 'UNIT',
  frequency: 'FREQ',
  // following are for ifc green bond filter pram names
  bondType: 'BOND_TYPE',
  currency: 'CURRENCY',
  dealSize: 'DEAL_SIZE',
  issuerType: 'ISSUER_TYPE',
  metric: 'METRIC',
  tenorBucket: 'TENOR_BUCKET',
};

export const ONLY_SHOW_DEFAULT = 'ALL';

export const WORLD_DEFAULT = { id: 'WLD', name: 'World' };

export const THEME_TABS = [
  {
    name: 'Overview',
    isSelected: true,
  },
  {
    name: 'People',
    isSelected: false,
  },
  {
    name: 'Prosperity',
    isSelected: false,
  },
  {
    name: 'Planet',
    isSelected: false,
  },
  {
    name: 'Infrastructure',
    isSelected: false,
  },
  {
    name: 'Digital',
    isSelected: false,
  },
  // {
  //   name: 'Custom',
  //   isSelected: false,
  // },
];

export const JUMP_TO_LIST = [
  {
    name: 'Benchmark',
    isSelected: true,
    id: 'benchmark',
  },
  {
    name: 'Featured Indicators',
    isSelected: false,
    id: 'featuredIndicators',
  },
  {
    name: 'Datasets and Surveys',
    isSelected: false,
    id: 'datasetsAndSurveys',
  },
  {
    name: 'Economy Analytics',
    isSelected: false,
    id: 'economyAnalytics',
  },
  {
    name: 'Projects',
    isSelected: false,
    id: 'featuredProjects',
  },
];

export const JUMP_TO_LIST_OVERVIEW = [
  {
    name: 'Featured Indicators',
    isSelected: true,
    id: 'featuredIndicators',
  },
  {
    name: 'Datasets and Surveys',
    isSelected: false,
    id: 'datasetsAndSurveys',
  },
  {
    name: 'Economy Analytics',
    isSelected: false,
    id: 'economyAnalytics',
  },
  {
    name: 'Projects',
    isSelected: false,
    id: 'featuredProjects',
  },
];

export const JUMP_TO_LIST_COUNTRY_ANALYTICS_PROFILE = [
  {
    name: 'Latest Reports',
    isSelected: true,
    id: 'latestReport',
  },
  {
    name: 'Tools',
    isSelected: false,
    id: 'tools',
  },
  {
    name: 'Featured Indicators',
    isSelected: true,
    id: 'featuredIndicators',
  },
  {
    name: 'Featured Datasets',
    isSelected: true,
    id: 'datasetsAndSurveys',
  },
];

export const SEARCH_LISTING_TABS = [
  { name: 'All', isSelected: true, id: 'all' },
  { name: 'Indicators', isSelected: false, id: 'indicator' },
  { name: 'Datasets', isSelected: false, id: 'dataset' },
  {
    name: 'Economy Analytics & Reports',
    isSelected: false,
    id: 'analytics',
  },
  { name: 'Insights & Resources', isSelected: false, id: 'insights-resources' },
];
export const SORT_BY_NAME_LABEL = 'Name (A-Z)';
export const SEARCH_LISTING_SORT_NAME = {
  all: 'series_description/name',
  indicator: 'series_description/name',
  dataset: 'series_description/name',
  analytics: 'series_description/name',
  'insights-resources': 'series_description/name',
};

export const SEARCH_LISTING_SORT_DATE = {
  all: 'series_description/version_statement/version_date, series_description/date_last_update',
  indicator: 'series_description/version_statement/version_date',
  dataset: 'series_description/date_last_update',
  analytics: 'series_description/date_last_update',
  'insights-resources': 'series_description/date_last_update',
};

export const COUNTRY_ANALYTICS_CATEGORIES = {
  noReports: 'No reports',
  lastYear: 'Last year',
  last5Years: 'Last 5 years',
  older: 'Older',
};

export const DISAGGREGATION_BADGE_CLASSNAMES = [
  'tui_badge_red',
  'tui_badge_yellow',
  'tui_badge_green',
  'tui_badge_blue',
  'tui_badge_purple',
  'tui_badge_lightgreen',
  'tui_badge_pink',
  'tui_badge_darkyellow',
];

export const DEFAULT_BIN_COLORS = 7;

export const COUNTRY_ANALYTICS_TABS = {
  countryAnalytics: 'Economy Analytics',
  globalReports: 'Global Reports',
  countryFactsheets: 'Economy Factsheets',
};

export const ANALYTICS_DETAIL_TABS = [
  {
    name: 'All',
    isSelected: true,
  },
  {
    name: 'Digital',
    isSelected: false,
  },
  {
    name: 'Infrastructure',
    isSelected: false,
  },
  {
    name: 'People',
    isSelected: false,
  },
  {
    name: 'Planet',
    isSelected: false,
  },
  {
    name: 'Prosperity',
    isSelected: false,
  },
];

export const ANALYTICS_DESCRIPTION = {
  countryAnalytics: 'The country analytics reports provide a comprehensive understanding of a nation\'s economic and social dynamics. They empower evidence-based policymaking, helping countries address challenges and leverage opportunities for sustainable and inclusive growth.',
  globalReports:
    'These reports offer in-depth analyses of the global economic landscape, presenting key insights into development challenges, trends, and opportunities. They propose policy recommendations and innovative solutions, contributing to evidence-based decision-making and fostering international collaboration for sustainable economic development.',
  countryFactsheets:
    'The factsheets offer a comprehensive summary of advancements made in improving the quality of policies and institutions across a range of development topics. Each factsheet comprises a curated collection of core indicators available on the Prosperity Data360 platform.',
};

export const UNIT_MEASURE_EXCEPTION = ['T', 'W_POP', 'BITS', 'BIT_S_IU'];

export const UNITS = {
  T: [
    { limit: 1_000, factor: 1_000, suffix: 'Kt' },
    { limit: 1_000_000, factor: 1_000_000, suffix: 'Mt' },
    { limit: 1_000_000_000, factor: 1_000_000_000, suffix: 'Gt' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Tt' },
  ],
  W_POP: [
    { limit: 1_000, factor: 1_000, suffix: 'Kw' },
    { limit: 1_000_000, factor: 1_000_000, suffix: 'Mw' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Gw' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Tt' },
  ],
  BITS: [
    { limit: 1_000, factor: 1_000, suffix: 'Kb' },
    { limit: 1_000_000, factor: 1_000_000, suffix: 'Mb' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Gb' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Tt' },
  ],
  BIT_S_IU: [
    { limit: 1_000, factor: 1_000, suffix: 'Kb' },
    { limit: 1_000_000, factor: 1_000_000, suffix: 'Mb' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Gb' },
    { limit: 1_000_000_000_000, factor: 1_000_000_000_000, suffix: 'Tt' },
  ],
};

export const SEARCH_ICON_MAP = {
  Indicators: 'lp-graph',
  Datasets: 'lp-dataset',
  'Insights & Resources': 'lp-double-file',
  'Economy Analytics & Reports': 'lp-report',
};

export const SEARCH_ANALYTICS_PRETITLE = {
  EconomyAnalytics: 'ECONOMY ANALYTICS',
  GlobalReport: 'GLOBAL REPORT',
  EconomyFactsheet: 'ECONOMY FACTSHEET',
};

export const DOC_TYPE_FACET = {
  [DocType.Analytics]: AnalyticsTypes.EconomyAnalytics,
  [DocType.GlobalReport]: AnalyticsTypes.GlobalReport,
  [DocType.EconomyFactsheet]: AnalyticsTypes.EconomyFactsheet,
};
