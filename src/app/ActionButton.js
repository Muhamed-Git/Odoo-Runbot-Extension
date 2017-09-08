import React from 'react';
import { RunbotAction , actionRunbotChild } from './runbot/RunbotAction.js'

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
               </ul>
             </div>
             <RunbotAction />
         </div>
      );
   }
}

export default Add;
