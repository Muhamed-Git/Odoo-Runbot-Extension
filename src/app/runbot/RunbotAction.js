import React from 'react';
import { connect } from 'react-redux'
import { addBranch } from '../actions'
import appData from '../data/AppData.js'
import _ from 'underscore'
import { fetchData } from './RunbotScrapper.js'
import model from '../model/DBA.js'
import { AppNotification } from '../Notification.js'

class RunbotAction extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        runbotLink: '',
        loading: false
      }
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
     this.setState({loading: true});
     var self = this;
     fetchData(appData.branchInfo.entdev,'master-website-form-builder-chv',(data)=>{
       model.set(data,(d)=>{
         self.props.addBranch(d);
         window.$('#addBranchModel').modal('close');
       });
       self.setState({loading: false});
     },(error) => {
       AppNotification(error);
       self.setState({loading: false});
     });
   }

   selectBranchOnChange(val) {
     this.setState({
       runbotLink: appData.branchInfo[val].url
     })
   }

   render() {
     function isLoading(state) {
        if(state.loading) {
          return (<span className="loading modal-action"><i className="fa fa-spinner fa-spin fa-fw"></i> Loading</span>)
        }
     }
      return (
         <div>
             <div id="addBranchModel" className="modal modal-fixed-footer">
               <div className="modal-content">
                 <h4><i className="fa fa-github" aria-hidden="true"></i> Add Branch</h4>
                 <div className="row">
                   <div className="input-field col s12">
                     <select id="selectedBranch">
                       {/*<option value="" disabled selected>Choose your option</option>*/}
                       {
                         _.keys(appData.branchInfo).map((branch,index)=>{
                            return(<option value={branch} key={index}>{appData.branchInfo[branch].string}</option>)
                         })
                       }
                     </select>
                     <label>Select Branch</label>
                   </div>
                   <div className="input-field col s12">
                     <input placeholder="Runbot URL" id="runbotUrl" type="text" className="validate" value={this.state.runbotLink}/>
                     <label>URL</label>
                   </div>
                   <div className="input-field col s12">
                     <input placeholder="Branch Name" id="branchname" type="text" className="validate"/>
                     <label>Name</label>
                   </div>
                 </div>
               </div>
               <div className="modal-footer">
               {
                  isLoading(this.state)
               }
                 <a href="#!" onClick={()=> this.onAddClick()} className="modal-action addBranchBtn waves-effect waves-green btn-flat">Add</a>
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

module.exports = {
  actionRunbotChild,
  RunbotAction: connect(null,{addBranch})(RunbotAction)
}
