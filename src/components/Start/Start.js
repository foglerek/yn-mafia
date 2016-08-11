import React from 'react'
import { IndexLink, Link } from 'react-router'
// import classes from './Start.scss'
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addUser } from '../../redux/modules/UserActions';
import { bindActionCreators } from 'redux';

const Start = React.createClass({
    getInitialState() {
      return { name: '' };
    },
    addUser() {
      console.log(this.state.name);
      this.props.dispatch(addUser(this.state.name))
    },
    handleNameChange(e) {
      this.setState({name: e.target.value});
    },
    render() {
        return (<div>
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
  return { ...bindActionCreators({ addUser }), dispatch };
}

export default connect(null, mapDispatchToProps)(Start);