export const featureType = {
  IndicatorProfile: 'indicatorProfile',
  CountryListing: 'countryListing',
  ThemeProfile: 'themeProfile',
  TopicProfile: 'topicProfile',
  CountryProfile: 'countryProfile',
  CustomReport: 'customReport',
  CustomPage: 'customPage',
  IndicatorListing: 'indicatorListing',
  ThemeListing: 'themeListing',
  DatasetProfile: 'datasetProfile',
  SearchListing: 'searchListing',
  CountryAnalytics: 'countryAnalytics',
  countryAnalyticsProfile: 'countryAnalyticsProfile',
  CountryEconomyMap: 'countryEconomyMap',
  GlobalReports: 'globalReports',
  ReportsAndTemplates: 'reportsAndTemplates',
  TemplateWorkflow: 'templateWorkflow',
  CountryFactsheets: 'countryFactsheets',
  SemanticSearch: 'semanticSearch',
};

export const chartTypes = {
  Map: 'map',
  Trend: 'trend',
  Bar: 'bar',
  Correlation: 'correlation',
  DataTable: 'datatable',
  CountryIndicatorDataTable: 'countryIndicatorDataTable',
  StackedBar: 'stackedBar',
  Pie: 'pie',
};

export const customReportFilterParams = {
  SelectedTabId: 'selectedTabId',
  Countries: 'countries',
  SecondIndicatorId: 'secondIndicatorId',
  SelectedUnitMeasure: 'selectedUnitMeasure',
  SelectedUnitMeasureName: 'selectedUnitMeasureName',
  DefaultUnitMeasure: 'defaultUnitMeasure',
  SelectedSecondUnitMeasure: 'selectedSecondUnitMeasure',
  SelectedAverages: 'selectedAverages',
  SelectedComparisonType: 'selectedComparisonType',
  SelectedOnlyShow: 'selectedOnlyShow',
  RecentYearSelection: 'recentYearSelection',
  SelectedMinYear: 'selectedMinYear',
  SelectedMaxYear: 'selectedMaxYear',
  SelectedSingleYear: 'selectedSingleYear',
  Reset: 'reset',
  headerSelectedCountries: 'headerSelectedCountries',
  headerSelectedAllShow: 'headerSelectedAllShow',
  zoomLevel: 'zoomLevel',
};

export const customReportMessages = {
  UnsavedTitle: 'Save title before continuing',
  UnsavedDescTitle: 'Save description before continuing',
  UnsavedIndicator: 'Save indicator before continuing',
  EmptyIndicatorList: 'Please add at least 1 indicator',
  SingleReportDelete: 'Report has been deleted successfully',
  BulkReportDelete: 'Reports have been deleted successfully',
  JsonError: 'Something went wrong!(Json format error)',
  SomethingWrongMsg: 'Something went wrong!',
  DraftAlert:
    'You must finish drafting the components into the report, before you can save the report.', // 'Some of the items listed below were not saved',
  WrongTemplateReport: 'The requested template or report could not be found.',
  TemplateSaveSuccess:
    'The template has been saved successfully and will be verified and approved',
  ReportSaveSuccess: 'You\'ve successfully saved your custom report.',
  TemplateUpdateSuccess:
    'The template has been updated successfully and will be verified and approved',
  ReportUpdateSuccess: 'You\'ve successfully updated.',
  UnPublishMessage:
    'The template was successfully unpublished from the public folder',
  ErrorTitleMsg: 'Save title before continuing',
  ErrorDescMsg: 'Save description before continuing',
  ErrorIndicatorMsg: 'Save indicator before continuing',
  LoginErrorMeg: 'Log in before adding the indicator to the report.',
  DuplicateIndicatorSearch:
    ' The indicator you selected has already been added. Please choose a different indicator.',
  LastIndicatorMsg: 'You first need to save the last added indicator',
};
export const customPageReportCmpType = {
  CountryIndicatorDataTable: 'countryIndicatorDataTable',
  Notes: 'notes',
  Indicator: 'indicator',
};
export const operationType = {
  Create: 'create',
  Update: 'update',
  Delete: 'delete',
  DeleteBulk: 'delete-bulk',
  Approve: 'approve',
};

export const userRole = {
  User: 'user',
  Admin: 'admin',
};

export const disaggregations = {
  Age: 'AGE',
  Sex: 'SEX',
  Urbanisation: 'URBANISATION',
  RefArea: 'REF_AREA',
  Frequency: 'FREQ',
};

export const endpointLabels = {
  Metadata: 'metadata',
  Codelist: 'codelist',
  Data: 'data',
  DataCSV: 'dataCSV',
  Disaggregation: 'disaggregation',
  Grouping: 'grouping',
  SaveViewsDownloadsCount: 'saveviewsdownloadscount',
  GetViewsDownloads: 'getviewsdownloads',
  Datasets: 'datasets',
  Hierarchy: 'hierarchy',
  FeaturedProjects: 'featuredprojects',
  MapBoundaries: 'mapboundaries',
  DataPost: 'datapost',
  Narrative: 'narrative',
  ReportList: 'reportList',
  PublishedTemplateList: 'publishedTemplateList',
  UserTemplateList: 'userTemplateList',
  AllUserTemplateList: 'allUserTemplateList',
  CustomReport: 'customReport',
  ManageTemplate: 'manageTemplate',
  GetCustomReport: 'getCustomReport',
  GetPublishedTemplate: 'getPublishedTemplate',
  GetUserTemplate: 'getUserTemplate',
  UserDetails: 'userDetails',
  TempService: 'tempService',
  PublishTemplate: 'publishTemplate',
  MetadataV2: 'metadataV2',
  Embeddings: 'embeddings',
  MapCentroids: 'mapcentroids',
  CodelistIFC: 'codelistIFC',
};

export const benchmark = {
  Region: 'regional',
  IncomeGroup: 'incomeGroup',
};

export const aggregates = {
  Region: { id: 'regional', name: 'Corresponding region aggregates' },
  IncomeGroup: {
    id: 'incomeGroup',
    name: 'Corresponding income group aggregates',
  },
};

export const periodicity = {
  Annual: 'A',
  Quarterly: 'Q',
  Monthly: 'M',
  Hourly: 'H',
  Daily: 'D',
  HalfYearlySemester: 'S',
};

export const QueryParams = {
  View: 'view',
  CountrySelection: 'country',
  MinYear: 'minYear',
  MaxYear: 'maxYear',
  Year: 'year',
  SecondIndicator: 'secondIndicator',
  ComparisonBy: 'comparisonBy',
  RecentYearSelection: 'recentYear',
  Average: 'average',
  OnlyShow: 'onlyShow',
  UnitMeasure: 'unitMeasure',
  Frequency: 'frequency',
  SecondUnitMeasure: 'secUnitMeasure',
  Age: 'age',
  Sex: 'sex',
  Urbanisation: 'urbanisation',
  CompBreak1: 'compBreak1',
  CompBreak2: 'compBreak2',
  CompBreak3: 'compBreak3',
  // TO-DO: need to update when new disaggregations are introduced
  GenAI: 'genAI',
  // following are for ifc green bond query params
  BondType: 'bondType',
  Currency: 'currency',
  DealSize: 'dealSize',
  IssuerType: 'issuerType',
  Metric: 'metric',
  TenorBucket: 'tenorBucket',
};

export const QueryParamsForCustomReport = {
  reportID: 'reportID',
  templateID: 'templateID',
  templateType: 'templateType',
  tempID: 'tempID',
  indicatorID: 'indicatorID',
};
export const QueryParamsForCSV = {
  Frequency: 'FREQ',
  DATASET: 'DATABASE_ID',
  IND_ID: 'INDICATOR',
  urbanisation: 'URBANISATION',
  compBreak1: 'COMP_BREAKDOWN_1',
  compBreak2: 'COMP_BREAKDOWN_2',
  compBreak3: 'COMP_BREAKDOWN_3',
  LATEST: 'isLatestData',
  unitMeasure: 'UNIT_MEASURE',
  REF_AREA: 'REF_AREA',
  'YEAR>': 'timePeriodFrom',
  'YEAR<': 'timePeriodTo',
};

export const chartTypeSubTopic = {
  Bar: 'Bar Chart',
  Line: 'Line Chart',
  Map: 'Map',
};

// For color mapping -- start
export const Gender = {
  Female: 'F',
  Male: 'M',
  NonResponse: '_N',
  Other: '_O',
  Unknown: '_U',
  NotApplicable: '_Z',
};

export const Total = '_T';

export const Urbanization = {
  Rural: 'R',
  Urban: 'U',
};

export const Region = {
  LatinAmerica: 'LCN',
  SouthAsia: 'SAS',
  Africa: 'SSF',
  Europe: 'ECS',
  MiddleEast: 'MEA',
  EastAsia: 'EAS',
  NorthAmerica: 'NAC',
  World: 'WLD',
  WestAfrica: 'AFW',
  EastAfrica: 'AFE',
};

export const IncomeGroup = {
  High: 'HIC',
  Low: 'LIC',
  LowerMid: 'LMC',
  UpperMid: 'UMC',
};

export const ScaleTypes = {
  Sequential: 'sequential',
  SequentialReverse: 'sequential reverse',
  Sequential_Reverse: 'sequential_rev',
  Diverging: 'diverging',
  DivergingReverse: 'diverging reverse',
  Diverging_Reverse: 'diverging_rev',
  Categorical: 'cat',
};

export const LegendType = {
  Continuous: 'continuous',
  Binned: 'binned',
};

export const ChartElements = {
  ZeroLine: 'zero line',
  GridLine: 'grid line',
  MinorGridLineLogAxis: 'minor_gridline_log_axis',
};
// For color mapping -- end

// Advanced visualization -- start
export const BinTypes = {
  Custom: 'custom',
  Percentile: 'percentile',
  Equal: 'equal',
  StandardDeviation: 'stdev',
};
export const AxisValues = {
  Linear: 'linear',
  Exponential: 'exp',
  Logarithmic: 'nat_log',
};
export const MissingDataLineTypes = {
  ShowBreaks: 'show_breaks',
  Continuous: 'continuous',
};

export const MissingDataBarTypes = {
  ShowNA: 'show_na',
  RemoveGaps: 'remove_gaps',
};

export const MissingDataMapTypes = {
  DefaultColor: 'use_default_color',
  SpecifyColor: 'specify_color',
};

// Advanced visualization -- end

export const SearchListing = {
  indicator: 'INDICATOR',
  dataset: 'DATASET',
  analytics: 'ECONOMY ANALYTICS & REPORTS',
  'insights-resources': 'INSIGHTS & RESOURCES',
  'global report': 'GLOBAL REPORT',
  'country factsheets': 'COUNTRY FACTSHEET',
};

export const QueryParamSearch = {
  ThemeAndTopic: 'themeAndTopics',
  Country: 'country',
  CountryAnalytics: 'countryAnalytics',
  Disaggregation: 'disaggregation',
  Source: 'source',
  Tab: 'tab',
  Search: 'search',
  Database: 'database',
  AnalyticsType: 'analyticsType',
};

export const QueryParamCountryProfile = {
  Tab: 'tab',
};

export const Breakpoint = {
  TabletWide: 1024,
  Tablet: 800,
  Mobile: 600,
};

export const SchemaMappingTypes = {
  Indicator: 'Indicator',
  Dataset: 'Dataset',
};

export const AnalyticsTypes = {
  GlobalReport: 'Global reports',
  EconomyFactsheet: 'Economy factsheets',
  EconomyAnalytics: 'Economy Analytics',
};

export const DocType = {
  Analytics: 'analytics',
  GlobalReport: 'global-report',
  EconomyFactsheet: 'factsheet',
};
