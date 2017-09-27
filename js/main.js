$(document).ready(function () {

  returnGreeting();

});

$("#lupa").on("click", function () {

  getCity();

});

$(document).keypress(function(e) {
    if(e.which == 13) {

      getCity();
    }
});


function getCity() {

  var city = $("#search").val();

  if (city != " ") {


    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=en&APPID=3606bee86d0ab66c2010129ff907d3b8", function (data) {


      showCity(data);


    });

  }

}

function returnGreeting() {

  var today = new Date();

  var hourNow = today.getHours();

  var greeting;

  var htmlgreting = document.getElementById("greeting");

  if (hourNow > 18) {
    greeting = 'Good evening!';
  } else if (hourNow > 12) {
    greeting = ' Good afternoon!';
  } else if (hourNow > 0) {
    greeting = 'Good morning!';
  } else {
    greeting = 'Welcome!';
  }

  htmlgreting.innerHTML = greeting;

}

//function getWeather(data) {
//
//  for (var i = 0; i < data.list.length; i++) {
//
//    var eachCity = data.list[i];
//
//    createCities(eachCity, i);
//
//  }
//
//  $(".cityName").hide();
//
//  $('.city').on("mouseover mouseout", function () {
//
//    $(this).children(".cityName").toggle();
//
//  });
//
//  $(".city").click(function () {
//
//    var cityIndex = $(this).attr("data-position");
//
//    showCity(data, cityIndex);
//  });
//}

//function createCities(eachCity, i) {
//
//  var createCities = document.createElement("div");
//  createCities.setAttribute("class", "city");
//  createCities.setAttribute("data-position", i);
//  createCities.setAttribute("title", eachCity.name)
//
//  var createHyphen = document.createElement("p");
//  createHyphen.setAttribute("class", "hypen");
//
//  var createCity = document.createElement("p");
//  createCity.setAttribute("class", "cityName");
//
//  createCity.innerHTML = eachCity.name;
//  createHyphen.innerHTML = "⚊";
//
//  createCities.appendChild(createCity);
//  createCities.appendChild(createHyphen);
//
//  $("nav").append(createCities);
//
//}

function showCity(data) {

  fillLocation(data);
  fillWeather(data);
  fillOtherInfo(data);

}

function fillLocation(data) {

  var locationDiv = $("#location");
  $("#location").empty();

  var cityName = data.name

  var cityTitle = document.createElement("p");
  cityTitle.setAttribute("class", "cityTitle");

  cityTitle.innerHTML = cityName;
  locationDiv.append(cityTitle);

  var pDay = document.createElement("p");
  pDay.setAttribute("class", "day");
  var day = obtainDay();

  var pDayNumber = document.createElement("p");
  pDayNumber.setAttribute("class", "dayNumber");
  var dayNumber = obtainDayNumber();

  var pMonth = document.createElement("p");
  pMonth.setAttribute("class", "month");
  var month = obtainMonth();

  var bar = document.createElement("p");
  bar.setAttribute("class", "bar");
  var iconBar = "|";

  var pHour = document.createElement("p");
  pHour.setAttribute("class", "hour");
  var hour = obtainHour();

  var pWeather = document.createElement("p");
  pWeather.setAttribute("class", "weather");
  var weather = data.weather[0].main;

  var pWeatherDescription = document.createElement("p");
  pWeatherDescription.setAttribute("class", "weatherDescription");
  var weatherDescription = data.weather[0].description;

  var fulldate = document.createElement("div");
  fulldate.setAttribute("class", "fulldate");

  pDay.innerHTML = day + ",";
  fulldate.appendChild(pDay);

  pDayNumber.innerHTML = dayNumber;
  fulldate.appendChild(pDayNumber);

  pMonth.innerHTML = month;
  fulldate.appendChild(pMonth);

  bar.innerHTML = iconBar;
  fulldate.appendChild(bar);

  pHour.innerHTML = hour;
  fulldate.appendChild(pHour);

  locationDiv.append(fulldate);

  pWeather.innerHTML = weather;
  locationDiv.append(pWeather);

  pWeatherDescription.innerHTML = weatherDescription;
  locationDiv.append(pWeatherDescription);


}

function fillWeather(data) {

  var weatherDiv = $("#weather");
  $("#weather").empty();

  var weatherIcon = document.createElement("div");
  weatherIcon.setAttribute("class", "weatherIcon");

  var weatherLogo = obtainLogo(data);

  var img = document.createElement("img");
  img.setAttribute('src', weatherLogo);
  img.setAttribute("class", "weatherLogo");


  weatherIcon.appendChild(img);
  weatherDiv.append(weatherIcon);

  var divTemp = document.createElement("div");
  var pTemp = document.createElement("p");
  divTemp.setAttribute("class", "temperature");
  pTemp.setAttribute("class", "temp");

  var temperature = Math.round(data.main.temp);

  pTemp.innerHTML = temperature + " cº";

  //  var temperatureLogo = "style/celsius.png"
  //  var temperatureImg = document.createElement("img");
  //  temperatureImg.setAttribute('src', temperatureLogo);
  //  temperatureImg.setAttribute("class", "temperatureLogo");
  //
  //  divTemp.appendChild(temperatureImg);
  divTemp.appendChild(pTemp);
  weatherDiv.append(divTemp);

}

function fillOtherInfo(data) {

  var otherInfoDiv = $("#otherInfo");
  $("#otherInfo").empty();

  var info = document.createElement("div");
  info.setAttribute("class", "info");


  //Min temperature:

  var minTemp = Math.round(data.main.temp_min);

  var minTempLogo = "style/freezing.png";

  var pMinTemp = document.createElement("p");
  pMinTemp.setAttribute("class", "pInfo");
  pMinTemp.innerHTML = minTemp + "º";

  var minTempDiv = document.createElement("div");
  minTempDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", minTempLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Min Temp");
  infoImg.setAttribute("alt", "Min Temp");

  minTempDiv.appendChild(infoImg);
  minTempDiv.appendChild(pMinTemp);

  //Max temperature:

  var maxTemp = Math.round(data.main.temp_max);

  var maxTempLogo = "style/maxtemperature.png";

  var pMaxTemp = document.createElement("p");
  pMaxTemp.setAttribute("class", "pInfo");
  pMaxTemp.innerHTML = maxTemp + "º";

  var maxTempDiv = document.createElement("div");
  maxTempDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", maxTempLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Max Temp");
  infoImg.setAttribute("alt", "Max Temp");

  maxTempDiv.appendChild(infoImg);
  maxTempDiv.appendChild(pMaxTemp);

  // Clouds:

  var clouds = data.clouds.all;

  var cloudLogo = "style/cloud.png";

  var pClouds = document.createElement("p");
  pClouds.setAttribute("class", "pInfo");
  pClouds.innerHTML = clouds + " %";

  var cloudsDiv = document.createElement("div");
  cloudsDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", cloudLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Clouds");
  infoImg.setAttribute("alt", "Clouds");

  cloudsDiv.appendChild(infoImg);
  cloudsDiv.appendChild(pClouds);

  // Wind:

  var wind = data.wind.speed;

  var windLogo = "style/wind.png";

  var pWind = document.createElement("p");
  pWind.setAttribute("class", "pInfo");
  pWind.innerHTML = wind + " km/h";

  var windDiv = document.createElement("div");
  windDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", windLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Wind");
  infoImg.setAttribute("alt", "Wind");

  windDiv.appendChild(infoImg);
  windDiv.appendChild(pWind);

  // Humidity:

  var humidity = data.main.humidity;

  var humidityLogo = "style/humidity.png";

  var pHumidity = document.createElement("p");
  pHumidity.setAttribute("class", "pInfo");
  pHumidity.innerHTML = humidity + " %";

  var humidityDiv = document.createElement("div");
  humidityDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", humidityLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Humidity");
  infoImg.setAttribute("alt", "Humidity");

  humidityDiv.appendChild(infoImg);
  humidityDiv.appendChild(pHumidity);

  // Presure:

  var pressure = Math.round(data.main.pressure);

  var pressureLogo = "style/barometer.png";

  var pPressure = document.createElement("p");
  pPressure.setAttribute("class", "pInfo");
  pPressure.innerHTML = pressure + " hPa";

  var pressureDiv = document.createElement("div");
  pressureDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", pressureLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Pressure");
  infoImg.setAttribute("alt", "Barometer");

  pressureDiv.appendChild(infoImg);
  pressureDiv.appendChild(pPressure);

  // SunRise:

  var sunRise = data.sys.sunrise;

  var sunRiseHour = obtainSunHour(sunRise);

  var sunRiseLogo = "style/sunrise.png";

  var pSunRise = document.createElement("p");
  pSunRise.setAttribute("class", "pInfo");
  pSunRise.innerHTML = sunRiseHour + " am";

  var sunRiseDiv = document.createElement("div");
  sunRiseDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", sunRiseLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Sunrise");
  infoImg.setAttribute("alt", "Sunrise");

  sunRiseDiv.appendChild(infoImg);
  sunRiseDiv.appendChild(pSunRise);

  // SunSet:

  var sunSet = data.sys.sunset;

  var sunSetHour = obtainSunHour(sunSet);

  var sunSetLogo = "style/sunset.png";

  var pSunSet = document.createElement("p");
  pSunSet.setAttribute("class", "pInfo");
  pSunSet.innerHTML = sunSetHour + " pm";

  var sunSetDiv = document.createElement("div");
  sunSetDiv.setAttribute("class", "infoDiv");

  var infoImg = document.createElement("img");
  infoImg.setAttribute("src", sunSetLogo);
  infoImg.setAttribute("class", "infoImg");
  infoImg.setAttribute("title", "Sunset");
  infoImg.setAttribute("alt", "Sunset");

  sunSetDiv.appendChild(infoImg);
  sunSetDiv.appendChild(pSunSet);

  //Apend divs to parent div

  info.appendChild(minTempDiv);
  info.appendChild(maxTempDiv);
  info.appendChild(cloudsDiv);
  info.appendChild(windDiv);
  info.appendChild(humidityDiv);
  info.appendChild(pressureDiv);
  info.appendChild(sunRiseDiv);
  info.appendChild(sunSetDiv);

  otherInfoDiv.append(info);

}

function obtainLogo(data) {

  var rain = "style/rain.png";

  var clouds = "style/cloudy.png";

  var sunny = "style/sunny.png";

  var clear = "style/sun.png";

  var drizzle = "style/drizzle.png";

  var thunderstorm = "style/thunderstorm.png";

  var snow = "style/snow.png";

  var atmosphere = "style/atmosphere.png";

  var extreme = "style/extreme.png";

  var aditional = "style/aditional.png";

  var weather = data.weather[0].main;


  switch (weather) {

    case "Rain":

      $("body").css("background", "steelBlue");

      return rain;
      break;

    case "Clouds":

      $("body").css("background", "silver");

      return clouds;
      break;

    case "Clear":

      $("body").css("background", "#e59f00");

      return sunny;
      break;

    case "Drizzle":

      $("body").css("background", "royalBlue");

      return drizzle;
      break;

    case "Thunderstorm":

      $("body").css("background", "lightslategrey");

      return thunderstorm;
      break;

    case "Snow":

      $("body").css("background", "black");

      return snow;
      break;

    case "Atmosphere":

      $("body").css("background", "gray");

      return atmosphere;
      break;

    case "Extreme":

      $("body").css("background", "IndianRed");
      return extreme;
      break;

      case "Mist":

      $("body").css("background", "gray");

      return atmosphere;

      break;

      case "Fog":

      $("body").css("background", "grey");

      return atmosphere;
      break;

    case "Haze":

      $("body").css("background", "gray");

      return atmosphere;

    case "Aditional":

      $("body").css("background", "SeaGreen");

      return aditional;
      break;

    default:
      text = "Weather not available";

  }

}

function obtainDay() {

  var d = new Date();

  var weekday = new Array(7);

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var day = weekday[d.getDay()];

  return day;

}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function obtainHour() {

  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());

  var hour = h + ":" + m;

  return hour;

}

function obtainMonth() {

  var month = new Array();
  month[0] = "Jan";
  month[1] = "Fe";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  var d = new Date();

  month = month[d.getMonth()];

  return month;

}

function obtainDayNumber() {

  var d = new Date();
  var dayNumber = d.getDate()

  return dayNumber;

}

function obtainSunHour(horaJson) {

  var d = new Date(horaJson);

  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());

  var hour = h + ":" + m;

  return hour;

}

//$(document).ready(function() {
//
//  $(".city").on("hover",(function() {
//
//    $(".cityName").css("display", "block");
//
//  }));
//
//});
