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


function all(choice,model,city){
    const addedTemp = addTemp()
    if (choice === "Add city"){
        model.zones.push(city)
        model.temperatures.push(Number(addedTemp).toFixed(2))
        model.max.push(Number(addMax(addedTemp)).toFixed(2))
        model.min.push(Number(addMin(addedTemp)).toFixed(2))
    }
    if (choice === "Delete city"){
        const position = model.zones.indexOf(city)
        model.zones.splice(position,1)
        model.temperatures.splice(position,1)
        model.max.splice(position,1)
        model.min.splice(position,1)
    }
    if (choice === "Update city"){
        const position = model.zones.indexOf(city)
        const newTemp = addTemp()
        model.temperatures[position] = (Number(newTemp).toFixed(2))
        model.max[position] = (Number(addMax(newTemp)).toFixed(2))
        model.min[position] = (Number(addMin(newTemp)).toFixed(2))
    }
    return model
}
module.exports = {
    all
}