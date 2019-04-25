var fs=require('fs')
var functions = require('./ipl')
var getNoOfMatchesPlayed = functions.getNoOfMatchesPlayed
var getNoOfMatchesWonPerTeamPerYear = functions.getNoOfMatchesWonPerTeamPerYear
var getExtraRunsPerTeamForYear = functions.getExtraRunsPerTeamForYear
var getEconomicalBowlersForYear = functions.getEconomicalBowlersForYear

let jsonData={};
jsonData["MatchesPlayed"]=getNoOfMatchesPlayed();
jsonData["MatchesWonPerTeamPerYear"]=getNoOfMatchesWonPerTeamPerYear();
jsonData["ExtraRunsPerTeam"]=getExtraRunsPerTeamForYear();
jsonData["EconomicalBowler"]=getEconomicalBowlersForYear();

fs.writeFile('./public/data.json',
JSON.stringify(jsonData, null, 4),
err => {
    if (err) {
        console.log(err);
    }
}
);