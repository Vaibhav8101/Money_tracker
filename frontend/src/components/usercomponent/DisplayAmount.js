import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import Display_card from './Display_card';

const DisplayAmount = () => {
    const [amountvalue, updateamount] = useState({});
    let api = `http://localhost:8000/Tracker/v1/user-data/`
    useEffect(() => {
        const fetchFriend = async (url) => {
            try {
                const resp = await axios.get(url);
                const amount_up = await resp.data
                updateamount(amount_up)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        }
        fetchFriend(api)
    });

    return (
        <div>
            {amountvalue && amountvalue.map && amountvalue.map((item, key) => {
                return (
                    <div className='row' style={{ marginTop: '1rem', marginLeft: '17rem' }}>
                        <Display_card className='col1' key={key} amount={item.amountspend} title="Amount Spend" />
                        <Display_card className='col2' key={key} amount={item.budget} title="Budget" />
                    </div>
                )
            })}

        </div>
    )
}

export default DisplayAmount