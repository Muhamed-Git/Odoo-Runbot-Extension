// Library
import React from 'react'
import _ from 'underscore'

// Redux
import { connect } from 'react-redux'
import { initBranchState } from './modules/runbot/redux/actions.js'
import { initSettingsState } from './modules/settings/redux/actions.js'

// Components (Base)
import ActionButton from './modules/basebutton/basebutton.js'
import Model from './modules/base/model/model.js'

// Demo Data
import demoData from './static/demodata/DemoData.js'

// Components
import Home from './modules/home/home.js'
import History from './modules/history/history.js'
import Runbot from './modules/runbot/runbot.js'

// LESS
require("./static/less/app.less");

class App extends React.Component {
  constructor(props) {
      super(props);
      this.initState = this.initState.bind(this);
      this.model = new Model("null");
  }

  componentDidMount() {
      this.model.getAll(this.initState);
      window.$('.scrollspy').scrollSpy({
        scrollOffset: 30
      });
  }

  initState(data) {
    this.props.initSettingsState(data.Setting);
    this.props.initBranchState(_.values(data.Branches));
  }

  render() {
      return (
         <div>
           <ul className="side-nav fixed center-align section">
             <li>
               <a href="#home">
                 <i className="fa fa-home" aria-hidden="true"></i>
               </a>
             </li>
             <li>
               <a href="#history">
                 <i className="fa fa-history" aria-hidden="true"></i>
               </a>
             </li>
             <li>
               <a href="#runbot">
                 <i className="fa fa-circle-o odoo" aria-hidden="true"></i>
               </a>
             </li>
           </ul>

           <div className="appContainer">
             <div id="home" className="section scrollspy">
               <Home />
             </div>

             <div id="history" className="section scrollspy">
               <History />
             </div>

             <div id="runbot" className="section scrollspy">
                 <Runbot />
             </div>
           </div>
          <ActionButton />
         </div>
      );
   }
}

function mapStateToProps(store) {
    return {store}
}

export default connect(mapStateToProps,{ initBranchState , initSettingsState })(App);
