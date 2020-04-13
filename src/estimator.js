const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let currentlyInfected;
  let factor = 1;
  let infectionsByRequestedTime;

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  // converts to days
  if (data.periodType === 'days') {
    data.timeToElapse *= 1;
  } else if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  // double report every 3 days
  if (data.periodType === 'days' && data.timeToElapse < 3) {
    impact.infectionsByRequestedTime = currentlyInfected * factor;
    severeImpact.infectionsByRequestedTime =currentlyInfected * factor;
  } else if (data.timeToElapse >= 3) {
    factor = Math.floor(data.timeToElapse / 3);
    impact.infectionsByRequestedTime = currentlyInfected * (2 ** factor);
    severeImpact.infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  }
  
  // doubles currently infected every 3days
  const outputData = {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: this.infectionsByRequestedTime * 0.15,
      hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: this.infectionsByRequestedTime * 0.05,
      casesForVentilatorsByRequestedTime: this.infectionsByRequestedTime * 0.02,
      dollarsInFlight: (this.infectionsByRequestedTime * data.avgDailyIncomePopulation)
      * data.avgDailyIncomeInUSD * data.timeToElapse
    },
    //  severe case estimation
    severeImpact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: this.infectionsByRequestedTime * 0.15,
      hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: this.infectionsByRequestedTime * 0.05,
      casesForVentilatorsByRequestedTime: this.infectionsByRequestedTime * 0.02,
      dollarsInFlight: (this.infectionsByRequestedTime * data.avgDailyIncomePopulation)
       * data.avgDailyIncomeInUSD * data.timeToElapse
    }

  };


  return outputData;
};

export default covid19ImpactEstimator;
