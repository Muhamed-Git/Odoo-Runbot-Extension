// Library
import React from 'react'
import _ from 'underscore'
import classnames from 'classnames'

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

      this.state = {
        orderAppList: {
          runbot: 3,
          history: 2,
          home:1
        },
        disabledApp: {
          runbot: false,
          history: false,
          home: false,
        }
      }
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

  componentWillReceiveProps(nextProps) {
    let settings = nextProps.store.Setting;
    let sortedAppList = settings.sortedAppList;
    let disabledApp = settings.disabledApp || this.state.disabledApp;
    sortedAppList.map( (al,index) => {
      this.state.orderAppList[al] = index+1
    });
    this.setState({
      orderAppList: this.state.orderAppList,
      disabledApp: disabledApp,
    })
  }

  render() {

      return (
         <div>
           <ul className="side-nav fixed center-align section">
             <li style={{'order' : this.state.orderAppList.home}}>
               <a href="#home">
                 <i className="fa fa-home" aria-hidden="true"></i>
               </a>
             </li>
             <li style={{'order' : this.state.orderAppList.history}} className={classnames({'hide':this.state.disabledApp.history})}>
               <a href="#history">
                 <i className="fa fa-history" aria-hidden="true"></i>
               </a>
             </li>
             <li style={{'order' : this.state.orderAppList.runbot}} className={classnames({'hide':this.state.disabledApp.runbot})}>
               <a href="#runbot">
                 <i className="fa fa-circle-o odoo" aria-hidden="true"></i>
               </a>
             </li>
           </ul>

           <div className="appContainer">
             <div id="home" className="section scrollspy" style={{'order' : this.state.orderAppList.home}}>
               <Home />
             </div>

             <div id="history" className={"section scrollspy " + classnames({'hide':this.state.disabledApp.history})} style={{'order' : this.state.orderAppList.history}}>
               <History />
             </div>

             <div id="runbot"  className={"section scrollspy " + classnames({'hide':this.state.disabledApp.runbot})} style={{'order' : this.state.orderAppList.runbot}}>
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
