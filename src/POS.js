import React from "react";
import Login from "./Login";
import {Router, Route, browserHistory} from "react-router";
import {Orders} from "./Orders";
import {Products} from "./Products";

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
                    <Route path={"/products"} component={Products}/>
                </Router>
            </div>
        )
    }
}