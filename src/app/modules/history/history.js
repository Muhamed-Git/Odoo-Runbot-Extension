// Library
import React from 'react'
import classnames from 'classnames'
import _ from 'underscore'

// Base
import ChromeAPI from '../base/chrome/chrome.js'

// Redux
import { connect } from 'react-redux'

// App Data
import appData from './data.js'

// Components
import Search from '../search/search.js'

// Less
require("./less/history.less");

class History extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        historyGroups: [],
        groupsView: true,
        historyListViewData: [],
        defaultHistoryDate: 1,
      }
      this.onHistoryGroupClick = this.onHistoryGroupClick.bind(this);
      this.onBackClick = this.onBackClick.bind(this);
      this.selectDateOnChange = this.selectDateOnChange.bind(this);
      this.changeHistoryDate = this.changeHistoryDate.bind(this);
  }

  onHistoryGroupClick(event) {
    let key = event.currentTarget.dataset.key;
    this.setState({
      groupsView: false,
      historyListViewData: {key,data:this.state.historyGroups[key]}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    window.$('.tooltipped').tooltip();
  }

  onBackClick() {
    this.setState({
      historyListViewData: {},
      groupsView: true,
    });
  }

  componentWillReceiveProps(nextProps) {
      let defaultHistoryDate =  nextProps.store.Setting.defaultHistoryDate;
      if(defaultHistoryDate) {
        this.changeHistoryDate(defaultHistoryDate);
        this.setState({
          defaultHistoryDate
        })
      }
  }

  componentDidMount() {
    var self = this;
    var options = {
      text: "",
      startTime: appData.getMilisecound(1),
      maxResults: 2000
    };
    new ChromeAPI().getHistoryGroups(options).then((historyGroups) => {
      self.setState({
        historyGroups: historyGroups
      });
    });
  }

  selectDateOnChange(event) {
    let days = event.target.value;
    this.changeHistoryDate(days);
  }

  changeHistoryDate (days) {
    let ms = appData.getMilisecound(days);
    let options = {
      text: "",
      startTime: ms,
      maxResults: 2000
    };
    var self = this;
    new ChromeAPI().getHistoryGroups(options).then((historyGroups) => {
      self.setState({
        historyGroups: historyGroups,
        defaultHistoryDate: days,
      });
    });
  }

   render() {

      function HistoryGroups (props) {
          if (props.groups.length === 0 ) {
            return (<div>Not Found</div>)
          }

          var historyGroups =  Object.keys(props.groups).map((key,index) => {
              let websiteUrl = props.groups[key].filter((g) => {
                return g.url === 'https://www.'+ key;
              });
              websiteUrl = websiteUrl.length > 0 ? websiteUrl[0].url :  props.groups[key][0].url;
              return(<div className="col s2" key={index}>
                <div className="card historyCard hoverable">
                  <div className="card-content" data-key={key} onClick={props.onHistoryGroupClick}>
                    <img className="website-icon" src={'chrome://favicon/size/16@2x/'+websiteUrl}></img>
                    <span className="website-name" title={key}>{key}</span>
                  </div>
                  <div className="card-action">
                    <a href={"http://www."+key}>Open</a>
                  </div>
                </div>
              </div>);
          });
          return (
            <div className="row">{historyGroups}</div>
          )
      }

      function HistoryListView(props) {
        return (
          <ul className="collection with-header">
            <li className="collection-item avatar">
              <img src={"chrome://favicon/size/16@2x/"+props.data.data[0].url} alt="" className="circle"/>
              <span className="title">{props.data.key}</span>
              <a href={"http://www."+props.data.key} className="secondary-content"><i className="fa fa-globe fa-2x"></i></a>
            </li>
            {
              props.data.data.map((d) =>
                  <li className="collection-item"><a href={d.url}>{d.url}</a></li>
              )
            }
          </ul>
        )
      }

      return (
          <div className="row cardContainer">
            <div className="col s12 runbotTitle appTital">
              <span className="tital">history</span>
              <div className="right">
                  <div className="selectDateDiv">
                    <i className="fa fa-clock-o"></i>
                    <select class="browser-default selectDate" id="selectHistoryDate" value={this.state.defaultHistoryDate} onChange={this.selectDateOnChange}>
                      <option value="1">Yesterday</option>
                      <option value="7">Last Week</option>
                      <option value="14">Last 2 Weeks</option>
                      <option value="30">Last Month</option>
                      <option value="60">Last 2 Months</option>
                      <option value="90">Last 3 Months</option>
                      <option value="365">Last Year</option>
                    </select>
                  </div>
              </div>
              <div className={"back " + classnames({'hide': this.state.groupsView})} onClick={this.onBackClick}><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
            </div>
            <Search />
            {
              this.state.groupsView ? <HistoryGroups groups={this.state.historyGroups} onHistoryGroupClick={this.onHistoryGroupClick}/> :
              <HistoryListView data={this.state.historyListViewData}/>
            }
          </div>
      );
   }
}

function mapStateToProps(store) {
    return {store}
}

export default connect(mapStateToProps,{})(History);
