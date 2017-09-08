import React from 'react'
import appData from '../data/AppData.js'
import _ from 'underscore'

class BranchCard extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        cardData: this.props.data,
        current: _.filter(this.props.data.branches,function(b){return b.order===1})[0]
      };
  }

 render() {
      return (
        <div className="col s3">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <div className={"statusBar " + appData.status[this.state.current.status].class}></div>
              <div className="state">
                  <div className={"statusTag " + appData.status[this.state.current.status].class}>{appData.status[this.state.current.status].string}</div>
                  <div className="errorStatus">
                      <div className="error logDetails" data-type="danger" data-link={this.state.current.logURL}>
                        <div className="tital"><i className="fa fa-times"></i>Errors</div>
                        <div className="numbers">{this.state.current.logs.error}</div>
                      </div>
                      <div className="warning logDetails" data-type="warning" data-link={this.state.current.logURL}>
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
                <div className="refreshBranch right" data-key={this.state.cardData.key}><i className="fa fa-refresh fa-fw"></i></div>
              </div>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4"><span className="branchName">Branches</span><i className="fa fa-times right close"></i></span>
              <div>
                {
                  this.state.cardData.branches.map((branch,key) => {
                    return(
                      <div className="otherBranch" key={key}>
                        <div className={"sideBorder "+ appData.status[branch.status].class}></div>
                        <div className="card">
                          <div className="card-content">
                              <span className={appData.status[branch.status].class}>{appData.status[branch.status].string}</span>
                              <div className="actionButton">
                                <a href={branch.commitURL}><i className="fa fa-github"></i></a>
                                <a href={branch.logURL}><i className="fa fa-file-text-o"></i></a>
                              </div>
                          </div>
                          <div className="card-action">
                            {/*<span className="danger logDetails" data-type="danger" data-link="{{this.log}}"><i className="fa fa-times"></i>{{this.logData.data_list.danger.count}}</span>
                            <span className="warning logDetails" data-type="warning" data-link="{{this.log}}"><i className="fa fa-exclamation-triangle"></i>{{this.logData.data_list.warning.count}}</span>*/}
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

export default BranchCard;
