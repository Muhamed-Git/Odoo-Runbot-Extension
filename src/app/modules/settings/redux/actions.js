// Redux
import constants from '../../base/redux/constants.js'

export const initSettingsState = (data) => {
    const action = {
      type: constants.INIT_SETTINGS_STATE,
      data
    }
    return action;
}

export const updateSettings = (data) => {
    const action = {
      type: constants.UPDATE_SETTINGS,
      data
    }
    return action;
}
