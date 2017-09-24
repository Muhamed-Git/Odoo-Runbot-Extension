import React from 'react'
import Home from './Home.js'
import ActionButton from './ActionButton.js'
import Runbot from './runbot/Runbot.js'
import { connect } from 'react-redux'
import { initBranchState , initSettingsState } from './actions'
import demoData from './data/DemoData.js'
import model from './model/DBA.js'
import _ from 'underscore'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.initState = this.initState.bind(this);
  }

  componentDidMount() {
      model.getAll(this.initState);
      window.$('.scrollspy').scrollSpy();
  }

  initState(data) {
    var settings = data.settings;
    this.props.initSettingsState(settings);
    delete data.settings;
    this.props.initBranchState(_.values(data));
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
               <a href="#tabs">
                 <i className="fa fa-star" aria-hidden="true"></i>
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

             <div id="tabs" className="section scrollspy">
               <p>Content </p>
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
