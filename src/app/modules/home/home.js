// Library
import React from 'react';
import moment from 'moment'

// Redux
import { connect } from 'react-redux'

// Less
require('./less/home.less');

class Home extends React.Component {

  constructor(props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.getMessage = this.getMessage.bind(this);

      this.state = {
        currentTime: moment().format('h:mm'),
        clock: moment().format('a').toUpperCase(),
        greet: this.getMessage(),
        userName: '',
        clockType: false,
      }
  }

  componentDidMount() {
    this.updateState();
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        userName: nextProps.store.Setting.userName,
        clockType: nextProps.store.Setting.clockType,
        currentTime : nextProps.store.Setting.clockType ? moment().format('HH:mm') : moment().format('hh:mm')
      });
  }

  updateState() {
    var currentTime = this.state.clockType ? moment().format('HH:mm') : moment().format('hh:mm');
    this.setState({
      currentTime,
      clock: moment().format('a').toUpperCase(),
      greet: this.getMessage(),
    });
    var t = setTimeout(this.updateState, 500 * 60);
  }

  getMessage() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    return greet;
  }

   render() {
      return (
        <div>
          <div className="time center-align">
            <span className="currentTime">{this.state.currentTime}</span>
            {
                !this.state.clockType ? <span className="clock">{this.state.clock}</span> : ''
            }
          </div>
          <span className="date">{moment().format('dddd, MMMM Do YYYY')}</span>
          <div className="center-align userName">{this.state.greet}, {this.state.userName}</div>
        </div>
      );
   }
}

function mapStateToProps(store) {
    return {store}
}

export default connect(mapStateToProps,{})(Home)
