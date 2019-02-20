import React from "react";
import '../css/Header.css'
import User from "../User";
import Product from "../Products"

export class Header extends React.Component{

    render() {
        if (!User.IsAuthenticated()){
            return null
        }
        return (
            <div className="container">
                <h1>Point of Sale System</h1><br/>
                <div>
                    <ul>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/orders">Orders</a></li>
                    </ul>
                </div><br/>
            </div>
        );
    }
}