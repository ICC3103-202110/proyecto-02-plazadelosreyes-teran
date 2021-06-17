const {menu, addCity,chooseCity,useApi} = require('./view')
const {all} = require('./update')
const {printTable} = require('console-table-printer')

async function app(state,view){
    const {input} = await useApi()
    if (input=== "Yes"){
        return 0;
    }
    else{
        console.log("")   
    }
    while (true){
        const {model, currentView} = state
        const {title, table} = currentView
        console.clear()
        console.log(title)
        printTable(table)
        const {action} = await menu()
        if (action === "Add city"){
            const {city} = await addCity(model)
            state = {
                model: all(action,state.model,city,input),
                currentView: view(model)
            }
        }
        if (action === "Delete city"){
            const {choose} = await chooseCity(model)
            state = {
                model: all(action,state.model,choose,input),
                currentView: view(model)
            }
        }
        if (action === "Update city"){
            const {choose} = await chooseCity(model)
            state = {
                model: all(action,state.model,choose,input),
                currentView: view(model)
            }
        }
    }
}

module.exports = {
    app
}