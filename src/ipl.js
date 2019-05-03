var csvToJson=require('./csvtojson')
var matchesData = csvToJson('./requiredData/matches.csv')
var deliveryData = csvToJson('./requiredData/deliveries.csv')
const getNoOfMatchesPlayed = () => {
  //write your code here
  const getNoOfMatches = matchesData.reduce((matchesPlayed,obj) => 
  {
    if(!matchesPlayed[obj['season']]){
      matchesPlayed[obj['season']] = 1;
    }
    else{
      matchesPlayed[obj['season']] +=1;
    }
    return matchesPlayed;
  },{});
  return getNoOfMatches;
}

const getNoOfMatchesWonPerTeamPerYear = () => {

  const getNoOfMatchesWon = matchesData.reduce((noOfMatchesWon,eachMatch) => {
    
    if(eachMatch["winner"]!=='')
    {
      if(!noOfMatchesWon[eachMatch['winner']]){
        noOfMatchesWon[eachMatch['winner']] = {};
      }
      if(!noOfMatchesWon[eachMatch['winner']][eachMatch['season']]){
        noOfMatchesWon[eachMatch['winner']][eachMatch['season']]= 1;
      return noOfMatchesWon;
      }
      if(noOfMatchesWon[eachMatch['winner']][eachMatch['season']]){
        noOfMatchesWon[eachMatch['winner']][eachMatch['season']]+= 1;
      }
    }
    return noOfMatchesWon;
    },{});
  
  return getNoOfMatchesWon;
}



const getExtraRunsPerTeamForYear = () => { 
  const getExtraRunsPerTeamForYear2016 = deliveryData.reduce((extraRuns,data) =>
  {
    //[577-636]-2016
   if(b['match_id']>=577)
   { 
      if(!extraRuns[data['bowling_team']]){
        extraRuns[data['bowling_team']] = parseInt(data['extra_runs']);
            return extraRuns;
      }
      if(extraRuns[data['bowling_team']]){
        extraRuns[data['bowling_team']]+= parseInt(data['extra_runs']);
      }
   }
  return extraRuns;
  },{});
  return getExtraRunsPerTeamForYear2016;
}

const getEconomicalBowlersForYear = () => {
//[518-576]-2015
   let noOfBallsPerBowler = deliveryData.reduce((noOFBalls,data) => {
    if(data['match_id']>=518 && data['match_id']<=576)
    {
      if(!noOFBalls[data['bowler']]){
        noOFBalls[data['bowler']] = 1;
        return noOFBalls;
      }
      if(noOFBalls[data['bowler']]){
        noOFBalls[data['bowler']]  +=1;
      }
    }
    return noOFBalls;
   },{});

   let totalNoOfRunsPerBowler = deliveryData.reduce((totalNoOfRuns,data) => {
    if(data['match_id']>=518 && data['match_id']<=576)
    {
       if(!totalNoOfRuns[data['bowler']]){
        totalNoOfRuns[data['bowler']] = parseInt(data['total_runs']);
           return totalNoOfRuns;
        }
        if(totalNoOfRuns[data['bowler']]){
          totalNoOfRuns[data['bowler']] += parseInt(data['total_runs']);
        } 
    }
      return totalNoOfRuns;
    },{});

  let  economyOfBowlerPerYear = deliveryData.reduce((economicValue,data) => {
    if(data['match_id']>=518 && data['match_id']<=576) 
   {
      if(!economicValue[data['bowler']]){
        economicValue[data['bowler']] = (totalNoOfRunsPerBowler[data['bowler']]/noOfBallsPerBowler[data['bowler']])*6;
      return economicValue;
     }
   }
   return economicValue;
   },{});
  
   let economyOfBowlerPerYearIntoArray = Object.keys(economyOfBowlerPerYear).map(bowler => {
     return {
       value : economyOfBowlerPerYear[bowler],
       [bowler] : economyOfBowlerPerYear[bowler]
     };
   });
  
   economyOfBowlerPerYearIntoArray.sort((a,b) => a.value - b.value);

   let topTenEconomyOfBowlers = economyOfBowlerPerYearIntoArray.slice(0,10).map( obj => {
     delete obj.value;
     return obj;
   });

    topTenEconomyOfBowlers =  Object.assign({},...topTenEconomyOfBowlers);

  return  topTenEconomyOfBowlers ;
}

//getEconomicalBowlersForYear();
//console.log(getEconomicalBowlersForYear());

module.exports.getNoOfMatchesPlayed = getNoOfMatchesPlayed
module.exports.getNoOfMatchesWonPerTeamPerYear = getNoOfMatchesWonPerTeamPerYear
module.exports.getExtraRunsPerTeamForYear = getExtraRunsPerTeamForYear
module.exports.getEconomicalBowlersForYear = getEconomicalBowlersForYear
