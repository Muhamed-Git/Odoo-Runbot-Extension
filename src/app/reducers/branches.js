import constants from '../Constants.js'

const filterdata = (action) => {
  return {
    data: action.data,
    id: action.branchName+":"+action.branchType,
  }
}

const Branches = (state = [] , action) => {
  let rem = null;
  switch (action.type) {
    case constants.INIT_BRANCH_STATE:
      rem = action.data;
      break;
    case constants.ADD_BRANCH:
      rem = [...state, filterdata(action)]
      break;
    default:
      return state;
  }
  return rem;
}
export default Branches;
