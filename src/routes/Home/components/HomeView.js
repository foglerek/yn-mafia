import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import { IndexLink, Link } from 'react-router'
// import classes from './Start.scss'
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

export default React.createClass({
    getInitialState() {
      return { name: '' };
    },
    addUser() {
      console.log(this.state.name);
      this.props.joinGame(this.state.name);
    },
    handleNameChange(e) {
      this.setState({name: e.target.value});
    },
    componentWillMount() {
    },
    render() {
        return (<div>
                    <h4>Welcome!</h4>
                    <img
                      alt='This is a duck, because Redux!'
                      className={classes.duck}
                      src={DuckImage} />
                    <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Pick a name"
                      onChange={this.handleNameChange}
                      />
                    </FormGroup>
                    <Button onClick={this.addUser} bsStyle="primary">Join Game</Button>
                </div>);
    }
});

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({  }), dispatch };
}
