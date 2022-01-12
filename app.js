var url = 'https://eodhistoricaldata.com/api/news?api_token='+api_key+'&t='+tag+'&offset=0&limit=1&from='+startdate+'&to='+enddate;
var data = {};

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));

  