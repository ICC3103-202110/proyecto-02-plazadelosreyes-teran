const fetch = require("node-fetch");
const MAX_TEMP = 40
const MIN_TEMP = -10
const CREATE_MAX_ACTUAL = 30 
const CREATE_MIN_ACTUAL = 3

function addTemp(){
    return (Math.random() * (CREATE_MAX_ACTUAL - CREATE_MIN_ACTUAL) + CREATE_MIN_ACTUAL)
}

function addMax(actualTemp){
    return (Math.random() * (MAX_TEMP - actualTemp) + actualTemp)
}

function addMin(actualTemp){
    return (Math.random() * (actualTemp - MIN_TEMP) + MIN_TEMP)
}

function toCelcius(temp) {
    return Number(temp - 273.15).toFixed(2)
}

function getData(city){
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a07735184058aa8d576e102f191e3cc2")
    .then(response => response.json())
    .then(data => [toCelcius(data.main.temp),toCelcius(data.main.temp_max),toCelcius(data.main.temp_min)])
    .catch(err => "City not found.")
}

function all(choice,model,city,mode){
    const addedTemp = addTemp()
    if (choice === "Delete city"){
        const position = model.zones.indexOf(city)
        model.zones.splice(position,1)
        model.temperatures.splice(position,1)
        model.max.splice(position,1)
        model.min.splice(position,1)
        return model
    }
    if (mode === "No"){
        if (getData(city) === "City not found"){
            return "City not found"
        }
        if (choice === "Add city"){
            model.zones.push(city)
            model.temperatures.push(getData(city)[0])
            model.max.push(getData(city)[1])
            model.min.push(getData(city)[2])
        }
        if (choice === "Update city"){
            const position = model.zones.indexOf(city)
            const newTemp = addTemp()
            model.temperatures[position] = (getData(city)[0])
            model.max[position] = (getData(city)[1])
            model.min[position] = (getData(city)[0])
        }
    }
    if (mode === "Yes"){
        if (choice === "Add city"){
            model.zones.push(city)
            model.temperatures.push(Number(addedTemp).toFixed(2))
            model.max.push(Number(addMax(addedTemp)).toFixed(2))
            model.min.push(Number(addMin(addedTemp)).toFixed(2))
        }
        if (choice === "Update city"){
            const position = model.zones.indexOf(city)
            const newTemp = addTemp()
            model.temperatures[position] = (Number(newTemp).toFixed(2))
            model.max[position] = (Number(addMax(newTemp)).toFixed(2))
            model.min[position] = (Number(addMin(newTemp)).toFixed(2))
        }
    }
    return model
}
module.exports = {
    all
}