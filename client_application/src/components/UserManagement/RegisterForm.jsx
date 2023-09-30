import React, { Component } from "react";
import { crateUser } from "../../services/userService";
import SnackbarComponent from "../common/SnackbarComponent";
import { Alert } from "@mui/material";

export default class RegisterForm extends Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    snackOpen: false,
    snackMessage: "",
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  openSnackbar = (message) => {
    this.setState({ snackMessage: message });
    this.setState({ snackOpen: true });
  };

  handleChange = (e) => {
    let data = this.state.data;
    const name = e.target.name;
    const value = e.target.value;

    data[name] = value;
    this.setState({ data: data });
  };

  onSubmit = async () => {
    await crateUser(this.state.data)
      .then(() => {
        this.openSnackbar(
          <Alert severity="success">Registered Successfully</Alert>
        );
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { data } = this.state;
    return (
      <div
        className="formContainer"
        style={{
          display: "flex",
          flex: 1,
          border: "1px solid black",
          margin: "1rem",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <form>
            <center>
              <div
                style={{
                  fontSize: "22px",
                  margin: "1rem",
                  marginBottom: "8rem",
                }}
              >
                Please Create a New Account
              </div>
            </center>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                name="email"
                value={data.email}
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <center>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.onSubmit();
                }}
              >
                Register
              </button>
            </center>
          </form>
          <center>
            <div>
              Already have an Account?
              <button
                type="button"
                className="btn btn-link"
                onClick={this.props.onRegisterClick}
              >
                Login
              </button>
            </div>
          </center>
        </div>
        <SnackbarComponent
          open={this.state.snackOpen}
          handleClose={this.handleSnackClose}
          message={this.state.snackMessage}
        />
      </div>
    );
  }
}
