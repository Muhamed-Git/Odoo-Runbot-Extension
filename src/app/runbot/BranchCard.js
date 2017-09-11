import React from 'react'
import appData from '../data/AppData.js'
import _ from 'underscore'
import { retriveLogElement,fetchData } from './RunbotScrapper.js'
import { AppNotification } from '../Notification.js'
import { connect } from 'react-redux'
import { branchUpdate } from '../actions'
import model from '../model/DBA.js'

class BranchCard extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        cardData: this.props.data,
        current: _.filter(this.props.data.branches,function(b){return b.order===1})[0],
        isRefresh: false
      };

      this.refreshBranchClick = this.refreshBranchClick.bind(this);
      this.setTimeInterval = this.setTimeInterval.bind(this);
      this.setTimeInterval()
  }

  componentWillReceiveProps(nextProps) {
    var updatedData = nextProps.store.Branches.filter((s) => s.key === this.state.cardData.key)[0];
    this.setState({
      cardData : updatedData,
      current: _.filter(updatedData.branches,function(b){return b.order===1})[0],
      isRefresh: false
    })
  }

  setTimeInterval() {
    var self = this;
    if (interval) {
      clearInterval(interval);
    }
    if(this.state.cardData.autoRefresh) {
      var interval = setInterval(function(){
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
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <div className={"statusBar " + appData.status[this.state.current.status].class}></div>
              <div className="state">
                  <div className={"statusTag " + appData.status[this.state.current.status].class}>{this.state.current.statusString}</div>
                  <div className="errorStatus">
                      <div className="error logDetails" onClick={this.logDetailsClick} data-type="danger" data-link={this.state.current.logURL}>
                        <div className="tital"><i className="fa fa-times"></i>Errors</div>
                        <div className="numbers">{this.state.current.logs.error}</div>
                      </div>
                      <div className="warning logDetails" onClick={this.logDetailsClick} data-type="warning" data-link={this.state.current.logURL}>
                        <div className="tital"><i className="fa fa-exclamation-triangle"></i>Warnings</div>
                        <div className="numbers">{this.state.current.logs.warning}</div>
                      </div>
                  </div>
              </div>
              <div className="branchButtons">
                <a className="waves-effect waves-teal btn-flat" href={this.state.current.runbotLink}><i className="fa fa-sign-in"></i></a>
                <a className="waves-effect waves-teal btn-flat" href={this.state.current.logURL}><i className="fa fa-file-text-o"></i></a>
                <a className="waves-effect waves-teal btn-flat" href={this.state.current.commitURL}><i className="fa fa-github"></i></a>
                <a className="waves-effect waves-teal btn-flat" href={this.state.cardData.gitCompareURL}><i className="fa fa-code"></i></a>
              </div>
              <div className="branchType">
                {appData.branchInfo[this.state.cardData.branchType].string}
              </div>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                <span className="branchName">{this.state.cardData.branchName}</span>
                <i className="fa fa-ellipsis-v right"></i>
              </span>
              <div>
                <a href={this.state.cardData.branchUrl}>runbot link</a>
                <div className="refreshBranch right" onClick={this.refreshBranchClick} data-key={this.state.cardData.key}>
                  {
                    this.state.isRefresh ? <i className="fa fa-refresh fa-spin fa-fw"></i> : <i className="fa fa-refresh fa-fw"></i>
                  }
                </div>
              </div>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4"><span className="branchName">Branches</span><i className="fa fa-times right close"></i></span>
              <div>
                {
                  this.state.cardData.branches.map((branch,key) => {
                    if(key === 0) return;
                    return(
                      <div className="otherBranch" key={key}>
                        <div className={"sideBorder "+ appData.status[branch.status].class}></div>
                        <div className="card">
                          <div className="card-content">
                              <span className={appData.status[branch.status].class}>{branch.statusString}</span>
                              <div className="actionButton">
                                <a href={branch.commitURL}><i className="fa fa-github"></i></a>
                                <a href={branch.logURL}><i className="fa fa-file-text-o"></i></a>
                              </div>
                          </div>
                          <div className="card-action">
                            <span className="danger logDetails" onClick={this.logDetailsClick} data-type="danger" data-link={branch.logURL}><i className="fa fa-times"></i>{branch.logs.error}</span>
                            <span className="warning logDetails" onClick={this.logDetailsClick} data-type="warning" data-link={branch.logURL}><i className="fa fa-exclamation-triangle"></i>{branch.logs.warning}</span>
                          </div>
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

export default connect(mapStateToProps,{branchUpdate})(BranchCard)
