import React, { Component } from "react";
import Axios from "axios";
import toastr from "toastr";

class HomePage extends Component {
    componentDidMount() {
        document.title = "Admin login";

        if (localStorage.adminSessionToken) {
            this.props.history.push("/dashboard/admin");
        }
    }

    state = {
        loginid: "",
        password: ""
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onLogin = e => {
        e.preventDefault();

        const data = {
            loginid: this.state.loginid,
            password: this.state.password
        };

        if (this.state.loginid && this.state.password) {
            Axios.post(
                "http://d24w27cd80vt93.cloudfront.net/api/login/univ",
                data
            )
                .then(res => {
                    toastr.success("Successfully logged in");
                    localStorage.setItem("adminSessionToken", res.data[1]);
                    localStorage.setItem("adminName", res.data[0]);
                    this.props.history.push("/dashboard/admin");
                })
                .catch(err => console.log(err));
        } else {
            toastr.warning("All fields are mandatory");
        }
    };

    render() {
        let bg = window.location.origin + "/images/originals/city.jpg";
        return (
            <div
                className="app-container app-theme-white body-tabs-shadow"
                style={{
                    backgroundImage: "url(" + bg + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="app-container">
                    <div className="h-100">
                        <div className="h-100 no-gutters row">
                            <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-12">
                                <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-5">
                                    <div className="app-logo"></div>
                                    <h4 className="mb-0">
                                        <span className="d-block">
                                            Welcome back,
                                        </span>
                                        <span>
                                            Please sign in to your account.
                                        </span>
                                    </h4>
                                    <div className="divider row"></div>
                                    <div>
                                        <form className="">
                                            <div className="form-row">
                                                <div className="col-md-12">
                                                    <div className="position-relative form-group">
                                                        <label className="">
                                                            Login Id
                                                        </label>
                                                        <input
                                                            name="loginid"
                                                            placeholder="Login Id here..."
                                                            type="text"
                                                            className="form-control"
                                                            onChange={
                                                                this.onChange
                                                            }
                                                        />
                                                    </div>

                                                    <div className="position-relative form-group">
                                                        <label className="">
                                                            Password
                                                        </label>
                                                        <input
                                                            name="password"
                                                            placeholder="Password here..."
                                                            type="password"
                                                            className="form-control"
                                                            onChange={
                                                                this.onChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider row"></div>
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    <a
                                                        href="/verifier-login"
                                                        className="btn-lg btn btn-link"
                                                    >
                                                        Verifier Login
                                                    </a>
                                                    <a
                                                        href="/student/login"
                                                        className="btn-lg btn btn-link"
                                                    >
                                                        Student Login
                                                    </a>
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        onClick={this.onLogin}
                                                    >
                                                        Login to Dashboard
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
