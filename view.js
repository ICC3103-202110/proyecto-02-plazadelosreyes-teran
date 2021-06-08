const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')

function getTitle(){
    return chalk.green(
        figlet.textSync(
            'Wheather App',
            {
                horizontalLayout: 'full',
                font: 'Nancyj-Underlined'
            }
        )
    )
}

function menu(){
    const message = "Select action"
    choices = ['Add city','Update city','Delete city']
    return inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: message,
            default: "Add city",
            choices: choices
        }
    ])
}

function addCity(){
    const message = 'Location?'
    return inquirer.prompt([
        {
            name: 'city',
            type: 'input',
            default: 'none',
            message: message,
        }
    ])
}

function chooseCity(model){
    const choices = model.zones
    const message = "Select location"
    return inquirer.prompt({
        name: 'choose',
        type: 'list',
        message: message,
        default: choices[0],
        choices: choices
    })
}

function getTable(model){
    const {zones,temperatures,max,min} = model
    return [
        {"Name": zones,
        "Temp": temperatures,
        "Max": max,
        "Min": min}
    ]
}

function view(model){
    return {
        title: getTitle(),
        table: getTable(model)
    }
}

module.exports = {
    view, 
    chooseCity,
    addCity,
    menu,
}