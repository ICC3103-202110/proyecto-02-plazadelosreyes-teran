const MAX_TEMP = 40
const MIN_TEMP = -10
const CREATE_MAX_ACTUAL = 30 
const CREATE_MIN_ACTUAL = 3

function add(name){
    return name
}

function addTemp(){
    return (Math.random() * (CREATE_MAX_ACTUAL - CREATE_MIN_ACTUAL) + CREATE_MIN_ACTUAL)
}

function addMax(actualTemp){
    return (Math.random() * (MAX_TEMP - actualTemp) + actualTemp)
}

function addMin(actualTemp){
    return (Math.random() * (actualTemp - MIN_TEMP) + MIN_TEMP)
}

function updateTemp(model){
    return 0
}

function updateMax(model){
    return 0;
}

function updateMin(model){
    return 0;
}

function del(index){
    return 0;
}

function all(choice,model,city){
    const addedTemp = addTemp()
    if (choice === "Add city"){
        model.zones.push(city)
        model.temperatures.push(addedTemp)
        model.max.push(addMax(addedTemp))
        model.min.push(addMin(addedTemp))
    }
    return model
}

function index(city,model){
    return 0;
}

module.exports = {
    all
}