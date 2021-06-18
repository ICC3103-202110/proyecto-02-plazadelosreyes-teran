const fetch = require("node-fetch");
const axios = require("axios")
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

function toCelsius(temp) {
    return Number(temp - 273.15).toFixed(2)
}

async function getData(city){
    
    return await axios({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a07735184058aa8d576e102f191e3cc2",
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
       .then(res => [toCelsius(res.data.main.temp),toCelsius(res.data.main.temp_max),toCelsius(res.data.main.temp_min)])
       .catch (err => "Not found")
    }

async function all(choice,model,city,mode){
    const addedTemp = addTemp()
    if (choice === "Delete city"){
        const position = model.zones.indexOf(city)
        model.zones.splice(position,1)
        model.temperatures.splice(position,1)
        model.max.splice(position,1)
        model.min.splice(position,1)
        return model
    }
    if (mode === "Yes"){
        let dataResult = await getData(city)
        if (dataResult === "Not found"){
            return false
        }
        if (choice === "Add city"){
            model.zones.push(city)
            model.temperatures.push(dataResult[0])
            model.max.push(dataResult[1])
            model.min.push(dataResult[2])
            
        }
        if (choice === "Update city"){
            const position = model.zones.indexOf(city)
            model.temperatures[position] = (dataResult[0])
            model.max[position] = (dataResult[1])
            model.min[position] = (dataResult[2])
        }
    }
    if (mode === "No"){
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