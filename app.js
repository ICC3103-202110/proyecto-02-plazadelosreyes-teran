const {menu, addCity,chooseCity} = require('./view')
const {printTable} = require('console-table-printer')

async function app(state){
    while (true){
        const {model, currentView} = state
        const {title, table} = currentView
        console.clear()
        console.log(title)
        printTable(table)
        const {action} = await menu()
        if (action === "Add city"){
            const {city} = await addCity(model)
        }
        if (action === "Delete city"){
            const {choose} = await chooseCity(model)
        }
        if (action === "Update city"){
            const {choose} = await chooseCity(model)
        }
    }
}

module.exports = {
    app
}