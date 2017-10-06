// Redux
import constants from '../../base/redux/constants.js'

const Branches = (state = [] , action) => {
  let rem = null;
  switch (action.type) {
    case constants.INIT_BRANCH_STATE:
      rem = action.data;
      break;
    case constants.UPDATE_BRANCH:
      rem = state.map((s) => { return s.key === action.data.key ? action.data : s })
      break;
    case constants.DELETE_BRANCH:
      rem = state.filter((s) => { return s.key !== action.data.key })
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
