
// function to update everything
function updateStuff()
{
    console.log("In updateStuff");
    // grab start and end dates

    // get start date
    var selectBegin = d3.select("#selDataset1").property("value");

    // get end date
    var selectEnd = d3.select("#selDataset2").property("value");

    console.log(selectBegin);
    console.log(selectEnd);
}
