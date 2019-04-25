var csvToJson=require('./csvtojson')
var matchesData = csvToJson('./data/matches.csv')
var deliveryData = csvToJson('./data/deliveries.csv')
const getNoOfMatchesPlayed = () => {
  //write your code here
  const getNoOfMatches = matchesData.reduce((ac,cv) => 
  {
    if(!ac[cv['season']]){
      ac[cv['season']] = 1;
    }
    else{
      ac[cv['season']] +=1;
    }
    return ac;
  },{});
 
  return getNoOfMatches;
}

const getNoOfMatchesWonPerTeamPerYear = () => {

  const getNoOfMatchesWon = matchesData.reduce((a,b) => {
    
    if(b["winner"]!=='')
    {
      if(!a[b['winner']]){
      a[b['winner']] = {};
      }
      if(!a[b['winner']][b['season']]){
      a[b['winner']][b['season']]= 1;
      return a;
      }
      if(a[b['winner']][b['season']]){
      a[b['winner']][b['season']]+= 1;
      }
    }
    return a;
    },{});
  
  return getNoOfMatchesWon;
}



const getExtraRunsPerTeamForYear = () => { 
  const getExtraRunsPerTeamForYear2016 = deliveryData.reduce((a,b) =>
  {
    //[577-636]-2016
   if(b['match_id']>=577)
   { 
      if(!a[b['bowling_team']]){
            a[b['bowling_team']] = parseInt(b['extra_runs']);
            return a;
      }
      if(a[b['bowling_team']]){
            a[b['bowling_team']]+= parseInt(b['extra_runs']);
      }
   }
  return a;
  },{});
  return getExtraRunsPerTeamForYear2016;
}

const getEconomicalBowlersForYear = () => {
//[518-576]-2015
   let noOfBallsPerBowler = deliveryData.reduce((a,b) => {
    if(b['match_id']>=518 && b['match_id']<=576)
    {
      if(!a[b['bowler']]){
        a[b['bowler']] = 1;
        return a;
      }
      if(a[b['bowler']]){
        a[b['bowler']]  +=1;
      }
    }
    return a;
   },{});

   let totalNoOfRunsPerBowler = deliveryData.reduce((a,b) => {
    if(b['match_id']>=518 && b['match_id']<=576)
    {
       if(!a[b['bowler']]){
           a[b['bowler']] = parseInt(b['total_runs']);
           return a;
        }
        if(a[b['bowler']]){
           a[b['bowler']] += parseInt(b['total_runs']);
        } 
    }
      return a;
    },{});

  let  economyOfBowlerPerYear = deliveryData.reduce((a,b) => {
    if(b['match_id']>=518 && b['match_id']<=576) 
   {
      if(!a[b['bowler']]){
      a[b['bowler']] = (totalNoOfRunsPerBowler[b['bowler']]/noOfBallsPerBowler[b['bowler']])*6;
      return a;
     }
   }
   return a;
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
