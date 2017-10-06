import React from 'react';
import { connect } from 'react-redux'
import _ from 'underscore'
import classnames from 'classnames'
import { updateSettings } from '../actions'
import Model from './Model.js'
import { AppNotification } from '../Notification.js'

class SettingAction extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        userName: '',
        clockType: false,
      }
      this.onChangeUserName = this.onChangeUserName.bind(this);
      this.onClockTypeClick = this.onClockTypeClick.bind(this);

      this.model = new Model('Setting');
  }

   componentDidMount() {
     window.$('#settingModel').modal({
       dismissible: true,
       opacity: .5,
       inDuration: 300,
       outDuration: 200,
     });
   }

   componentWillReceiveProps(nextProps) {
     this.setState({
       userName: nextProps.store.Setting.userName || '',
       clockType: nextProps.store.Setting.clockType || false,
     });
   }

   onChangeUserName(event) {
     this.setState({
       userName: event.target.value
     });
   }

   onClockTypeClick() {
     this.setState({
       clockType: !this.state.clockType,
     });
   }

   onSaveClick() {
     var data = {
       userName:this.state.userName,
       clockType: this.state.clockType,
     };
     this.model.set(data,this.props.store,(d) => {
       this.props.updateSettings(data);
     });
     AppNotification("Settings Saved")
     window.$('#settingModel').modal('close');
   }

   render() {
      return (
         <div>
             <div id="settingModel" className="modal modal-fixed-footer">
               <div className="modal-content">
                 <h4><i className="fa fa-cog" aria-hidden="true"></i> Settings</h4>
                 <div className="row">
                    <div className="input-field col s6">
                      <input placeholder="Ex. Deep" id="userNameInput" type="text" onChange={this.onChangeUserName} value={this.state.userName} className="validate"/>
                      <label htmlFor="userNameInput">User Name</label>
                    </div>
                 </div>
                 <p>
                   <input type="checkbox" id="clockSelect" checked={classnames({'checked':this.state.clockType})} value={this.state.clockType}/>
                   <label htmlFor="clockSelect" onClick={this.onClockTypeClick}>24 H Clock</label>
                 </p>
               </div>
               <div className="modal-footer">
                 <a href="#!" onClick={()=> this.onSaveClick()} className="modal-action waves-effect waves-green btn-flat">Save</a>
                 <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
               </div>
             </div>
         </div>
      );
   }
}

function actionSettingChild() {
  return(<li><a className="btn-floating waves-effect waves-light modal-trigger" href="#settingModel"><i className="fa fa-cog"></i></a></li>)
}

function mapStateToProps(store) {
    return {store}
}

module.exports = {
  actionSettingChild,
  SettingAction: connect(mapStateToProps,{updateSettings})(SettingAction)
}
