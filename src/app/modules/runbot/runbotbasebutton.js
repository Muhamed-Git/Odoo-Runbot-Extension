// Library
import React from 'react';
import _ from 'underscore'
import classnames from 'classnames'

// Redux
import { connect } from 'react-redux'
import { addBranch } from './redux/actions.js'

// Base
import Model from '../base/model/model.js'
import { AppNotification } from '../base/services/notification.js'

// App Data
import appData from './data.js'

// Runbot Library
import { fetchData } from './runbotscrapper.js'

// Less
require("./less/runbotaction.less");

class RunbotAction extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        runbotLink: '',
        loading: false,
        branchName: '',
        branchType: '',
      }
      this.model = new Model('Branches');
      this.handleChange = this.handleChange.bind(this);
  }

   componentDidMount() {
     window.$('#addBranchModel').modal({
       dismissible: true,
       opacity: .5,
       inDuration: 300,
       outDuration: 200,
     });
     var self = this;
     window.$('select').material_select();
     window.$('#selectedBranch').on('change',function(){
         self.selectBranchOnChange(window.$('#selectedBranch').val());
     });
   }

   onAddClick() {
     if(!this.state.runbotLink.length && !this.state.branchName.length) {
       AppNotification('Fill All Data');
       return
     }
     this.setState({loading: true});
     var self = this;
     fetchData(appData.branchInfo[this.state.branchType],this.state.branchName,(data)=>{
       data = _.extend(data,{
         autoRefresh: false,
         refreshInterval: appData.defaultRefreshInterval
       });
       self.model.set(data,self.props.store,(d)=>{
         self.props.addBranch(d);
         window.$('#addBranchModel').modal('close');
       });
       self.setState({loading: false});
     },(error) => {
       AppNotification(error);
       self.setState({loading: false});
     });
   }

   handleChange(event) {
      var key = event.target.dataset.key;
      var temp = {};
      temp[key] = event.target.value;
      this.setState(temp);
   }

   selectBranchOnChange(val) {
     this.setState({
       runbotLink: appData.branchInfo[val].url,
       branchType: val
     })
   }

   render() {
      return (
         <div>
             <div id="addBranchModel" className="modal modal-fixed-footer">
               <div className="modal-content">
                 <h4><i className="fa fa-github" aria-hidden="true"></i> Add Branch</h4>
                 <div className="row">
                   <div className="input-field col s12">
                     <select id="selectedBranch">
                       <option value="" disabled>Choose your option</option>
                       {
                         _.keys(appData.branchInfo).map((branch,index)=>{
                            return(<option value={branch} key={index}>{appData.branchInfo[branch].string}</option>)
                         })
                       }
                     </select>
                     <label>Select Branch</label>
                   </div>
                   <div className="input-field col s12">
                     <input placeholder="Runbot URL" data-key="runbotLink" type="text" className="validate" value={this.state.runbotLink} onChange={this.handleChange} />
                     <label>URL</label>
                   </div>
                   <div className="input-field col s12">
                     <input placeholder="Branch Name" data-key="branchName" value={this.state.branchname} onChange={this.handleChange} type="text" className="validate"/>
                     <label>Name</label>
                   </div>
                 </div>
               </div>
               <div className="modal-footer">
                 <span className={"loading modal-action "+ classnames({'hide':!this.state.loading})}><i className="fa fa-spinner fa-spin fa-fw"></i> Loading</span>
                 <a href="#!" onClick={()=> this.onAddClick()} className={"modal-action addBranchBtn waves-effect waves-green btn-flat " + classnames({'disabled' : this.state.loading})}>Add</a>
                 <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
               </div>
             </div>
         </div>
      );
   }
}

function actionRunbotChild() {
  return(<li><a className="btn-floating waves-effect waves-light modal-trigger" href="#addBranchModel"><i className="fa fa-plus"></i></a></li>)
}

function mapStateToProps(store) {
    return {store}
}

module.exports = {
  actionRunbotChild,
  RunbotAction: connect(mapStateToProps,{addBranch})(RunbotAction)
}
