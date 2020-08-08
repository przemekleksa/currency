import React, { Component } from 'react';
import { connect } from 'react-redux';
import './add.scss';

class AddTransaction extends Component {

   handleSubmit = (event) =>{
        event.preventDefault();
        let name = event.target.name.value
        let amount = event.target.amount.value
        // preventing of wrong data formats entered by user
        if (name === ""){
            alert('enter name')
        } else
        if (isNaN(amount)){
            alert('enter number into amount')
        } else if (name !== "" && isNaN(amount) === false){
            amount = parseFloat(amount);
            let transaction = {name, amount}
            this.props.addTransaction(transaction)
        }
        
   }
    render() { 
        return ( 
            <div className="add-transaction">
               <form onSubmit={this.handleSubmit}>
               <div className="labels">
                <div className="label">Name:</div>
                <div className="label">Amount:</div>
               </div>
                    <label>
                        <input type="text" name="name"/>
                        <input type="text" name="amount"/>
                        <div>EUR</div>
                       <button>Add</button>
                    </label>
                </form>
            </div>
         );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTransaction: (transaction) => {
            dispatch({
                type: 'ADD_TRANSACTION', name: transaction.name, eur: transaction.amount, id: "4"
            })
        }
    }
}
 
export default connect(null, mapDispatchToProps)(AddTransaction);