import React, { Component } from 'react';
import './css/Order.css'
import User from "./User";
import {Header} from "./components/Header";
import OrderDetails from "./components/OrderDetails";
import axios from "axios";

export class Orders extends Component{

    constructor(props, context) {
        super(props, context);

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);

        this.state = {
            validating: true,
            orders: [],
            requiredOrder: 0,
            modeIsOpen: false
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

    replaceModalItem(index) {
        this.setState({
            requiredOrder: index
        });
    }

    toggleModal() {
        this.setState({
            modeIsOpen: !this.state.modeIsOpen
        });
    }

    saveModalDetails(item) {
        const requiredItem = this.state.requiredOrder;
        let tempOrder = this.state.orders;
        tempOrder[requiredItem] = item;
        this.setState({ orders: tempOrder });
    }

    deleteOrder(toBeDeleted) {
        console.log(toBeDeleted);
    }

    render() {
        if(this.state.validating){
            return (
                <div>Please wait</div>
            );
        }

        const orderDetail = this.state.orders.map((order, index) => (
            <div className="item" key={index}>
                <div>
                    <div className="orderNo">
                        Order No: <tab2>{index+1}</tab2> <tab1>Order ID: <tab2>{order.orderId}</tab2></tab1>
                    </div>
                    <div className="buttonsPane">
                        <button className="btn btn-info" >
                            <i className="glyphicon glyphicon-new-window"></i>
                        </button> <tab2></tab2>
                        <button className="btn btn-danger">
                            <i className="glyphicon glyphicon-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        ));

        let modalData = this.state.orders[this.state.requiredOrder];

        return (
            <div>
                <Header/>
                <div className="container">
                    <h3>Orders</h3>
                    {
                        this.state.orders.length === 0 &&
                        <h4>No orders found</h4>
                    }
                    {
                        this.state.orders.length > 0 &&
                        <h4>Orders Count: <b>{this.state.orders.length}</b></h4>
                    }
                    <div className="order-list">
                        {orderDetail}
                    </div>
                </div>
                <OrderDetails/>
            </div>
        );
    }
}


