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
    let i = 0;
    let len = 0;
    for (city in zones){
        len++;
    }
    let table = []
    while (i < len){
        table.push(
            {"Name":zones[i],
            "Temperature":temperatures[i],
            "Max":max[i],
            "Min":min[i]}
        )
        i++;
    }
    return table
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