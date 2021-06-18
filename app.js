const {menu, addCity,chooseCity,useApi} = require('./view')
const {all} = require('./update')
const {printTable} = require('console-table-printer')

async function app(state,view){
    const {input} = await useApi()
    let count = 0
    while (true){
        const {model, currentView} = state
        const {title, table} = currentView
        console.clear()
        console.log(title)
        printTable(table)
        const {action} = await menu()
        if (action === "Add city"){
            const {city} = await addCity(model)
            const check = await all(action,state.model,city,input)
            if (check===false){
                continue
            }
            state = {
                model: check,
                currentView: view(model)
            }
            count++
        }
        if (action === "Delete city"){
            if (count === 0){
                continue
            }
            const {choose} = await chooseCity(model)
            state = {
                model: await all(action,state.model,choose,input),
                currentView: view(model)
            }
            count--
        }
        if (action === "Update city"){
            if (count === 0){
                continue
            }
            const {choose} = await chooseCity(model)
            state = {
                model: await all(action,state.model,choose,input),
                currentView: view(model)
            }
        }
    }
}

module.exports = {
    app
}