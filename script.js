$(document).ready(function(){

    $("#searchBtn").on("click", function() {


        var cityName = $("#searchBox").val();


        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=2c7e4f5576f85a155786b3a87d4a70d8";
        console.log(queryUrl);


        $.ajax({
            url: queryURL,
            method: "GET" 
        }) .then(function(genData){
            console.log(genData);

            var temp = $("<p>").text("Temperature: " + (genData.response.main.temp) + "F");
            var humid = $("<p>").val("Humidity: " + (genData.response.main.humidity) + "%");
            var wSpeed = $("<p>").text("Wind Speed: " + (genData.response.wind.speed) + "MPH");
            
            var cityStatLon = $().text(genData.response.coord.lon);
            var cityStatLat = $().text(genData.response.coord.lat);

            $(".resultQuery1").append(cityName, temp, humidity, wSpeed);
        });
    });
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?"+cityName+"&units=imperial&appid=2c7e4f5576f85a155786b3a87d4a70d8";
            
            console.log(queryURL2);

        $.ajax({
            url: queryURL2,
            method: "GET" 
        }) .then(function(genData2){
            console.log(genData2);

             var uvI = $("<p>").text("UV Index: " + (genData2.response.value));

            var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityStatLat+"&lon="+cityStatLon+"&appid=2c7e4f5576f85a155786b3a87d4a70d8";
            
            console.log(queryURL3);

        $.ajax({
            url: queryURL3,
            method: "GET" 
        }) .then(function(genData3){
            console.log(genData3);


            function populateQueryHist() {
                var itemToAdd = {cityName};
                if (localStorage.getItem("cityName") === null) {
                var itemToAdd = [];
                searchList.push(itemToAdd);
            
                localStorage.setItem("cityName");
                } else {
                cityName.push(itemToAdd);
            
            
                }; 
            
            
            
            queryHist.forEach(function() {
                $("#searchList").append('<li>' + cityName);
            });

            $("#searchBox").on("click", function() {
                $("#searchBox").empty();
            });
 



};