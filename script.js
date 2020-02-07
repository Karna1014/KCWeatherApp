$(document).ready(function(){

    

    $("#search1").on("click", function() {
        $("#resultsQuery1").empty();
        var cityName = $("#cityToSearch").val().trim();
         cityName = cityName.charAt(0).toUpperCase() + cityName.substring(1);
        
        var cityStatLon = null;
        var cityStatLat = null;

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=2c7e4f5576f85a155786b3a87d4a70d8";
        console.log(queryURL);

//1st call Today's Weather info
        $.ajax({
            url : queryURL,
            method: "GET",
            success: function (genData) {
                console.log(genData);

                var unixTimestamp = genData.dt;
                var date = new Date(unixTimestamp * 1000).toLocaleDateString("en-us");
                console.log(date);
                
                $("#city").text(cityName);
                $("#dateToday").text(" (" + date + ")");
                $("#tempToday").text("Temperature: " + genData.main.temp + " " + String.fromCharCode(176) + "F");
                $("#humToday").text("Humidity: " + genData.main.humidity + "%");
                $("#wsToday").text("Wind Speed: " + genData.wind.speed + "MPH");

                cityStatLon = genData.coord.lon;
                cityStatLat = genData.coord.lat;
                
                var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat="+cityStatLat+"&lon="+cityStatLon+"&appid=2c7e4f5576f85a155786b3a87d4a70d8";
//2nd call UV info
                $.ajax({
                    url: queryURL2,
                    method: "GET",
                    success: function (genData2) {
                        $("#uvToday").text("UV Index: " + genData2.value);
                    }
                });
            }
        })
//3rd call 5 day Forecast
        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=2c7e4f5576f85a155786b3a87d4a70d8";
        console.log(queryURL3);
        $.ajax({
            url: queryURL3,
            method: "GET",
            success: function (genData3) {
                var weatherData = genData3.list;
                var count = 1;
                var currentDateToUse = null;
//Limit info pulled to the following day's date +
                var currentDate = $("#dateToday").text().trim().replace(/\(/g, '').replace(/\)/g, '');
                for (var i = 0; i < weatherData.length; i++) {
                    var dateToUse = new Date(weatherData[i]["dt"] * 1000).toLocaleDateString("en-us");
                    if (dateToUse != currentDate && dateToUse != currentDateToUse) {
                        $("#future" + count.toString() +"Date").text(dateToUse);
                        $("#future" + count.toString() + "Icon").attr("src", "http://openweathermap.org/img/w/" + weatherData[i]["weather"][0]["icon"] + ".png");
                        $("#future" + count.toString() + "Temp").text("Temperature: " + weatherData[i]["main"]["temp"] + String.fromCharCode(176) + "F" );
                        $("#future" + count.toString() + "Hum").text("Humidity: " + weatherData[i]["main"]["humidity"] + "%");
                        currentDateToUse = dateToUse;
                        count += 1;
                    }
                }
//Show all weather info when requested
                $("#resultQuery").css("display", "block");
            }
        });
        
//Search History List                             
        populateQueryHist(cityName);
        
    });
});
    var cityNames = JSON.parse(localStorage.getItem("cityNames"));
        if (cityNames != null) {
                cityNames.forEach(function(d) {
                $("#searchList").append('<li>' + d + '</li>');
                });
        } 
    

function populateQueryHist(cityName) {
    var cityNames = [];
    if (localStorage.getItem("cityNames") === null) {
        cityNames.push(cityName);
        localStorage.setItem("cityNames", JSON.stringify(cityNames));
    } else {
        cityNames = JSON.parse(localStorage.getItem("cityNames"));
        if (cityNames.indexOf(cityName) === -1) {
            cityNames.push(cityName);
        }

        localStorage.setItem("cityNames", JSON.stringify(cityNames));
    }
}