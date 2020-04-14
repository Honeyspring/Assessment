const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let factor;
  const days = data.periodType;


  // converts to days
  if (days === 'days') {
    data.timeToElapse *= 1;
    factor = 2 ** Math.trunc((data.timeToElapse / 3));
  } else if (days === 'weeks') {
    data.timeToElapse *= 7;
    factor = 2 ** Math.trunc((data.timeToElapse / 3));
  } else {
    data.timeToElapse *= 30;
    factor = 2 ** Math.trunc((data.timeToElapse / 3));
  }

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (factor);
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds * 0.35);
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime
    * data.avgDailyIncomePopulation * data.avgDailyIncomeInUSD) / data.timeToElapse);

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (factor);
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime
     * 0.15);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds * 0.35);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime
     * 0.05);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );
  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime
    * data.avgDailyIncomePopulation * data.avgDailyIncomeInUSD) / data.timeToElapse);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
