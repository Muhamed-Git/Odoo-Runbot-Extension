import React from 'react'
import Header from './Header.js'
import ActionButton from './ActionButton.js'
import Runbot from './runbot/Runbot.js'
import { connect } from 'react-redux'
import { initState } from './actions'
import demoData from './data/DemoData.js'
import model from './model/DBA.js'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.initState = this.initState.bind(this);
  }

  componentDidMount() {
      model.getAll(this.initState);
  }

  initState(data) {
    this.props.initState(data);
  }

  render() {
      return (
         <div>
            <Header />
            <Runbot />
            <ActionButton />
         </div>
      );
   }
}

function mapStateToProps(store) {
    return {store}
}

export default connect(mapStateToProps,{initState})(App);
