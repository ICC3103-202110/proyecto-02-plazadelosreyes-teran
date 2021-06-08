const {initModel} = require('./model')
const {view} = require('./view')
const {app} = require('./app')

const state = {
    model: initModel,
    currentView: view(initModel)
}

app(state, view)
