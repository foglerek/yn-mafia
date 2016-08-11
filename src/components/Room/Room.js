import React from 'react'
import { IndexLink, Link } from 'react-router'
// import classes from './Start.scss'
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { Table } from 'react-bootstrap';

const Room = React.createClass({
    startGame() {
      console.log(this.props.AppReducer);
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
                    <Table striped bordered condensed hover>
                      <tbody>
                        {this.props.AppReducer.users && this.props.AppReducer.users.map((user) => {
                          return (<tr key={user.socket_id}><td>{user.name}</td></tr>)
                        })}
                      </tbody>
                    </Table>

                    <Button onClick={this.startGame} bsStyle="primary">Start Game</Button>
                </div>);
    }
});

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({  }), dispatch };
}

Room.propTypes = {
  AppReducer: React.PropTypes.object.isRequired,
}

export default Room;

