import React, { Component } from 'react';
import { connect } from 'react-redux';
import './form.scss';

class Form extends Component {
    
    handleChange = (event) =>{
        
        let val = event.target.value
        if (isNaN(val)){
            alert('Please type a number')
            event.target.value = 4.30
        }
        
        this.props.changeValue(event.target.value);
    }


    render() { 
        const rate = this.props;
        console.log(rate.exchangeRate[0].rate)
        return ( 
            <div className="exchange-rate-form">
            
                <form onSubmit={this.handleSubmit}>
                    <div> 
                        1 EUR =
                    </div>
                    <label>
                        <input type="text" placeholder="enter exchange rate here" onChange={this.handleChange} />
                    </label>
                </form>
                <div>
                    current exchange rate: <span>1 EUR = {rate.exchangeRate[0].rate} PLN</span>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        exchangeRate: state.exchangeRate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue: (change) => {
            dispatch({
                type: "CHANGE_RATE", rate: change
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);