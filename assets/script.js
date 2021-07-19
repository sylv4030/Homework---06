// Variable for city search history stored in local storage
var searchHistory = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : []

// variables for displaying the forecast details
var inputEl = document.getElementById("city-input");
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-history");
var temp = document.getElementById("temperature");
var picture = document.getElementById("weather-picture");
var humidityLevel = document.getElementById("dew-point");
var windMPH = document.getElementById("wind");
var day = document.getElementById("date");
var firstDay = document.getElementById("temp1");
var secondDay = document.getElementById("temp2");
var thirdDay = document.getElementById("temp3");
var fourthDay = document.getElementById("temp4");
var fifthDay = document.getElementById("temp5");
var clear = searchHistory.innerHTML=[];
var nameEl = document.getElementById("city-name");

// Code for displaying the date and future dates
var today = new Date ();
var tomorrow = new Date(today);
var dayAfter= new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
dayAfter = new Date(dayAfter.getDate() + 2);

// API key variable
var APIKey = "e49bce451103e9e46812578c0f85025c";

// Function to display search results to html
function showHistory () {
	document.querySelector('#history').innerHTML=''
	for( i=0; i<searchHistory.length; i++ )
	document.querySelector('#history').innerHTML+=`
	<li onclick="weatherHistory('${searchHistory[i]}')"class="btn btn-primary mb-1">${searchHistory[i]}</li>`
}

// API call and setting variables from the returned object and setting new content of HTML id variables set above
function showWeather(response) {   
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl.value + "&units=imperial" + "&appid=" + APIKey;
    axios.get(queryURL)
    .then(function(response){
        console.log(response.data.weather[0].description);
        console.log(response.data.main.humidity);
        let degrees = response.data.main.temp;
        let icon = `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
        let windSpeed = response.data.wind.speed;
        day.innerHTML = today;
        temp.innerHTML = "Temp " + degrees;
        windMPH.innerHTML = "Wind: " + windSpeed + " mph";
        humidityLevel.innerHTML = "Humidty: " + response.data.main.humidity + " %";
        picture.setAttribute('src', icon);
        
    })
    nameEl.innerHTML = inputEl.value;   

}
// API call for 5 days and setting content of forecast HTML
function showFiveday (fresponse) {   
    
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl.value + "&units=imperial" + "&appid=" + APIKey + "&cnt=5";
    axios.get(queryURL)
    .then(function(fresponse){
        console.log(fresponse);
        let fTemp = fresponse.data.list[0].main.temp;

        firstDay.innerHTML = "Date: " + tomorrow + "<br /> Temp: " + fTemp;
        secondDay.innerHTML = "Date: " + dayAfter + "<br /> Temp: " + fresponse.data.list[1].main.temp;
        thirdDay.innerHTML = "Temp: " + fresponse.data.list[2].main.temp;
        fourthDay.innerHTML = "Temp: " + fresponse.data.list[3].main.temp;
        fifthDay.innerHTML = "Temp: " + fresponse.data.list[4].main.temp;
      
    })
}

// Event listener for submit button and starting history, weather, and forecast functions
 searchEl.addEventListener("click",function() { 

    showHistory();
    showWeather();
    showFiveday();
    console.log(inputEl.value);
    searchHistory.push(inputEl.value);
    localStorage.searchHistory=JSON.stringify(searchHistory)
})

// Starting working on a clear history button, wasn't able to get it work
//  clearEl.addEventListener("click",function() {
      
//       localStorage.searchHistory=clear;
     
//  })



