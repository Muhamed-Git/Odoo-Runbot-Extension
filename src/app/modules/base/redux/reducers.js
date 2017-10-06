// Redux
import { combineReducers } from 'redux'
import Branches from '../../runbot/redux/branchesreducer.js'
import Setting from '../../settings/redux/settingsreducer.js'

export default combineReducers({
  Branches,
  Setting,
})
