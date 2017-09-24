import constants from '../Constants.js'

export const addBranch = (data) => {
    const action = {
      type: constants.ADD_BRANCH,
      data
    }
    return action;
}

export const branchUpdate = (data) => {
    const action = {
      type: constants.UPDATE_BRANCH,
      data
    }
    return action;
}

export const branchDelete = (data) => {
    const action = {
      type: constants.DELETE_BRANCH,
      data
    }
    return action;
}

export const initBranchState = (data) => {
    const action = {
      type: constants.INIT_BRANCH_STATE,
      data
    }
    return action;
}

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
