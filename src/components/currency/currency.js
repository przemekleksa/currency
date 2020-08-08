import React, { Component } from 'react';
import { connect } from 'react-redux';
import './currency.scss';
import Form from '../form/form';
import AddTransaction from '../addTransaction/add';

class Currency extends Component {
    handleClick = (id) => {
        this.props.deletePost(id);
    }
    render() { 
        const { posts } = this.props;

        // counting sum of all transactions
        let sumEur=0
        let sumPln=0
        for(let i=0; i < this.props.posts.length; i++){
            sumEur += this.props.posts[i].eur
            sumPln += this.props.posts[i].pln
        }

        this.items = posts.map((item, key) =>
        <li key={item.id}>
            <div className='transaction-name'>{item.name}</div>
            <div className='eur'>{item.eur.toFixed(2).replace(/[.,]00$/, "")} EUR</div>  
            <div className='pln'>{item.pln.toFixed(2).replace(/[.,]00$/, "")} PLN</div>
            <button onClick={() => this.handleClick(`${item.id}`)}>Delete</button></li>)
        return (
            <div className="container"> 
                <div className="calc">
                
                    <h1>
                    EUR/PLN exchange
                    </h1>
                    <h2>Please enter exchange rate for 1 euro</h2>
                    <Form />
                    <AddTransaction />
                </div>
                <div className="transaction-list">
                    <div className="total-value">
                        <div className="total">
                            <div>Total value of all transactions:</div>
                            <div>
                                {sumEur.toFixed(2).replace(/[.,]00$/, "")} EUR
                            </div>
                            <div>
                                {sumPln.toFixed(2).replace(/[.,]00$/, "")} PLN
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="list">
                        <ul>
                        {
                        this.items 
                        }
                        </ul>
                    </div>
                   
                </div>
                
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => {
            dispatch({
                type:'DELETE', id: id
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency);