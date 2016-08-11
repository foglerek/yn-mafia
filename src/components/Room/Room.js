import React from 'react'
import { IndexLink, Link } from 'react-router'
// import classes from './Start.scss'
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

const HomeView = React.createClass({
    startGame() {
    },
    enableButton() {
    },
    componentWillMount() {
      this.socket = io('http://localhost:3000');
      this.socket.on('state', (state) => {
        if(state.state === 'ready_to_start') {

        }
      });
    },
    render() {
        return (<div>
                    <h4>Room</h4>
                    <Button onClick={this.startGame} bsStyle="primary">Start Game</Button>
                </div>);
    }
});

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({  }), dispatch };
}

export default connect(null, mapDispatchToProps)(HomeView);

