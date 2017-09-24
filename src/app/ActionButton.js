import React from 'react';
import { RunbotAction , actionRunbotChild } from './runbot/RunbotAction.js'
import { SettingAction , actionSettingChild } from './Setting.js'


class Add extends React.Component {
   render() {
      return (
         <div>
             <div className="fixed-action-btn horizontal actionbutton">
               <a className="btn-floating btn-large parent">
                 <i className="fa fa-bars"></i>
               </a>
               <ul className="child">
                  {actionRunbotChild()}
                  {actionSettingChild()}
               </ul>
             </div>
             <RunbotAction />
             <SettingAction />
         </div>
      );
   }
}

export default Add;
