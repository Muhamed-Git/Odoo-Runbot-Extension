import constants from '../Constants.js'

export const addBranch = (data) => {
    const action = {
      type: constants.ADD_BRANCH,
      data
    }
    return action;
}

export const initState = (data) => {
    const action = {
      type: constants.INIT_BRANCH_STATE,
      data
    }
    return action;
}
