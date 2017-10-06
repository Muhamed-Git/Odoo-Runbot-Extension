import constants from '../Constants.js'

const Setting = (state = [] , action) => {
  let rem = null;
  switch (action.type) {
    case constants.INIT_SETTINGS_STATE:
      rem = action.data || {};
      break;
    case constants.UPDATE_SETTINGS:
      rem = action.data;
      break;
    default:
      return state;
  }
  return rem;
}
export default Setting;
