import React from "react";
import '../css/OrderDetails.css';
import {Modal, ModalBody, ModalFooter} from "react-bootstrap";

class OrderDetails extends React.Component{

    constructor(props, context) {
        super(props, context);

        this.handleSave = this.handleSave.bind(this);

        this.state = {
            productList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            productList: nextProps.productList
        });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }

    msgHandler(e) {
        this.setState({ msg: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalBody>Modal Body</ModalBody>
                <ModalFooter>
                    <button className="btn btn-info">Save</button>
                    <button className="btn btn-danger">Close</button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default OrderDetails;