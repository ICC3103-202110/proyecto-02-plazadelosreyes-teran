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
        const {city} = await addCity(model)
        const {choose} = await chooseCity(model)
        console.log(action,city,choose)
    }
}

module.exports = {
    app
}