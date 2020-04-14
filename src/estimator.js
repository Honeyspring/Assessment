const covid19ImpactEstimator = (data) => {
  let impact = {};
  let severeImpact = {};
  let factor;
  const days = data.periodType.toLowerCase();


  // converts to days
  if (days === 'days') {
    data.timeToElapse *= 1;
    factor = Math.trunc(2 ** (data.timeToElapse / 3));
  } else if (days === 'weeks') {
    data.timeToElapse *= 7;
    factor = Math.trunc(2 ** (data.timeToElapse / 3));
  } else if (days === 'months') {
    data.timeToElapse *= 30;
    factor = Math.trunc(2 ** (data.timeToElapse / 3));
  }
  impact = {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: this.currentlyInfected * (factor),
    severeCasesByRequestedTime: Math.trunc(this.infectionsByRequestedTime * 0.15),
    hospitalBedsByRequestedTime: Math.trunc(data.totalHospitalBeds * 0.35),
    casesForICUByRequestedTime: Math.trunc(this.infectionsByRequestedTime * 0.05),
    casesForVentilatorsByRequestedTime: Math.trunc(this.infectionsByRequestedTime * 0.02),
    dollarsInFlight: Math.trunc((this.infectionsByRequestedTime * data.avgDailyIncomePopulation
      * data.avgDailyIncomeInUSD) / data.timeToElapse)
  };
  severeImpact = {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: this.currentlyInfected * (factor),
    severeCasesByRequestedTime: Math.trunc(this.infectionsByRequestedTime * 0.15),
    hospitalBedsByRequestedTime: Math.trunc(data.totalHospitalBeds * 0.35),
    casesForICUByRequestedTime: Math.trunc(this.infectionsByRequestedTime * 0.05),
    casesForVentilatorsByRequestedTime: Math.trunc(this.infectionsByRequestedTime * 0.02),
    dollarsInFlight: Math.trunc((this.infectionsByRequestedTime * data.avgDailyIncomePopulation
      * data.avgDailyIncomeInUSD) / data.timeToElapse)
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
