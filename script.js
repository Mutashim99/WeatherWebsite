const searchButton = document.querySelector("#button-search")
const inputfield = document.querySelector(".upper input")
const cityName = document.querySelector(".temp h2")
const temperature = document.querySelector(".temp h1")
const humidity = document.querySelector(".humidText")
const wind = document.querySelector(".windText")


function getUserLocation(){
    navigator.geolocation.getCurrentPosition(res,rej)
}
function res(positon){
    let lati = positon.coords.latitude
    let longi = positon.coords.longitude
    console.log(lati,longi);
    getCurrentCityData(lati,longi)
}
function rej(){
    console.log("Errerr");
}
window.addEventListener("load",(e)=>{
    getUserLocation()
})

function getCurrentCityData(lati,longi){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=f65269916c0cc73812afd2aee17972e9&units=metric`)
    .then((res)=> res.json())
    .then((data)=>{
        
    })
}


searchButton.addEventListener("click" , (e)=>{
    let inputValue = inputfield.value
    inputfield.value = ""
    if(inputValue){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f65269916c0cc73812afd2aee17972e9&units=metric`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        console.log(data.name, Math.floor(data.main.temp), data.main.humidity , data.wind.speed ,data.weather[0].main);
        
        temperature.innerHTML = `${Math.floor(data.main.temp)}&deg;c`
        cityName.innerText = data.name
        humidity.innerText = data.main.humidity+"%"
        wind.innerText = data.wind.speed + " km/h"
        
    })}
    else{

    }
})

