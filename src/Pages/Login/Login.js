import React, { Component } from "react";
import { observer } from "mobx-react";
import styles from "./css/Login.module.css";
import { InvalidDetails, Success } from "../../Components/Alerts";
import { Link } from "react-router-dom";
import { UserContext } from "../../mobx/UserState";

let $ = undefined
let interval = undefined;
class Login extends Component {
  static contextType = UserContext;
  state = {
    apiUrl: process.env.REACT_APP_API_URL,
    email: "",
    password: "",
    submitting: false,
    error: false,
    response: "",
    success: false,
  };

  // setJquery = () => {
  //   interval = setInterval(() => {
  //     if (window.$) {
  //       console.log("i dey");
  //       clearInterval(interval);
  //       $ = window.$;
  //     }
  //   }, 1000);
  // };

  handleSubmit = async (e) => {
    e.preventDefault();
    const content = this.context;
    const { logIn } = content;
    const { email, password } = this.state;
    const data = { email, password };
    logIn(data);
  };

  setErrorStatus = () => {
    this.setState({ error: false });
  };

  componentDidMount = async () => {
    // this.setJquery();
    const params = new URLSearchParams(window.location.search);
    const url = this.state.apiUrl;
    const userEmailFromLink = params.get("email");
    const userTokenFromLink = params.get("token");

    if (userEmailFromLink !== "" && userTokenFromLink !== "") {
      try {
        let res = await fetch(`${url}/Auth/Login`, {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify({
            email: userEmailFromLink,
            authenticationToken: userTokenFromLink,
          }),
          redirect: "follow",
        });
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          this.setState({ success: true, response: data.message });
          window.location.reload();
        } else {
          console.log(res);
        }
      } catch (error) {}
    }
  };

  render() {
    const content = this.context;
    const { loading, error } = content;
    const { email, password, success } = this.state;
    return (
      <>
        <div className={styles.background}>
          {success ? <Success message={this.state.response} /> : null}
          {error ? (
            <InvalidDetails setErrorStatus={this.setErrorStatus} />
          ) : null}
          <div className={styles.div}>
            <h1>
              <img
                src="./assets/img/logo.svg"
                alt="logo"
                width={147}
                height={33}
                className="logo-img"
              />
              Hospital Management Solution
            </h1>
            <h2>Login</h2>
            <form
              className={styles.form}
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="Your Email Address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="Your Password"
                  required
                />
              </div>
              <div className="row justify-content-between">
                <button
                  className="btn btn-primary mt-3"
                  type="submit"
                  disabled={loading}
                >
                  <span className="btn-icon icofont-location-arrow mr-2"></span>{" "}
                  Login
                </button>

                <Link to="/resetmypassword" className="justify-self-right mt-3">
                  <p className="mt-3">Forgot Password</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default observer(Login);
