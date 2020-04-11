const covid19ImpactEstimator = (data) => {
  let InputData = {
    region: {
      name: regionName,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };


  InputData = data;
  const outputData = {
    data: InputData, // the input data gotten
    //  best case estimation
    impact: {
      currentlyInfected: (reportedCases) => reportedCases * 10,
      infectionsByRequestedTime: (currentlyInfected) => currentlyInfected * 512,
      severeCasesByRequestedTime: (infectionsByRequestedTime) => infectionsByRequestedTime * 0.15,
      hospitalBedsByRequestedTime: (totalHospitalBeds) => totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: (infectionsByRequestedTime) => infectionsByRequestedTime * 0.05,
      casesForVentilatorsByRequestedTime: (infectionsByRequestedTime) => infectionsByRequestedTime * 0.02,
      dollarsInFlight:
      (infectionsByRequestedTime, avgDailyIncomeInUSD, avgDailyIncomePopulation, timeToElapse) => (infectionsByRequestedTime * avgDailyIncomePopulation) * avgDailyIncomeInUSD * timeToElapse
    },
    //  severe case estimation
    severeImpact: {
      currentlyInfected: (reportedCases) => reportedCases * 50,
      infectionsByRequestedTime: (currentlyInfected) => currentlyInfected * 512,
      severeCasesByRequestedTime: (infectionsByRequestedTime) => infectionsByRequestedTime * 0.15,
      hospitalBedsByRequestedTime: (totalHospitalBeds) => totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: (infectionsByRequestedTime) => infectionsByRequestedTime * 0.05,
      casesForVentilatorsByRequestedTime: (infectionsByRequestedTime) => infectionsByRequestedTime * 0.02,
      dollarsInFlight:
(infectionsByRequestedTime, avgDailyIncomeInUSD, avgDailyIncomePopulation, timeToElapse) => (infectionsByRequestedTime * avgDailyIncomePopulation) * avgDailyIncomeInUSD * timeToElapse
    }

  };
  return outputData;
};

export default covid19ImpactEstimator;
