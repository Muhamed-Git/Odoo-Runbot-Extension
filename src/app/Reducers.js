import { combineReducers } from 'redux'
import Branches from './runbot/BranchesReducer.js'
import Setting from './Settings/SettingsReducer.js'

export default combineReducers({
  Branches,
  Setting,
})
