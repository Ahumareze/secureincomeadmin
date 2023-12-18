import React, { useState } from 'react';

//styles
import classes from './user.module.css';

//icons
import { FiMoreHorizontal } from 'react-icons/fi';

function User({data, openTransactions, updateBalance}) {
    //UI state
    const [showMore, setShowMore] = useState(false);

    //total
    const total = data.balance

    const Balance = ({name, amount}) => {
        return(
            <div className={classes.balance}>
                <h3>${(amount).toLocaleString()}</h3>
                <p>{name}</p>
            </div>
        )
    };

    const Plan = ({plan, amount}) => {
        return(
            <div className={classes.plan}>
                <h3>${(amount).toLocaleString()}</h3>
                <p>{plan}</p>
            </div>
        )
    };

    const more = (
        <div className={classes.more_div}>
            <div onClick={updateBalance}>Update Balances</div>
            <div onClick={openTransactions}>Transactions</div>
        </div>
    )

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <img src={data.img} />
                <div className={classes.top_details}>
                    <h3>{data.name}</h3>
                    <p>{data.email}</p>
                    <p><span>Location:</span> {data.country}</p>
                </div>
                <div className={classes.more} onClick={() => setShowMore(prev => !prev)} > <FiMoreHorizontal /> </div>
            </div>
            <div className={classes.balances}>
                <Balance amount={total} name={'Total Balance'} />
                <Balance amount={data.deposited} name={'Deposited'} />
                <Balance amount={data.earned} name={'Earned'} />
                <Balance amount={data.withdrawn} name={'Withdrawn'} />
            </div>
            {showMore && more}
        </div>
    )
}

export default User