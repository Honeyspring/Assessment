const covid19ImpactEstimator = (data) => {
  let InputData = {
  data: {
    region: {
    name: regionName,
    avgAge: avgAge,
    avgDailyIncomeInUSD: avgDailyIncomeInUSD,
    avgDailyIncomePopulation: avgDailyIncomePopulation
    },
    periodType: periodType,
    timeToElapse: timeToElapse,
    reportedCases: reportedCases,
    population:population,
    totalHospitalBeds: totalHospitalBeds
    }
}
InpuData= data; 

  const outputData = {
    data: InputData, 
    impact: {
      currentlyInfected: (reportedCases) => reportedCases * 10,
      infectionsByRequestedTime: (currentlyInfected,factor) =>{ 
      return currentlyInfected *Math.pow(2 * factor);
      },
      severeCasesByRequestedTime: (infectionsByRequestedTime) => {
        return infectionsByRequestedTime * 0.15;
      },
      hospitalBedsByRequestedTime: (totalHospitalBeds) => totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: (infectionsByRequestedTime) => {
       return infectionsByRequestedTime * 0.05
      },
      casesForVentilatorsByRequestedTime: (infectionsByRequestedTime) =>{
        return infectionsByRequestedTime * 0.02;
      },
      dollarsInFlight:(infectionsByRequestedTime, avgDailyIncomeInUSD,
         avgDailyIncomePopulation, timeToElapse) => {
    return (infectionsByRequestedTime * avgDailyIncomePopulation) * 
      avgDailyIncomeInUSD * timeToElapse
         }
    },
    //  severe case estimation
    severeImpact: {
      currentlyInfected: (reportedCases) => reportedCases * 50,
      infectionsByRequestedTime: (currentlyInfected,factor) =>{ 
      return currentlyInfected *Math.pow(2 * factor);
      },
      severeCasesByRequestedTime: (infectionsByRequestedTime) => {
        return infectionsByRequestedTime * 0.15;
      },
      hospitalBedsByRequestedTime: (totalHospitalBeds) => totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: (infectionsByRequestedTime) => {
       return infectionsByRequestedTime * 0.05
      },
      casesForVentilatorsByRequestedTime: (infectionsByRequestedTime) =>{
        return infectionsByRequestedTime * 0.02;
      },
      dollarsInFlight:(infectionsByRequestedTime, avgDailyIncomeInUSD,
         avgDailyIncomePopulation, timeToElapse) => {
      return (infectionsByRequestedTime * avgDailyIncomePopulation) * 
      avgDailyIncomeInUSD * timeToElapse
         }
    }

  }
  return outputData;
};

export default covid19ImpactEstimator;
