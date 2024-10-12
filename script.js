const searchButton = document.querySelector("#button-search")
const inputfield = document.querySelector(".upper input")
const cityName = document.querySelector(".temp h2")
const temperature = document.querySelector(".temp h1")
const humidity = document.querySelector(".humidText")
const wind = document.querySelector(".windText")
const clouds = document.querySelector(".cloudText")
const feelslike = document.querySelector(".feelslikeText")
const errormsg = document.querySelector(".errormsg")
const errormsgp = document.querySelector(".errormsg p")
const imgDiv = document.querySelector(".img")
const cardforbgchange = document.querySelector(".card") 

function getUserLocation(){
    navigator.geolocation.getCurrentPosition(res,rej)
}
function res(positon){
    let lati = positon.coords.latitude
    let longi = positon.coords.longitude
    getCurrentCityData(lati,longi)
}
function rej(){
    cityName.innerText = 'PLease Enable location or Search'
    cityName.style.textAlign = "center"
}
window.addEventListener("load",(e)=>{
    getUserLocation()
})
function getCurrentCityData(lati,longi){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=f65269916c0cc73812afd2aee17972e9&units=metric`)
    .then((res)=> res.json())
    .then((data)=>{
        showData(data)
    })
}
searchButton.addEventListener("click" , (e)=>{
    let inputValue = inputfield.value
    inputfield.value = ""
    if(inputValue){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f65269916c0cc73812afd2aee17972e9&units=metric`)
    .then((res)=> res.json())
    .then((data)=>{
        if(data.cod === 200){
        showData(data);
        }else{
            errormsgp.innerText = `${inputValue} is not a valid city`
            errormsg.style.display = "block"
        }
    }).catch((err)=>{
        console.log(err);
    })}
    else{
        errormsgp.innerText = `Please Enter City Name`
        errormsg.style.display = "block"
    }
})
inputfield.addEventListener("focus", (e)=>{
    errormsg.style.display = "none"
})
const imageIcon = document.createElement("img")
function showData(data){
    temperature.innerHTML = `${Math.floor(data.main.temp)}&deg;c`
        cityName.innerText = data.name
        humidity.innerText = data.main.humidity+"%"
        wind.innerText = data.wind.speed + " km/h"
        clouds.innerText = data.clouds.all + "%"
        feelslike.innerHTML = Math.floor(data.main.feels_like) + "&deg;c"
        console.log(data.weather[0].main.toLowerCase());
        

        if (data.weather[0].main.toLowerCase() === "clear") {
            imageIcon.src = `images/clear.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #0093E9, #0066FF)"; 
        } else if (data.weather[0].main.toLowerCase() === "haze") {
            imageIcon.src = `images/haze.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #929292, #6e6e6e)"; 
        } else if (data.weather[0].main.toLowerCase() === "thunderstorm") {
            imageIcon.src = `images/thunderstorms.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #232526, #414345);"; 
        } else if (data.weather[0].main.toLowerCase() === "drizzle") {
            imageIcon.src = `images/drizzle.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #4e89ae, #43658b)"; 
        } else if (data.weather[0].main.toLowerCase() === "snow") {
            imageIcon.src = `images/snow.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #6c7a89, #35495e)";
        } else if (data.weather[0].main.toLowerCase() === "rain") {
            imageIcon.src = `images/rain.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #005c97, #363795)";
        } else if (data.weather[0].main.toLowerCase() === "mist") {
            imageIcon.src = `images/mist.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #5d6d7e, #34495e)"; 
        } else if (data.weather[0].main.toLowerCase() === "fog") {
            imageIcon.src = `images/fog.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #4b6584, #2c3e50)";
        } else if (data.weather[0].main.toLowerCase() === "dust") {
            imageIcon.src = `images/dust.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #8e6e53, #704a30)";
        } else if (data.weather[0].main.toLowerCase() === "tornado") {
            imageIcon.src = `images/tornado.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #0f2027, #203a43)";
        } else if (data.weather[0].main.toLowerCase() === "clouds") {
            imageIcon.src = `images/cloudy.svg`;
            cardforbgchange.style.background = "linear-gradient(135deg, #616161, #2c3e50)"; 
        }
        imgDiv.appendChild(imageIcon)
    
        
}
