const covid19ImpactEstimator = (data) => {
  let factor;
  let num;
  const days = data.periodType.toLowerCase();


  // converts to days
  if (days === 'days') {
    data.timeToElapse *= 1;
  } else if (days === 'weeks') {
    data.timeToElapse *= 7;
  } else if (days === 'months') {
    data.timeToElapse *= 30;
  }
  // double report every 3 days
  if (days === 'days' && data.timeToElapse < 3) {
    factor = 1;
    num = 1;
  } else if (data.timeToElapse >= 3) {
    factor = Math.floor(data.timeToElapse / 3);
    num = 2;
  }

  // doubles currently infected every 3days
  const outputData = {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: this.currentlyInfected * (num ** factor),
      severeCasesByRequestedTime: this.infectionsByRequestedTime * 0.15,
      hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: this.infectionsByRequestedTime * 0.05,
      casesForVentilatorsByRequestedTime: this.infectionsByRequestedTime * 0.02,
      dollarsInFlight: (this.infectionsByRequestedTime * data.avgDailyIncomePopulation)
      * data.avgDailyIncomeInUSD * data.timeToElapse
    },
    //  severe case estimation
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: this.currentlyInfected * (num ** factor),
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
