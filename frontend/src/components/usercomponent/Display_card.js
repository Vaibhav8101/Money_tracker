import React from 'react'
import DisplayAmount from './DisplayAmount'


const Display_card = (props) => {
    return (
        <div className="card" style={{ width: '28%', marginLeft: '2rem' }}>
            <div className="card-body">
                <h5 className="card-title"><strong>{props.title}</strong></h5>
                <p className="card-text">{props.amount}</p>
            </div>
        </div>
    )
}

export default Display_card