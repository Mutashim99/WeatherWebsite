const searchButton = document.querySelector("#button-search")
const inputfield = document.querySelector(".upper input")

searchButton.addEventListener("click" , (e)=>{
    let inputValue = inputfield.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f65269916c0cc73812afd2aee17972e9&units=metric`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    })
})

