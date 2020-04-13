const covid19ImpactEstimator = (data) => {
  let factor;
  let currentlyInfected;
  Math.floor(data.AvgDailyIncomeInUSD);
  Math.floor(data.IncomePopulation);
  // checks between impact and severe impact
  if (data.severeImpact) {
    currentlyInfected = data.reportedCases * 50;
  } else {
    currentlyInfected = data.reportedCases * 10;
  }
  // converts to days
  if (data.periodType === 'Weekly') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'Monthly') {
    data.timeToElapse *= 30;
  }
  // doubles currently infected every 3days
  const outputData = {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: this.currentlyInfected * (2 ** factor),
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
      infectionsByRequestedTime: this.currentlyInfected * (2 ** factor),
      severeCasesByRequestedTime: this.infectionsByRequestedTime * 0.15,
      hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: this.infectionsByRequestedTime * 0.05,
      casesForVentilatorsByRequestedTime: this.infectionsByRequestedTime * 0.02,
      dollarsInFlight: (this.infectionsByRequestedTime * data.avgDailyIncomePopulation)
       * data.avgDailyIncomeInUSD * data.timeToElapse
    }

  };

  if (data.periodType === 'Daily' && data.timeToElapse < 3) {
    outputData.impact.infectionsByRequestedTime = currentlyInfected * factor;
    outputData.servereImpact.infectionsByRequestedTime = currentlyInfected * factor;
  } else if (data.timeToElapse >= 3) {
    factor = Math.floor(data.timeToElapse / 3);
    outputData.impact.infectionsByRequestedTime = currentlyInfected * (2 ** factor);
    outputData.servereImpact.infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  }

  return outputData;
};

export default covid19ImpactEstimator;
