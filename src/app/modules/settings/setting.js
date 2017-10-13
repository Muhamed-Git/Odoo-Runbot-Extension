// Library
import React from 'react';
import _ from 'underscore'
import classnames from 'classnames'
import DragSortableList from 'react-drag-sortable'

// Redux
import { connect } from 'react-redux'
import { updateSettings } from './redux/actions.js'

// Base
import Model from './model.js'
import { AppNotification } from '../base/services/notification.js'

// Less
require('./less/setting.less');

class SettingAction extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        userName: '',
        clockType: false,
        dragAppList: [
            {content: (<span><i className="fa fa-bars"></i>History</span>), classes:['listItem'], data:"history"},
            {content: (<span><i className="fa fa-bars"></i>Runbot</span>), classes:['listItem'], data:"runbot"},
        ]
      }
      this.onChangeUserName = this.onChangeUserName.bind(this);
      this.onClockTypeClick = this.onClockTypeClick.bind(this);
      this.onChangeHistoryDateSelect = this.onChangeHistoryDateSelect.bind(this);
      this.onAppListSort = this.onAppListSort.bind(this);
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
     let dal = this.state.dragAppList;
     let dragAppList = nextProps.store.Setting.sortedAppList.map( (l) =>
          dal.filter( (c) => c.data === l )[0]
     );
     this.setState({
       userName: nextProps.store.Setting.userName || '',
       clockType: nextProps.store.Setting.clockType || false,
       defaultHistoryDate: nextProps.store.Setting.defaultHistoryDate || 1,
       sortedAppList: nextProps.store.Setting.sortedAppList || [],
       dragAppList: dragAppList || []
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
       defaultHistoryDate : this.state.defaultHistoryDate,
       sortedAppList: this.state.sortedAppList
     };
     this.model.set(data,this.props.store,(d) => {
       this.props.updateSettings(data);
     });
     AppNotification("Settings Saved")
     window.$('#settingModel').modal('close');
   }

   onChangeHistoryDateSelect(event) {
     this.setState({
       defaultHistoryDate: event.target.value,
     })
   }

   onAppListSort (sortedList) {
     let newList = sortedList.map( (l) => l.data );
     this.setState({
       sortedAppList: newList,
       dragAppList: sortedList,
     })
   }

   render() {

      return (
         <div>
             <div id="settingModel" className="modal modal-fixed-footer">
               <div className="modal-content">
                 <h4><i className="fa fa-cog" aria-hidden="true"></i> Settings</h4>
                 <div className="row settingContainer">
                    <div className="col s12">
                      <ul className="tabs">
                        <li className="tab col s3"><a href="#test1">General</a></li>
                        <li className="tab col s3"><a href="#test2">History</a></li>
                      </ul>
                    </div>
                    <div id="test1" className="col s12 tabData">
                      <ul className="collection">
                        <li className="collection-item">
                          <div className="input-field">
                            <input placeholder="Ex. Deep" id="userNameInput" type="text" onChange={this.onChangeUserName} value={this.state.userName} className="validate"/>
                            <label htmlFor="userNameInput">User Name</label>
                          </div>
                        </li>
                        <li className="collection-item">
                          <p>
                            <input type="checkbox" id="clockSelect" checked={classnames({'checked':this.state.clockType})} value={this.state.clockType}/>
                            <label htmlFor="clockSelect" onClick={this.onClockTypeClick}>24 H Clock</label>
                          </p>
                        </li>
                        <li className="collection-item">
                            <DragSortableList items={this.state.dragAppList} moveTransitionDuration={0.3} onSort={this.onAppListSort} type="vertical"/>
                        </li>
                      </ul>
                    </div>
                    <div id="test2" className="col s12 tabData">
                      <ul className="collection">
                        <li className="collection-item">
                          <label>Default History Time</label>
                          <select className="browser-default" value={this.state.defaultHistoryDate} onChange={this.onChangeHistoryDateSelect}>
                            <option value="1">Yesterday</option>
                            <option value="7">Last Week</option>
                            <option value="14">Last 2 Weeks</option>
                            <option value="30">Last Month</option>
                            <option value="60">Last 2 Months</option>
                            <option value="90">Last 3 Months</option>
                            <option value="365">Last Year</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
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
