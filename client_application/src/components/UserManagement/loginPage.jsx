import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LoginSlideImages from "./LoginSlideImages";

export default class LoginPage extends Component {
  state = {
    isLogin: true,
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  render() {
    return (
      <div
        className="loginContainer"
        style={{
          display: "flex",
          height: "84vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.isLogin ? (
          <LoginForm onLoginClick={this.toggleForm} />
        ) : (
          <RegisterForm onRegisterClick={this.toggleForm} />
        )}

        <div
          className="image"
          style={{ flex: 1.5, border: "1px solid black", margin: "1rem" }}
        >
          <LoginSlideImages />
        </div>
      </div>
    );
  }
}
