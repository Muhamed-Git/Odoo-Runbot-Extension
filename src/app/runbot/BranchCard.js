import React from 'react'
import appData from '../data/AppData.js'
import _ from 'underscore'
import { retriveLogElement,fetchData } from './RunbotScrapper.js'
import { AppNotification , ChromeNotification } from '../Notification.js'
import { connect } from 'react-redux'
import { branchUpdate , branchDelete } from '../actions'
import model from '../model/DBA.js'
import classnames from 'classnames'
import moment from 'moment'

class BranchCard extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        cardData: this.props.data,
        current: _.filter(this.props.data.branches,function(b){return b.order===1})[0],
        isRefresh: false,
        autoRefresh: this.props.data.autoRefresh,
        dropDownId: _.uniqueId('branchCardOption'),
      };

      this.refreshBranchClick = this.refreshBranchClick.bind(this);
      this.setTimeInterval = this.setTimeInterval.bind(this);
      this.deleteBranchClick = this.deleteBranchClick.bind(this);
      this.autoRefreshBranchClick = this.autoRefreshBranchClick.bind(this);
      this.setTimeInterval()
  }

  componentWillReceiveProps(nextProps) {
    var updatedData = nextProps.store.Branches.filter((s) => s.key === this.state.cardData.key)[0];
    var currentData = _.filter(updatedData.branches,function(b){return b.order===1})[0];
    this.setState({
      cardData : updatedData,
      current: currentData,
      isRefresh: false
    })
    if(this.state.autoRefresh) {
      ChromeNotification({
        tital: currentData.statusString,
        message: updatedData.branchName + " (" + appData.branchInfo[updatedData.branchType].string + ")" + "\n" + "Error : " + currentData.logs.error + "  Warning : " + currentData.logs.warning
      });
    }
  }

  setTimeInterval() {
    var self = this;
    if (this.interval) {
      clearInterval(this.interval);
    }
    if(this.state.cardData.autoRefresh) {
      this.interval = setInterval(function(){
        self.refreshBranchClick();
      },this.state.cardData.refreshInterval)
    }
  }

  componentDidMount() {
    window.$('#logModel').modal();
  }

  logDetailsClick(event) {
    var link = event.currentTarget.dataset.link;
    var type = event.currentTarget.dataset.type;
    retriveLogElement(link,type,(tr) => {
      window.$('#logTable').empty();
      window.$('#logTable').attr('class',type);
      window.$('#logTable').append(tr);
      window.$('#logModel').modal('open');
    })
  }

  refreshBranchClick() {
      this.setState({isRefresh: true});
      var self = this;
      fetchData(appData.branchInfo[this.state.cardData.branchType],this.state.cardData.branchName,(data)=>{
          model.update(data,(d)=>{
            self.props.branchUpdate(data);
          });
      },(error) => {
        AppNotification(error);
        self.setState({isRefresh: false});
      });
  }

  autoRefreshBranchClick() {
    // UPDATE AUTO REFRESH VARIABLE
    var autoRefresh = !this.state.autoRefresh;
    this.setState({autoRefresh});
    this.state.cardData.autoRefresh = autoRefresh;
    this.state.cardData.refreshInterval = 300000;
    this.setTimeInterval();
  }

  deleteBranchClick() {
      var self = this;
      model.delete(this.state.cardData,(d)=>{
        AppNotification(this.state.cardData.branchName + " is deleted")
        self.props.branchDelete(this.state.cardData);
      });
  }

 render() {
      return (
        <div className="col s3">
          <div id="logModel" className="modal modal-fixed-footer">
            <div className="modal-content">
              <table id="logTable"></table>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
            </div>
          </div>
          <div className={"card batchCard " + appData.status[this.state.current.status].class}>
            <div className="card-content">
              <div className="statusBar">
                <span className={"left status " + appData.status[this.state.current.status].class }>{this.state.current.statusString}</span>
                <span className="right branchType">{appData.branchInfo[this.state.cardData.branchType].string}</span>
              </div>
              <div className="branchNameDiv">
                <span className="branchName tooltipped" data-position="bottom" data-delay="50" data-tooltip={this.state.cardData.branchName}>{this.state.cardData.branchName}</span>
              </div>
              <div className="logDetails">
                <div className="errorLog center-align" onClick={this.logDetailsClick} data-type="danger" data-link={this.state.current.logURL}>
                  <i className="fa fa-times"></i> {this.state.current.logs.error}
                </div>
                <div className="warningLog center-align"  onClick={this.logDetailsClick} data-type="warning" data-link={this.state.current.logURL}>
                  <i className="fa fa-exclamation-triangle"></i> {this.state.current.logs.warning}
                </div>
              </div>
              <div className="message right-align">
                <span className={"left " + classnames({'show':this.state.isRefresh,'hide':!this.state.isRefresh})}><i className={"fa fa-refresh fa-fw " + classnames({'fa-spin':this.state.isRefresh})}></i> Refreshing</span>
                <span>Last Update: {moment(this.state.cardData.lastUpdate).fromNow()}</span>
              </div>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-teal center-align" href={this.state.current.runbotLink}><i className="fa fa-sign-in"></i></a>
              <a className="waves-effect waves-teal center-align" href={this.state.current.logURL}><i className="fa fa-file-text-o"></i></a>
              <a className="waves-effect waves-teal center-align" href={this.state.current.commitURL}><i className="fa fa-github"></i></a>
              <a className="waves-effect waves-teal center-align" href={this.state.cardData.gitCompareURL}><i className="fa fa-code"></i></a>
              <a className="waves-effect waves-teal center-align activator"><i className="fa fa-bars"></i></a>
              <a className="waves-effect waves-teal center-align dropdown-button" data-activates={this.state.dropDownId}><i className="fa fa-ellipsis-v"></i></a>

              <ul id={this.state.dropDownId} className='branchCardOption dropdown-content'>
                <li><a onClick={this.refreshBranchClick}><span><i className="fa fa-refresh"></i> Refresh</span></a></li>
                <li><a onClick={this.deleteBranchClick}><span><i className="fa fa-trash-o"></i>Delete</span></a></li>
                <li><a href={this.state.cardData.branchUrl}><span><i className="fa fa-link"></i>Runbot Link</span></a></li>
                <li className="divider"></li>
                <li className="autoRefreshElement">
                  <span className="center-align">Auto Refresh</span>
                  <div className="switch center-align">
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
                  <div className="center-align">
                    <input type="number" id="autoRefreshTime" value="15" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-reveal">
              <span className="card-title">Branches<i className="fa fa-times right"></i></span>
              <div className="otherBranch">
              {
                this.state.cardData.branches.map((branch,key) => {
                  if(key === 0) return;
                  return(
                    <div key={key} className={"branch " + appData.status[branch.status].class}>
                      <span className={appData.status[branch.status].class}>{branch.statusString}</span>
                      <div className="actionButtons right">
                        <a onClick={this.logDetailsClick} data-type="danger" data-link={branch.logURL} className="danger"><i className="fa fa-times"></i> {branch.logs.error}</a>
                        <a onClick={this.logDetailsClick} data-type="warning" data-link={branch.logURL} className="warning"><i className="fa fa-exclamation-triangle"></i> {branch.logs.warning}</a>
                        <a href={branch.runbotLink} className="action"><i className="fa fa-sign-in"></i></a>
                        <a href={branch.commitURL} className="action"><i className="fa fa-github"></i></a>
                        <a href={branch.logURL} className="action"><i className="fa fa-file-text-o"></i></a>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      )
   }
}

function mapStateToProps(store) {
    return {store}
}

export default connect(mapStateToProps,{branchUpdate,branchDelete})(BranchCard)
