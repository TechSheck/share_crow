import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';


class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="login-wrapper">
        <div
          className="login-modal"
          onClick={this.openModal}
        ><span className="glyphicon glyphicon-log-in"></span>Login</div>
        <Modal isOpen={this.state.open}>
          <h1>Login</h1>
          <button onClick={this.closeModal}>Close</button>
          <p><input placeholder="Username or Email" /></p>
          <p><input placeholder="Password" /></p>
          <input type="submit" value="Login" onClick={this.props.login} />
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginModal;
