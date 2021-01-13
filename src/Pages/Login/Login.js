import React, { Component } from "react";
import { observer } from "mobx-react";
import "./css/Login.css";
import { InvalidDetails, Success } from "../../Components/Alerts";
import { Link } from "react-router-dom";
import { UserContext } from "../../mobx/UserState";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { logInUrl } from "../../api/URLs";
import logoMakeshift from "../../assets/img/logo-makeshift.svg";

let $ = undefined;
let interval = undefined;
class Login extends Component {
  static contextType = UserContext;
  state = {
    email: "",
    password: "",
    submitting: false,
    error: false,
    response: "",
    success: false,
  };

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
    const userEmailFromLink = params.get("email");
    const userTokenFromLink = params.get("token");

    if (userEmailFromLink !== "" && userTokenFromLink !== "") {
      try {
        const payload = {
          email: userEmailFromLink,
          authenticationToken: userTokenFromLink,
        };
        const logIn = logInUrl();
        const logInConfig = fetchConfig({
          url: logIn,
          data: payload,
          method: "post",
        });
        const res = await fetchWrapper(logInConfig);

        if (res.status === 200) {
          const data = res;
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
      <div className="auth-background">
        {success ? <Success message={this.state.response} /> : null}
        {error ? <InvalidDetails setErrorStatus={this.setErrorStatus} /> : null}
        <div className="row mx-0 d-flex justify-content-center align-items-center">
          <div className="">
            <img src={logoMakeshift} alt="logo" />
            <h1 className="text-white">Hospital Management Solution</h1>
            <p className="text-white">
              It was some time before he obtained any answer, and the reply,
              when made, was unpropitious. After exchanging a mute glance or
              two, the hermit went to the further side of the hut, and opened a
              hutch, which was concealed with great care and some ingenuity.{" "}
            </p>
          </div>
          <div className="">
            <div className="card border-light">
              <div className="card-body">
                <form
                  className="mb-4 p-5"
                  onSubmit={(e) => this.handleSubmit(e)}
                >
                  <h4 className="text-center">Welcome back!</h4>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      tabIndex={-98}
                      name="email"
                      value={email}
                      onChange={(e) => {
                        this.setState({ [e.target.name]: e.target.value });
                      }}
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
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    Log in
                  </button>
                  <Link to="/resetmypassword" className="text-center mt-3">
                    <p
                      className="text-center mt-3"
                      style={{ color: "#007BFF" }}
                    >
                      Forgot Password
                    </p>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(Login);
