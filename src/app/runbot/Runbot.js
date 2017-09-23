import React from 'react'
import { connect } from 'react-redux'
import { addData } from '../actions'
import appData from '../data/AppData.js'
import demoData from '../data/DemoData.js'
import BranchCard from './BranchCard.js'

class Runbot extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        cardDatas: [],
      }
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

   render() {
     if(this.state.cardDatas.length === 0) {
       return(<div>Loading</div>)
     }

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
            {
              this.state.cardDatas.map((cardData,index)=>{
                return <BranchCard data={cardData} key={index}/>
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
