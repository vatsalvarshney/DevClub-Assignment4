console.log("Loaded script.js");

function csvToObject(x){
    var lines=x.split('\n');
    var result = [];
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length-1;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

let request_global = new XMLHttpRequest();
request_global.open("GET", 'https://api.covid19api.com/summary', false);
request_global.send();
let data_global = JSON.parse(request_global.responseText);

let request_india = new XMLHttpRequest();
request_india.open("GET", 'https://api.covid19tracker.in/data/csv/latest/case_time_series.csv', false);
request_india.send();
let data_india = csvToObject(request_india.responseText);
console.log(data_india)

document.querySelector('.global_confirmed_total').innerHTML = data_global.Global.TotalConfirmed.toLocaleString('en-IN')
document.querySelector('.global_confirmed_new').innerHTML = '+ ' + data_global.Global.NewConfirmed.toLocaleString('en-IN')
document.querySelector('.global_deaths_total').innerHTML = data_global.Global.TotalDeaths.toLocaleString('en-IN')
document.querySelector('.global_deaths_new').innerHTML = '+ ' + data_global.Global.NewDeaths.toLocaleString('en-IN')
document.querySelector('.india_confirmed_total').innerHTML = Number(data_india[data_india.length-1]['Total Confirmed']).toLocaleString('en-IN')
document.querySelector('.india_confirmed_new').innerHTML = '+ ' + Number(data_india[data_india.length-1]['Daily Confirmed']).toLocaleString('en-IN')
document.querySelector('.india_deaths_total').innerHTML = Number(data_india[data_india.length-1]['Total Deceased']).toLocaleString('en-IN')
document.querySelector('.india_deaths_new').innerHTML = '+ ' + Number(data_india[data_india.length-1]['Daily Deceased']).toLocaleString('en-IN')
document.querySelector('.india_recovered_total').innerHTML = Number(data_india[data_india.length-1]['Total Recovered']).toLocaleString('en-IN')
document.querySelector('.india_recovered_new').innerHTML = '+ ' + Number(data_india[data_india.length-1]['Daily Recovered']).toLocaleString('en-IN')
document.querySelector('.india_active_total').innerHTML = (Number(data_india[data_india.length-1]['Total Confirmed'])-Number(data_india[data_india.length-1]['Total Deceased'])-Number(data_india[data_india.length-1]['Total Recovered'])).toLocaleString('en-IN')
let india_active_new = Number(data_india[data_india.length-1]['Daily Confirmed'])-Number(data_india[data_india.length-1]['Daily Deceased'])-Number(data_india[data_india.length-1]['Daily Recovered'])

if (india_active_new>=0){
    document.querySelector('.india_active_new').innerHTML = '+ ' + india_active_new.toLocaleString('en-IN');
}else{
    document.querySelector('.india_active_new').innerHTML = india_active_new.toLocaleString('en-IN');
}

let date = new Date(data_india[data_india.length-1].Date_YMD)

let thirtyDaysListOld = [date];

for (let i = 1; i < 30; i++) {
    thirtyDaysListOld.push(new Date(date));
    thirtyDaysListOld[i].setDate(thirtyDaysListOld[i].getDate()-i)
}

function dateShort(date){
    return date.getDate()+'/'+(date.getMonth()+1)
}

let thirtyDaysList = [];

thirtyDaysListOld.forEach(date => {thirtyDaysList.push(dateShort(date))});
thirtyDaysList.reverse()

let thirtyDaysDataList = [];

for (let i = 0; i < 30; i++) {
    thirtyDaysDataList.push(data_india[data_india.length-30+i]['Daily Confirmed'])
}

let india_daily_confirmed_chart = new Chart(document.querySelector('.india_daily_confirmed_chart'), {
    type: 'bar',
    data: {
        labels: thirtyDaysList,
        datasets:[{
            label: 'Number of Cases',
            backgroundColor: ['rgba(255,50,50,0.5)'],
            borderColor: 'rgba(0,0,0,1)',
            data: thirtyDaysDataList
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
