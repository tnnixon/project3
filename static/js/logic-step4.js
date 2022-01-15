



// Creating the map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
var geoData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Median_Household_Income_2016.geojson";
var stateGeoJSONURL = "gz_2010_us_040_00_500k.json"
//var stateGeoJSONURL = "https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_outline_20m.json"
var geojson;









state_data_set = [];
/* state_data = d3.csv("state_codes.csv",function(states){
    console.log(states);
    for (state of states){
      l_jsonfile = "LAUST"+ state.STATE + '0000000000003' + ".json"
      state_data_set.push(l_json_file)
    }});
 */




    
state_set = ['25','26','30','32','34','36','37','39','42','44',
              '47','48','49','53','55','72','24','01','02','04','05','06','08',
              '09','10','11','12','13','15','16','17','18','19','20','21','22',
              '27','28','29','31','33','35','38','40','41','45','46','50','51','54','56']


var promises = [];

state_data_set = state_set.map(function(state_d){
  l_jsonfile = {state:state_d,file:"LAUST"+ state_d + '0000000000003' + ".json"};
  return(l_jsonfile);
}
);

state_data_set.forEach(function(statedata) {
    promises.push(d3.json(statedata.file))
});

all_data=[]
Promise.all(promises).then(function(values) {
    for (value of values){
      state_dcode = value.Results.series[0].seriesID.substring(5,7);
//      console.log(value);
      console.log(state_dcode);
      latest_unemp_rate = value.Results.series[0].data[0].value
      console.log(latest_unemp_rate);
      unemp_rate_3_yr = value.Results.series[0].data.map(function(rec){return parseFloat(rec.value)});
      console.log(unemp_rate_3_yr);
      state_3yr_avg = unemp_rate_3_yr.reduce((total, amount, index, array) => {
        total += amount;
        if( index === array.length-1) { 
          return total/array.length;
        }else { 
          return total;
        }
      });
      console.log("values found"+ latest_unemp_rate + " avg" + state_3yr_avg);
    

      all_data.push({statecode:state_dcode,latest_data:latest_unemp_rate,avg_data:state_3yr_avg,dataset:value})
    }
});
//console.log(all_data);


/* state_data_set = state_set.map(function(state_d){
  l_jsonfile = {state:state_d,file:"LAUST"+ state_d + '0000000000003' + ".json"};
  return(l_jsonfile);
}
);

console.log(state_data_set);

 Promise.all(state_data_set.map(url => d3.json(url.file))).then(function(values) {
      state_empl_data = 
      console.log(values)
}); */


function get_state_data(series_code)
{

/*   api_sig1=JSON.stringify({
    seriesid: [series_code],
    startyear: "2011",
    endyear: "2021",
    mode:"no-cors",
    credentials:"same-origin",
registrationkey:"aa0178058edc459288bae0b8f2e6c502"
  })

  console.log(api_sig1)

  url='https://api.bls.gov/publicAPI/v2/timeseries/data/' */

/*   let fetchData = {
    method: 'POST',
    body: api_sig1,
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  
  fetch(url, fetchData)
  .then(function(fetchData) {
      console.log(FetchData)
    // Handle response you get from the API
  });
 */
  
  
  let latest_data_url = "https://api.bls.gov/publicAPI/v2/timeseries/data/" + series_code+ "?registrationkey=aa0178058edc459288bae0b8f2e6c502"
  console.log("Getting latest data for " + latest_data_url)
  latest_avg=d3.json(latest_data_url).then(function(data){
    console.log('Fetched Data for ' + latest_data_url)
    console.log(data);
    latest_unemp_rate = data.Results.series[0].data[0].value
    console.log(latest_unemp_rate);
    unemp_rate_3_yr = data.Results.series[0].data.map(function(rec){return parseFloat(rec.value)});
    console.log(unemp_rate_3_yr);
    state_3yr_avg = unemp_rate_3_yr.reduce((total, amount, index, array) => {
      total += amount;
      if( index === array.length-1) { 
        return total/array.length;
      }else { 
        return total;
      }
    });
    console.log("values found"+ latest_unemp_rate + " avg" + state_3yr_avg);
    return[latest_unemp_rate,state_3yr_avg];
  }
  )
  return(latest_avg);
/*   d3.json('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      method:"POST",
//      mode:"no-cors",
//      credentials:'same-origin',
      body: JSON.stringify({
        seriesid: [stateCode],
        startyear: "2011",
        endyear: "2021",
//        mode:"no-cors",
//        credentials:"same-origin",
        registrationkey:"aa0178058edc459288bae0b8f2e6c502"
      }),
      headers: {
        "Content-type": "application/json",mode:"no-cors",
        credentials:'same-origin'
      }
    }).then(function(data){
      console.log(data);
    },function(error)
    {
      console.log(error);
    });
*/
};

//get_state_data('LAUCN131210000000003');

function get_random_color() 
{
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}


function get_color(state)
{
  console.log("In get color" + state );
  //  console.log(all_data);
  l_latest_unemp_rate = 0.0;
  console.log(state);
  for (element of all_data){
    console.log("Getting alldata elements");
    console.log(element);
    if (element.statecode==state){
      l_latest_unemp_rate = element.latest_data;
      console.log(" latest unemp data for " + state + " is " + l_latest_unemp_rate);
    };

  };
  if (l_latest_unemp_rate == 0.0){
    console.log('Did not find state');
  }
  else {
    console.log(" latest unemp data for " + state + " is " + l_latest_unemp_rate);
  };
  //  get_unemp_dat = all_data.find(element => element.statecode == state);
  //  console.log(get_unemp_dat);
  //  l_latest_unemp_rate = get_unemp_dat.latest_data;
  if (l_latest_unemp_rate < 0){
    return('#6699ff');
  }
  else if(l_latest_unemp_rate < 1){
    return('#99ccff');
  }
  else if(l_latest_unemp_rate < 2){
    return('#ffffff');
  }
  else if(l_latest_unemp_rate < 3){
    return('#ffffcc');
  }
  else if(l_latest_unemp_rate < 4){
    return('#ffff99');
  }
  else if(l_latest_unemp_rate < 5){
    return('#ffff66');
  }
  else if(l_latest_unemp_rate < 6){
    return('#ffff00');
  }
  else if(l_latest_unemp_rate < 7){
    return('#cc9900');
  }
  else if(l_latest_unemp_rate < 8){
    return('#663300');
  }
  else if(l_latest_unemp_rate >= 8){
    return('#003300');
  }


    l_color = get_random_color();
    return(l_color);


};


function get_state_empl_data(state)
{
  l_latest_unemp_rate = 0.0;
  l_avg_rate = 0.0;
  console.log(state);
  for (element of all_data){
    console.log("Getting alldata elements");
    console.log(element);
    if (element.statecode==state){
      l_latest_unemp_rate = Math.round(element.latest_data,2);
      l_avg_rate = Math.round(element.avg_data,2);
      console.log(" latest unemp data for " + state + " is " + l_latest_unemp_rate);
    };

  };
  if (l_latest_unemp_rate == 0.0){
    console.log('Did not find state');
  }
  else {
    console.log(" latest unemp data for " + state + " is " + l_latest_unemp_rate);
  };
  return([l_latest_unemp_rate,l_avg_rate]);
//    return(l_latest_unemp_rate);
  
};

function get_state_data_html(statecode){
    l_arr =  get_state_empl_data(statecode)
    l_html = "<h1>" + feature.properties.STATE + "</h1> <hr>" + 
    "<h2>Latest Unemployment Rate : &nbsp;" + l_arr[0] + "</h2><hr>"
    "<h2>Average Unemployment Rate : &nbsp;" + l_arr[1] + "</h2><hr>"
    return(l_html);
};

all_states=[];
// Get the data with d3.
d3.json(stateGeoJSONURL).then(function(data) {
  console.log(data);
   L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
     style: function(feature) {
       return {
         color: "white",
         color: get_random_color(),
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
         fillColor: get_color(feature.properties.STATE),
         fillOpacity: 0.5,
         weight: 1.5
       };
     },



     onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        }
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//        click: function(event) {
//          myMap.fitBounds(event.target.getBounds());
//        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.NAME + "</h1> <hr> <h4>Unemployment Rate :" + get_state_empl_data(feature.properties.STATE) + "</h4>")
//      layer.bindPopup(get_state_data_html(feature.properties.STATE))

    }
   
//     onEachFeature: function(feature, layer){
//       console.log(feature.properties.NAME);
//     }

   }).addTo(myMap);





  var legend = L.control({
    position: 'bottomright'
  });

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    var depths = ["<0","0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8",">8"];
    depthColors=["#6699ff","#99ccff","#ffffff","#ffffcc","#ffff99","#ffff66","#ffff00", "#cc9900","#663300","#003300"];
    var legendInfo = "<h1>Unemployment Rate</h1>" +
      "<div class=\"labels\">" +
      "</div>";
    div.innerHTML = legendInfo;

    labels = [];
    depths.forEach(function(depth ,index) {
        labels.push("<li style=\"background-color: " + depthColors[index] + '\">'+depths[index]+"</li>");      
        console.log(labels);
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
      



  }; // end legend.onAdd

  legend.addTo(myMap);


  myMap.on('overlayremove', function (eventLayer) {
    if (eventLayer.name === 'Earthquakes') {
      this.removeControl(legend);
    }
  });

  myMap.on('overlayadd', function (eventLayer) {
    // Turn on the legend...
    if (eventLayer.name === 'Earthquakes') {
      legend.addTo(this);
    }
  });

 });
