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
            .then(()=> {
                this.setState({validating: false});

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
            return (<div>Please wait</div>)
        }

        return (
            <div>
                <Header/>
                <div className="container">
                    <h2>Orders</h2>
                    <div className="order-list">
                        {this.state.orders.map(function(d, idx){
                            return (<div className="item" key={idx}>{d.orderId}</div>)
                        })}

                    </div>

                </div>
            </div>
        );
    }
}


