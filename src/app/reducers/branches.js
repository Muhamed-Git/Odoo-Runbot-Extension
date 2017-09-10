import constants from '../Constants.js'

const Branches = (state = [] , action) => {
  let rem = null;
  switch (action.type) {
    case constants.INIT_BRANCH_STATE:
      rem = action.data;
      break;
    case constants.ADD_BRANCH:
      rem = [...state, action.data]
      break;
    default:
      return state;
  }
  return rem;
}
export default Branches;
