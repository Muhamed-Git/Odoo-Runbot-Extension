import React from 'react';

class Add extends React.Component {
   componentDidMount() {
     window.$('#addBranchModel').modal({
       dismissible: true,
       opacity: .5,
       inDuration: 300,
       outDuration: 200,
     });
     window.$('select').material_select();

     if(chrome.storage) {
       var temp = {};
       temp['abcd'] = "hello";
       chrome.storage.sync.set(temp, function() {

       });
       chrome.storage.sync.get(null, function(branches) {
         console.log("sasdsadsad" , branches);
       });
     }
   }
   render() {
      return (
         <div>
             <div className="fixed-action-btn horizontal actionbutton">
               <a className="btn-floating btn-large parent">
                 <i className="fa fa-bars"></i>
               </a>
               <ul className="child">
                 <li><a className="btn-floating waves-effect waves-light modal-trigger" href="#addBranchModel"><i className="fa fa-plus"></i></a></li>
               </ul>
             </div>

             <div id="addBranchModel" className="modal modal-fixed-footer">
               <div className="modal-content">
                 <h4><i className="fa fa-github" aria-hidden="true"></i> Add Branch</h4>
                 <div className="row">
                   <div className="input-field col s12">
                     <select id="selectedBranch">
                       {/*<option value="" disabled selected>Choose your option</option> */}
                       <option value="odoocommunity">Odoo Community</option>
                       <option value="odoodev">Odoo Dev</option>
                       <option value="odooenterprise">Odoo Enterprise</option>
                       <option value="entdev">Enterprise Dev</option>
                     </select>
                     <label>Select Branch</label>
                   </div>
                   <div className="input-field col s12">
                     <input placeholder="Runbot URL" id="runbotUrl" type="text" className="validate"/>
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
                 <a href="#!" className="modal-action addBranchBtn waves-effect waves-green btn-flat">Add</a>
                 <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
               </div>
             </div>
         </div>
      );
   }
}

export default Add;
