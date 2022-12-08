const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const apiKey="b5f8a2a27ca88545fab0c212da317ca4"


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

function getCitySearch(){
    let city123 = document.getElementById("city123");
    console.log(city123.value);
    getData(city123.value);
}
function formatCity(input)
{

    let lowerCaseInput=input.toLowerCase();
    let str=lowerCaseInput.slice(1);
    lowerCaseInput= lowerCaseInput.charAt(0).toUpperCase()+str;
    //console.log(lowerCaseInput);
    return lowerCaseInput;
}
// function getWeatherData () {
//     navigator.geolocation.getCurrentPosition((success) => {
        
//         let {latitude, longitude } = success.coords;

//         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

//         console.log(data)
//         showWeatherData(data);
//         })

//     })
// }
function getData(input)
{
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data)
    })
}
function showWeatherData (data) {
    let podatoci=data.main;
    let humidity = podatoci.humidity;
    let temp = podatoci.temp;
    let feels_like = podatoci.feels_like;
    let weather = data.weather[0].main;
    // console.log(podatoci);
    // console.log("Temperature: "+podatoci.temp);
    // console.log("Feels like: "+podatoci.feels_like);
    // console.log("123:"+data.weather[0].main);
    // console.log("Humidity:"+podatoci.humidity);
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${temp}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${feels_like}</div>
    </div>
    <div class="weather-item">
    <div>Weather</div>
        <div>${weather}</div>
    </div>
  
    `;
    let lon = data.coord.lon;
    let lat = data.coord.lat;
    inNextDaysWeather(lon,lat);
}
function inNextDaysWeather(lon,lat){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=metric&lon=${lon}&appid=${apiKey}`).then(res => res.json()).then(nextData => {
        console.log(nextData);
        showNextWeatherData(nextData);
    });

}
function showNextWeatherData(data){
    let weatherForecast = document.getElementById("weather-forecast");

    for(let i = 8;i <= 24;i+=8){
        let day = data.list[i].dt_txt;
        let weather = data.list[i].weather[0].main;
        let temp = data.list[i].main.temp;
        weatherForecast.innerHTML += `
        <div class="weather-forecast-item">
                    <div class="day">Tue</div>
                    <div class="temp">Day: "${weather}&#176; C</div>
                    <div class="temp">Temperature: "${temp}&#176; C</div>
        </div>
    `
    }
  
    
}
// function showWeatherData (data){
//     let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

//     timezone.innerHTML = data.timezone;
//     countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    // currentWeatherItemsEl.innerHTML = 
    // `<div class="weather-item">
    //     <div>Humidity</div>
    //     <div>${humidity}%</div>
    // </div>
    // <div class="weather-item">
    //     <div>Pressure</div>
    //     <div>${pressure}</div>
    // </div>
    // <div class="weather-item">
    //     <div>Wind Speed</div>
    //     <div>${wind_speed}</div>
    // </div>

    // <div class="weather-item">
    //     <div>Sunrise</div>
    //     <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    // </div>
    // <div class="weather-item">
    //     <div>Sunset</div>
    //     <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    // </div>
    
    
    // `;

//     let otherDayForcast = ''
//     data.daily.forEach((day, idx) => {
//         if(idx == 0){
//             currentTempEl.innerHTML = `
//             <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
//             <div class="other">
//                 <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
//                 <div class="temp">Night - ${day.temp.night}&#176;C</div>
//                 <div class="temp">Day - ${day.temp.day}&#176;C</div>
//             </div>
            
//             `
//         }else{
//             otherDayForcast += `
//             <div class="weather-forecast-item">
//                 <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
//                 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
//                 <div class="temp">Night - ${day.temp.night}&#176;C</div>
//                 <div class="temp">Day - ${day.temp.day}&#176;C</div>
// //             </div>
            
// //             `
//         }
//     })


//     weatherForecastEl.innerHTML = otherDayForcast;
// }