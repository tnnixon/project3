// Initialize layout parameters
var layout = {
    autosize: true,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    }
  }
  
  var config = {responsive: true}
  

// function to get month number from month name
function getMonthFromString(mon)
{
    console.log("In getMonthFromString");
    console.log(mon);
    var d = new Date(Date.parse(mon + " 1, 2012")).getMonth()+1;
    console.log(d);

    return d; 
}

// function to get last day of the monthe
function getLastDayOfMonth(year, mon)
{
    console.log("In getLastDayOfTheMonth");
    var y = parseInt(year);
    var m = parseInt(mon);
    var d = new Date(y, m, 0).getDate();
    console.log(d);

    return d;
}

// function to fetch new articles
function getArt(start, end)
{
    // where am I?
    console.log("In getArt");

    // convert input parameters to start / end dates
    var startYear = start.slice(0, 4);
    var startMo = start.slice(5);
    var startMoNum = getMonthFromString(startMo);
    var startDate = startYear + "-" + String(startMoNum).padStart(2, "0") + "-01";
    console.log(startDate);

    var endYear = end.slice(0, 4);
    var endMo = end.slice(5);
    var endMoNum = getMonthFromString(endMo);
    var endMoDay = getLastDayOfMonth(endYear, endMoNum);
    var endDate = endYear + "-" + String(endMoNum).padStart(2, "0") + "-" + String(endMoDay).padStart(2, "0");
    console.log(endDate);

    // build API url string

    var url1 = 'https://eodhistoricaldata.com/api/news?api_token=61d786d219bb25.49719494&t=financial results&offset=0&limit=3&from='
    var url2 = '&to='

    var url = url1 + startDate + url2 + endDate;
    console.log(url);

    // fetch some articles
    axios.get(url)
        .then(response => {
            //console.log(response.data);
            let articles = response.data;
            //console.log(articles);
            //console.log(article.title);

            // clear out old articles
            d3.select("#news").html("");

            for (let i = 0; i < articles.length; i++) {

                //d3.select("#news")
                //    .append("h5").text(articles[i].title);
                d3.select("#news")
                    //.append("a").text(articles[i].link)
                    .append("a").text(articles[i].title)
                    .attr("href", (articles[i].link));
                    d3.select("#news")
                    .append("br");
                    d3.select("#news")
                    .append("br");
            };
        })
        .catch(error => console.error(error));

}

// function to update everything
function updateStuff()
{
    console.log("In updateStuff");
    // grab start and end dates

    // get start date
    var selectBegin = d3.select("#selDataset1").property("value");

    // get end date
    var selectEnd = d3.select("#selDataset2").property("value");

    //console.log(selectBegin);
    //console.log(selectEnd);

    // update list of articles
    getArt(selectBegin,  selectEnd);

}

// build institutional plot
function buildInstPlot()
{
    // read inst.json
    d3.json("./Data_ETL/inst.json").then((data) => {
        console.log(data);

        var months = [];
        let monthsDict = data.month;
        var m0_vals = [];
        let m0_valsDict = data.m0_val;
        var m1_vals = [];
        let m1_valsDict = data.m1_val;
        var m2_vals = [];
        let m2_valsDict = data.m2_val;
        var djia_vals = [];
        let djia_valsDict = data.djia_val;
        var nasd_vals = [];
        let nasd_valsDict = data.nasd_val;
        var sp_vals = [];
        let sp_valsDict = data.sp_close;
        var hou_vals = [];
        let hou_valsDict = data.hou_val2;
        
        for (let i = 0; i < Object.keys(monthsDict).length; i++)
        {
            months.push(monthsDict[i]);
        };

        for (let i = 0; i < Object.keys(m0_valsDict).length; i++)
        {
            m0_vals.push(m0_valsDict[i]);
        };

        for (let i = 0; i < Object.keys(m1_valsDict).length; i++)
        {
            m1_vals.push(m1_valsDict[i]);
        };

        for (let i = 0; i < Object.keys(m2_valsDict).length; i++)
        {
            m2_vals.push(m2_valsDict[i]);
        };

        for (let i = 0; i < Object.keys(djia_valsDict).length; i++)
        {
            djia_vals.push(djia_valsDict[i]);
        };

        for (let i = 0; i < Object.keys(nasd_valsDict).length; i++)
        {
            nasd_vals.push(nasd_valsDict[i]);
        };

        for (let i = 0; i < Object.keys(sp_valsDict).length; i++)
        {
            sp_vals.push(sp_valsDict[i]);
        };

        for (let i = 0; i < Object.keys(hou_valsDict).length; i++)
        {
            hou_vals.push(hou_valsDict[i]);
        };

        var trace1 = {
            x: months,
            y: m0_vals,
            name: 'M0'
        };

        var trace2 = {
            x: months,
            y: m1_vals,
            name: 'M1'
        };

        var trace3 = {
            x: months,
            y: m2_vals,
            name: 'M2'
        };

        var trace4 = {
            x: months,
            y: djia_vals,
            name: 'DJIA'
        };

        var trace5 = {
            x: months,
            y: nasd_vals,
            name: 'NASDAQ'
        };

        var trace6 = {
            x: months,
            y: sp_vals,
            name: 'S&P 500'
        };

        var trace7 = {
            x: months,
            y: hou_vals,
            name: 'Housing'
        };

        var plotData = [trace2, trace3, trace4, trace5, trace6, trace7];

        Plotly.newPlot("chart1", plotData, layout, config);

    });
}

// build individual plot
function buildIndivPlot()
{
    // read indiv.json
    d3.json("./Data_ETL/indiv.json").then((data) => {
        console.log(data);

        var months = [];
        let monthsDict = data.month;
        var inflate_vals = [];
        let inflate_valsDict = data.inflate_val;
        var unemp_vals = [];
        let unemp_valsDict = data.unemp_val;
        var int_vals = [];
        let int_valsDict = data.int_val;
        
        for (let i = 0; i < Object.keys(monthsDict).length; i++)
        {
            months.push(monthsDict[i]);
        }
       
        for (let i = 0; i < Object.keys(inflate_valsDict).length; i++)
        {
            inflate_vals.push(inflate_valsDict[i]);
        }

        for (let i = 0; i < Object.keys(unemp_valsDict).length; i++)
        {
            unemp_vals.push(unemp_valsDict[i]);
        }

        for (let i = 0; i < Object.keys(int_valsDict).length; i++)
        {
            int_vals.push(int_valsDict[i]);
        }

        console.log("months");
        console.log(months[0]);
        console.log(inflate_vals);

        var trace1 = {
            x: months,
            y: inflate_vals,
            name: 'Inflation'
        };

        var trace2 = {
            x: months,
            y: unemp_vals,
            name: 'Unemployment'
        }

        var trace3 = {
            x: months,
            y: int_vals,
            name: 'Interest'
        }

        var plotData = [trace1, trace2, trace3];

        Plotly.newPlot("chart2", plotData, layout, config);
        
    });
        
}

// functio to initialize certain things
function initialize()
{

    console.log("In initialize")
    // Initialize Year / Month dropdown
    var select1 = d3.select("#selDataset1");
    var select2 = d3.select("#selDataset2");

    var years = ['2017', '2018', '2019', '2020', '2021'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    years.forEach((year) => {
        months.forEach((month) => {
            selOption = year + " " + month;
            select1.append("option")
            .text(selOption)
            .property("value", selOption);
            select2.append("option")
            .text(selOption)
            .property("value", selOption);
        });
    });

    buildInstPlot()

    buildIndivPlot()

}



// call initialization functon
initialize();
