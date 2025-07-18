/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { UNIT_MEASURE_EXCEPTION, UNITS, FILTER_MAPPING } from './constants.js';

// eslint-disable-next-line import/prefer-default-export
export const formatNumberOnUnitMeasure = (
  value,
  unitMeasure,
  decimals,
  isSymbol = true,
) => {
  let res = '';
  const numericValue = Number(value);
  if (!isNaN(numericValue)) {
    const decimalPlaces = decimals !== null && !isNaN(decimals) && decimals !== ''
      ? parseInt(decimals, 10)
      : undefined;

    if (numericValue !== 0 && numericValue < 1 && numericValue > -1) {
      res = numericValue.toFixed(
        decimalPlaces !== undefined ? decimalPlaces : 2,
      );
    } else if (UNIT_MEASURE_EXCEPTION.includes(unitMeasure)) {
      const unitConfig = UNITS[unitMeasure] || [];
      for (const { limit, factor, suffix } of unitConfig) {
        if (numericValue >= limit && numericValue < limit * 1_000) {
          res = `${(numericValue / factor).toFixed(
            decimalPlaces !== undefined ? decimalPlaces : 1,
          )}${suffix}`;
          break;
        }
      }
    } else {
      const minimumFractionDigits = Number.isInteger(numericValue)
        ? 0
        : decimalPlaces !== undefined
          ? decimalPlaces
          : 1;
      res = Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits:
          decimalPlaces !== undefined
            ? decimalPlaces
            : numericValue === 0
              ? undefined
              : 1,
        minimumFractionDigits,
      })
        .format(numericValue)
        .toLowerCase();
    }

    if (isSymbol) {
      if (unitMeasure === 'PT') {
        res += '%';
      } else if (unitMeasure === 'USD') {
        res = `$${res}`;
      }
    }
  } else {
    res = value;
  }
  return res;
};

export const formatUnitMeasure = (unitMeasure, unitMeasureName) => (unitMeasure
    && unitMeasureName
    && unitMeasure !== 'PT'
    && unitMeasure !== 'USD'
    && unitMeasure !== 'U'
    && unitMeasure !== 'NUMBER'
    && unitMeasure !== 'COUNT'
  ? ` ${unitMeasureName}`
  : '');

export const buildDisaggregationFiltersWithT = (
  params,
  disaggregationResponse,
  checkTotalFilterValue,
) => {
  let isSecondAPICallEligible = false;

  disaggregationResponse?.forEach((disaggregation) => {
    const { filterName, filterValues } = disaggregation;
    const filterKey = FILTER_MAPPING[filterName];

    if (filterKey && filterValues?.length > 1) {
      const value = checkTotalFilterValue
        ? filterValues.find((val) => val.id === '_T')?.id || filterValues[0]?.id
        : filterValues[0]?.id;

      // eslint-disable-next-line no-param-reassign
      params += ` AND ${filterKey}='${value}'`;

      if (checkTotalFilterValue && !isSecondAPICallEligible) {
        if (filterValues.map((val) => val.id)?.indexOf('_T') > 0) {
          isSecondAPICallEligible = true;
        }
      }
    }
  });

  return { params, isSecondAPICallEligible };
};

export const getEndpointFromConfig = (endpointList, endpointName) => {
  const endpointObj = endpointList.find(
    (item) => item.endpointLabel === endpointName,
  );
  return endpointObj;
};
