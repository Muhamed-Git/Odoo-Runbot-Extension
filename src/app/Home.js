import React from 'react';
import moment from 'moment'

class Home extends React.Component {

  constructor(props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.getMessage = this.getMessage.bind(this);

      this.state = {
        currentTime: moment().format('h:mm'),
        clock: moment().format('a').toUpperCase(),
        greet: this.getMessage(),
      }
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    this.setState({
      currentTime: moment().format('h:mm'),
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
            <span className="clock">{this.state.clock}</span>
          </div>
          <div className="center-align userName">{this.state.greet}, Deep</div>
        </div>
      );
   }
}

export default Home;
