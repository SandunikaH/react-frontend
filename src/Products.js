import React, { Component } from 'react';
import {Header} from "./components/Header";
import "./css/Product.css";
import User from "./User";
import axios from "axios";

export class Products extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            validating: true,
            products: []
        };
        User.ValidateAccessToken()
            .then((status) => {
                this.setState({validating: false});
                if (!status){
                    this.props.router.push('/');
                    return;
                }
                const localToken = localStorage.getItem('token') || '';
                axios.get('http://localhost:8080/products', {headers:{'Authorization': `bearer ${localToken}`}})
                    .then((response)=>{
                        console.log(response);
                        this.setState({products: response.data.products})
                    })
                    .catch((err)=>{
                        console.error(err);
                    })
            });
    }

    render() {
        return (
            <div>
                <Header/>
                Products
            </div>

        );
    }
}