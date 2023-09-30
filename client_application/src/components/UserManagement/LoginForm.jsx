import React, { Component } from "react";
import { authUser } from "../../services/userService";
import Alert from "@mui/material/Alert";
import SnackbarComponent from "../common/SnackbarComponent";
export default class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    snackOpen: false,
    snackMessage:"",
  };

  handleChange = (e) => {
    let data = this.state.data;
    const name = e.target.name;
    const value = e.target.value;

    data[name] = value;
    this.setState({ data: data });
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  openSnackbar = (message) => {
    this.setState({ snackMessage: message });
    this.setState({ snackOpen: true });
  };

  onSubmit = async () => {
    await authUser(this.state.data)
      .then(({ data }) => {
        const jsonString = JSON.stringify(data);
        window.localStorage.setItem("user", jsonString);
        this.openSnackbar(<Alert severity="success">Welcome {data.name}!</Alert>);
        setTimeout(() => {
          window.location = "/home";
        }, 1000);
      })
      .catch((err) => this.openSnackbar(<Alert severity="error">{err.response.data}</Alert>));
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
        <form>
          <center>
            <div
              style={{ fontSize: "22px", margin: "1rem", marginBottom: "8rem" }}
            >
              Please login to your account
            </div>
          </center>
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
              Login
            </button>
            <div>
              Not a member?
              <button
                type="button"
                className="btn btn-link"
                onClick={this.props.onLoginClick}
              >
                Register
              </button>
            </div>
          </center>
        </form>
        <SnackbarComponent
          open={this.state.snackOpen}
          handleClose={this.handleSnackClose}
          message={this.state.snackMessage}
        />
      </div>
    );
  }
}
