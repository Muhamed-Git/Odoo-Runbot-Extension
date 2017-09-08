import React from 'react';
import { connect } from 'react-redux'
import { addData } from '../actions'
import appData from '../data/AppData.js'
import _ from 'underscore'

class RunbotAction extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        runbotLink: ''
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
     this.props.addData('from adder');
   }

   selectBranchOnChange(val) {
     this.setState({
       runbotLink: appData.branchInfo[val].url
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
                 <span className="loading hide modal-action"><i className="fa fa-spinner fa-spin fa-fw"></i> Loading</span>
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
  RunbotAction: connect(null,{addData})(RunbotAction)
}
