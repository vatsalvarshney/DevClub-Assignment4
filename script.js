function csvToObject(x){
    let lines=x.split('\n');
    let result = [];
    let headers=lines[0].split(",");
  
    for(let i=1;i<lines.length-1;i++){
        let obj = {};
        let currentline=lines[i].split(",");
        for(let j=0;j<headers.length;j++){
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

let num_format = 'en-IN'

let date = new Date(data_india[data_india.length-2].Date_YMD)

function shortDate(date){
    if (num_format=='en-US'){
        return (date.getMonth()+1)+'/'+date.getDate()
    } else {
        return date.getDate()+'/'+(date.getMonth()+1)
    }
}

function nDaysList(n){
    let nDaysListOld = [date];

    for (let i = 1; i < n; i++) {
        nDaysListOld.push(new Date(date));
        nDaysListOld[i].setDate(nDaysListOld[i].getDate()-i)
    }

    let nDaysList = [];

    nDaysListOld.forEach(date => {nDaysList.push(shortDate(date))});
    nDaysList.reverse()

    return nDaysList
}

function plotIndiaDailyConfirmedChart(n){
    document.querySelector('.india_daily_confirmed_chart').outerHTML = "<canvas class='india_daily_confirmed_chart'></canvas>";

    let nDaysDataList = [];

    for (let i = 0; i < n; i++) {
        nDaysDataList.push(data_india[data_india.length-n+i-1]['Daily Confirmed'])
    }

    let india_daily_confirmed_chart = new Chart(document.querySelector('.india_daily_confirmed_chart'), {
        type: 'bar',
        data: {
            labels: nDaysList(n),
            datasets:[{
                label: 'Number of Cases',
                backgroundColor: 'rgba(255,50,50,0.5)',
                borderColor: 'rgba(0,0,0,1)',
                data: nDaysDataList
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'right'
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    })
}

function plotIndiaTotalActiveChart(n){
    document.querySelector('.india_total_active_chart').outerHTML = "<canvas class='india_total_active_chart'></canvas>";

    let nDaysDataList = [];

    for (let i = 0; i < n; i++) {
        nDaysDataList.push(Number(data_india[data_india.length-n+i-1]['Total Confirmed'])-Number(data_india[data_india.length-n+i]['Total Deceased'])-Number(data_india[data_india.length-n+i]['Total Recovered']))
    }

    let india_total_active_chart = new Chart(document.querySelector('.india_total_active_chart'), {
        type: 'bar',
        data: {
            labels: nDaysList(n),
            datasets:[{
                label: 'Number of Cases',
                backgroundColor: 'rgba(89,169,255,0.8)',
                borderColor: 'rgba(0,0,0,1)',
                data: nDaysDataList
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'right'
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    })
}

function load_trends_data(){
    document.querySelector('.global_confirmed_total').innerHTML = data_global.Global.TotalConfirmed.toLocaleString(num_format)
    document.querySelector('.global_confirmed_new').innerHTML = '+ ' + data_global.Global.NewConfirmed.toLocaleString(num_format)
    document.querySelector('.global_deaths_total').innerHTML = data_global.Global.TotalDeaths.toLocaleString(num_format)
    document.querySelector('.global_deaths_new').innerHTML = '+ ' + data_global.Global.NewDeaths.toLocaleString(num_format)
    document.querySelector('.india_confirmed_total').innerHTML = Number(data_india[data_india.length-2]['Total Confirmed']).toLocaleString(num_format)
    document.querySelector('.india_confirmed_new').innerHTML = '+ ' + Number(data_india[data_india.length-2]['Daily Confirmed']).toLocaleString(num_format)
    document.querySelector('.india_deaths_total').innerHTML = Number(data_india[data_india.length-2]['Total Deceased']).toLocaleString(num_format)
    document.querySelector('.india_deaths_new').innerHTML = '+ ' + Number(data_india[data_india.length-2]['Daily Deceased']).toLocaleString(num_format)
    document.querySelector('.india_recovered_total').innerHTML = Number(data_india[data_india.length-2]['Total Recovered']).toLocaleString(num_format)
    document.querySelector('.india_recovered_new').innerHTML = '+ ' + Number(data_india[data_india.length-2]['Daily Recovered']).toLocaleString(num_format)
    document.querySelector('.india_active_total').innerHTML = (Number(data_india[data_india.length-2]['Total Confirmed'])-Number(data_india[data_india.length-2]['Total Deceased'])-Number(data_india[data_india.length-2]['Total Recovered'])).toLocaleString(num_format)
    let india_active_new = Number(data_india[data_india.length-2]['Daily Confirmed'])-Number(data_india[data_india.length-2]['Daily Deceased'])-Number(data_india[data_india.length-2]['Daily Recovered'])

    if (india_active_new>=0){
        document.querySelector('.india_active_new').innerHTML = '+ ' + india_active_new.toLocaleString(num_format);
    }else{
        document.querySelector('.india_active_new').innerHTML = india_active_new.toLocaleString(num_format);
    }

    plotIndiaDailyConfirmedChart(30)
    plotIndiaTotalActiveChart(30)
}

load_trends_data()
