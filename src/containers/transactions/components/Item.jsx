import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

//styles
import classes from '../transactions.module.css';

//images
import bitcoin from '../../../assets/crypto/bitcoin.png';
import ethereum from '../../../assets/crypto/ethereum.png';
import binance from '../../../assets/crypto/binance.png';
import doge from '../../../assets/crypto/dogecoin.png';

function Item({data, updateStatus}) {
    //ui state
    const [showMore, setShowMore] = useState(false)

    let status_container = <div className={classes.pending}>{data.status}</div>;
    if(data.status === 'failed'){
        status_container = <div className={classes.failed}>{data.status}</div>
    }else if(data.status === 'success'){
        status_container = <div className={classes.success}>{data.status}</div>
    };

    let coin = <img src={bitcoin} alt='' />;
    if(data.coin === 'Ethereum'){
        coin = <img src={ethereum} alt='' />;
    }else if(data.coin === 'Binance'){
        coin = <img src={binance} alt='' />;
    }else if(data.coin === 'Dogecoin'){
        coin = <img src={doge} alt='' />;
    };

    const more = (
        <div className={classes.more_div}>
            <div onClick={() => updateStatus('success')}>Approve</div>
            <div onClick={() => updateStatus('failed')}>Decline</div>
        </div>
    )

    return (
        <div className={classes.item}>
            {coin}
            <div className={classes.coin_name}>{data.coin}</div>
            <div className={classes.amount}>${data.amount}</div>
            {status_container}
            <div className={classes.date}>{data.date}</div>
            <div className={classes.more} onClick={() => setShowMore(prev => !prev)}> <FiMoreHorizontal /> </div>
            {showMore && more}
        </div>
    )
}

export default Item