fetch('./data.json').then(response => response.json()).then(data => {
    
    chartForMatchesPerSeason(data["MatchesPlayed"]);
    barChartForNoOfWins(data["MatchesWonPerTeamPerYear"]);
    chartForExtraRunsPerTeam(data["ExtraRunsPerTeam"]);
    chartForEconomicalBowlers(data["EconomicalBowler"]);
})

function formatdataForColumnChart(object) {
    var jsonData = [];
    for( var item  in  object){
        var columnChartFormat = { 
            name : item,
            y : object[item]
          }
        jsonData.push(columnChartFormat);
    }
  return jsonData;
    //write your code to convert jsondata for the column chart format.
   
}

function formatdataForBarChart(object) {
    var jsonData = [];
    for( var team  in  object){  
            var barChartFormat = { 
            name : team,
            y :[5, 3, 4, 7, 2]
            // y : Object.values(object[team])
        }
        jsonData.push(barChartFormat);
    }
    return jsonData;
     //write your code to convert jsondata for the Bar chart format.
}

function chartForMatchesPerSeason(jsonData){
    // Create the chart
   var jsondataForHighChart=formatdataForColumnChart(jsonData)
    Highcharts.chart('MatchesPlayed', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'No Of Matches Played Per Season'
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'No Of Matches Played'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: jsondataForHighChart
        }
    ]
});
//complete this function to create visualization for no.ofmathches per season.
}

function barChartForNoOfWins(jsonData){
    var jsondataForBarChart = formatdataForBarChart(jsonData);
    Highcharts.chart('noOfWins', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'NO OF MATCHES WON BY EACH TEAM PER YEAR'
        },
        xAxis: {
            type: 'category',
            allowDecimals: false,
            title: { text: "Years" },
            categories: ['2008', '2009', '2010', '2011', '2012','2013','2014','2015','2016','2017']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'No Of Matches Won Per Team'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: jsondataForBarChart
    });
//complete this function to create visualization for no.ofWins per team per season.   
}

function chartForExtraRunsPerTeam(jsonData){
    var jsondataForHighChart=formatdataForColumnChart(jsonData)
    Highcharts.chart('extraruns', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra Runs Per Team In 2016'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Extra Runs Per Team'
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
    
        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: jsondataForHighChart
            }
        ]
    });

//complete this function to create visualization for extraruns per team for year 2016 . 
         
}

function chartForEconomicalBowlers(jsonData){
    var jsondataForHighChart=formatdataForColumnChart(jsonData)
    Highcharts.chart('economicBowler', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Top Ten Economic Bowlers For The Year 2015'
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Economic Value Of Bowler'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: jsondataForHighChart
        }
    ]
});
 //complete this function to create visualization for top ten economical bowler for year 2015 .   
}