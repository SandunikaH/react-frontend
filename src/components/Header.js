import React from "react";
import '../css/Header.css'
import User from "../User";

export class Header extends React.Component{

    render() {
        if (!User.IsAuthenticated()){
            return null
        }
        return (
            <div>
                <h1 className="topic">Point of Sale System</h1><br/>
                <div className="container">
                    <div>
                        <ul>
                            <li><a href="#">Products</a></li>
                            <li><a href="#">Orders</a></li>
                            <li><a href="#">Shopping Cart</a></li>
                            <li style={{float:'right'}}><a href="#">Login</a></li>
                        </ul>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}