import React, { Component } from 'react';
import './css/Order.css'
import User from "./User";
import {Header} from "./components/Header";
import axios from "axios";

export class Orders extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            validating: true,
            orders: []
        };
        User.ValidateAccessToken()
            .then((status)=> {
                this.setState({validating: false});
                if (!status){
                    this.props.router.push('/');
                    return;
                }
                const localToken = localStorage.getItem('token') || '';
                axios.get('http://localhost:8080/orders', {headers:{'Authorization': `bearer ${localToken}`}})
                    .then((response)=>{
                        console.log(response);
                        this.setState({orders: response.data.orders})
                    })
                    .catch((err)=>{
                        console.error(err);
                    })
            });
    }

    render() {
        if(this.state.validating){
            return (
                <div>Please wait</div>
            );
        }
        return (
            <div>
                <Header/>
                <div className="container">
                    <h3>Orders</h3>
                    <h4>Order Count: <b>{this.state.orders.length}</b></h4>
                    <div className="order-list">
                        {
                            this.state.orders.map(function(d, idx){
                                return (
                                    <div className="item" key={idx}>
                                        <div>
                                            <div className="orderNo">
                                                Order No: <tab2>{idx+1}</tab2> <tab1>Order ID: <tab2>{d.orderId}</tab2></tab1>
                                            </div>
                                            <div className="buttonsPane">
                                                <a href="#" className="btn btn-info">
                                                    <i className="glyphicon glyphicon-new-window"></i>
                                                </a> <tab2></tab2>
                                                <a href="#" className="btn btn-danger">
                                                    <i className="glyphicon glyphicon-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}


