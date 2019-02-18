import React, { Component } from 'react';
import './css/Login.css';
import axios from 'axios'

import {Header} from "./components/Header";

class Login extends Component
{

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            failedAttempt: false
        };
        this.PerformLogin = this.PerformLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    PerformLogin(){
        axios.post('http://localhost:8080/users/login', {
            email: this.state.email,
            password: this.state.password,
        })
        .then(response => {
            this.setState({failedAttempt: false});
            console.log("Go to Orders");
        })
        .catch(error => {
            this.setState({failedAttempt: true});
        })
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <div className="row">
                    <div className="col-md-4 col-sm-2 col-xs-3"></div>
                    <div className="col-md-4 col-sm-8 col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Email </label>
                                    <div className="icon-holder">
                                        <input type="text" onChange={this.handleEmailChange} className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="icon-holder">
                                        <input type="password" onChange={this.handlePasswordChange} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            {this.state.failedAttempt &&
                            <div className="alert alert-danger" role="alert">
                                Authentication Failed.
                            </div>
                            }
                            <div className="panel-footer">
                                <button onClick={this.PerformLogin} className="btn btn-success btn-block">Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-2 col-xs-3"></div>
                </div>
            </div>
        );
    }
}

export default Login;