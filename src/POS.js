import React from "react";
import {Header} from "./components/Header";
import Login from "./Login";
import User from "./User";
import {Router, Route, browserHistory} from "react-router";
import {Orders} from "./Orders";

export default class POS extends React.Component{

    static instance = null

    constructor(props, context) {
        super(props, context);
        this.state = {
            showHeader: false
        };
        POS.instance = this;
    }

    render(){
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path={"/"} component={Login}/>
                    <Route path={"/orders"} component={Orders}/>
                </Router>
            </div>
        )
    }
}