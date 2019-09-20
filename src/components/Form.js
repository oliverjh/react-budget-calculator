import React from 'react'
import {MdSend} from 'react-icons/md'

const Form = ({charge,
            amount, 
            handleCharge, 
            handleAmount, 
            handleSubmit, 
            edit
        }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">Charge</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="charge" 
                        name="charge" 
                        placeholder="e.g. Rent" 
                        value={charge}
                        onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="amount" 
                        name="amount" 
                        placeholder="e.g. £750"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>               
            </div>
            <button type="submit" className="btn">
                {edit ? 'edit' : 'submit'}
                <MdSend className="btn-icon"/>
            </button>
        </form>
    )
}

export default Form;