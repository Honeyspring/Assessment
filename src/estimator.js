const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let currentlyInfected;
  let factor;
  let num;
  let infectionByRequestedTime;
  let severeCasesByRequestedTime;
  let casesForICUByRequestedTime;
  let casesForVentilatorsByRequestedTime,
  let dollarsInFlight



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
    factor = 1;
    num = 1;
  } else if (data.timeToElapse >= 3) {
    factor = data.timeToElapse / 3;
    num = 2;
  }
  impact.infectionsByRequestedTime = impact.currentlyInfected * (num ** factor);  
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (num ** factor);
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  impact.dollarsInFlight = impact.infectionsByRequestedTime * data.avgDailyIncomePopulation)
      * data.avgDailyIncomeInUSD * data.timeToElapse
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * data.avgDailyIncomePopulation)
      * data.avgDailyIncomeInUSD * data.timeToElapse
    

  const outputData = {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime, 
      hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    },
    //  severe case estimation
    severeImpact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight, 
    }

  };


  return outputData;
};

export default covid19ImpactEstimator;
