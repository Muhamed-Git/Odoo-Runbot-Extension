// Redux
import constants from '../../base/redux/constants.js'

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
