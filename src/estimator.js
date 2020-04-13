const covid19ImpactEstimator = (data) => {
  let factor;

  const outputData = {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
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
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: this.currentlyInfected * (2 ** factor),
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
