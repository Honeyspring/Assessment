const covid19ImpactEstimator = (data) => {

  class InputData {
    constructor(country, avgAge, avgDailyIncomeInUSD,avgDailyIncomePopulation, periodType, timeToElapse, reportedCases, population, totalHospitalBeds) {
    this.region = {
    name: country,
    avgAge: avgAge,
    avgDailyIncomeInUSD: avgDailyIncomeInUSD,
    avgDailyIncomePopulation: avgDailyIncomePopulation
    },
    this.periodType = periodType,
    this.timeToElapse = timeToElapse,
    this.reportedCases = reportedCases,
    this.population = population,
    this.totalHospitalBeds = totalHospitalBeds;
    }
       }
    
         InputData = data;
    
        return{

outputData:{
 data : InputData, // the input data gotten
//  best case estimation
impact: {
    currentlyInfected :(reportedCases)=>reportedCases * 10,
    infectionsByRequestedTime :(currentlyInfected)=>currentlyInfected * 1024,
    severeCasesByRequestedTime :( infectionsByRequestedTime)=> infectionsByRequestedTime * 0.15,
    hospitalBedsByRequestedTime :(totalHospitalBeds)=> totalHospitalBeds * 0.35,
    casesForICUByRequestedTime :(infectionsByRequestedTime)=>infectionsByRequestedTime * 0.05,
    casesForVentilatorsByRequestedTime :(infectionsByRequestedTime)=>infectionsByRequestedTime * 0.02,
    dollarsInFlight :(infectionsByRequestedTime,avgDailyIncomeInUSD,avgDailyIncomePopulation,timeToElapse)=>{
        (infectionsByRequestedTime * avgDailyIncomePopulation) * avgDailyIncomeInUSD * timeToElapse
    //(infectionsByRequestedTime x 0.65) x 1.5 x 30;
             }
}, //  severe case estimation

    severeImpact :{
    currentlyInfected :(reportedCases)=>reportedCases * 50,
    infectionsByRequestedTime :(currentlyInfected)=>currentlyInfected * 1024,
    severeCasesByRequestedTime :( infectionsByRequestedTime)=> infectionsByRequestedTime * 0.15,
    hospitalBedsByRequestedTime :(totalHospitalBeds)=> totalHospitalBeds * 0.35,
    casesForICUByRequestedTime : (infectionsByRequestedTime)=>infectionsByRequestedTime * 0.05,
    casesForVentilatorsByRequestedTime :(infectionsByRequestedTime)=>infectionsByRequestedTime * 0.02,
    dollarsInFlight :(infectionsByRequestedTime,avgDailyIncomeInUSD,avgDailyIncomePopulation,timeToElapse)=>{
        (infectionsByRequestedTime * avgDailyIncomePopulation) * avgDailyIncomeInUSD * timeToElapse
    //(infectionsByRequestedTime x 0.65) x 1.5 x 30;
             }
    } 
    
}
}                    
}

export default covid19ImpactEstimator;
