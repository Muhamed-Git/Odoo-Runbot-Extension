import React from 'react'
import { connect } from 'react-redux'
import { addData } from '../actions'
import appData from '../data/AppData.js'
import demoData from '../data/DemoData.js'
import BranchCard from './BranchCard.js'
import {RunbotAction } from './RunbotAction.js'
import classnames from 'classnames'

require("./less/runbot.less");

class Runbot extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        cardDatas: [],
        activeDelete: false,
      }

      this.onClickDeleteBranch = this.onClickDeleteBranch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        cardDatas: nextProps.store.Branches
      });
  }

  componentDidUpdate() {
    window.$('#logModel').modal();
    window.$('.dropdown-button').dropdown();
  }

  onClickDeleteBranch() {
    this.setState({activeDelete: !this.state.activeDelete});
  }

   render() {

      return (
         <div className="row cardContainer">
           <div id="logModel" className="modal modal-fixed-footer">
             <div className="modal-content">
               <table id="logTable"></table>
             </div>
             <div className="modal-footer">
               <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
             </div>
           </div>
           <div className="col s12 runbotTitle appTital">
             odoo runbot
             <div className="runbotActions right">
               <div className="center-align">
                 <a className="modal-trigger" href="#addBranchModel"><i className="fa fa-plus-circle" aria-hidden="true"></i></a>
               </div>
               <div className="center-align">
                 <a onClick={this.onClickDeleteBranch}><i className={classnames({'fa fa-trash-o':!this.state.activeDelete,'fa fa-stop-circle-o':this.state.activeDelete})} aria-hidden="true"></i></a>
               </div>
             </div>
           </div>
            {
              this.state.cardDatas.map((cardData,index)=>{
                return <BranchCard data={cardData} key={index} activeDelete={this.state.activeDelete}/>
              })
            }
         </div>
      );
   }
}

function mapStateToProps(store) {
    return {store}
}

export default connect(mapStateToProps,{addData})(Runbot);
