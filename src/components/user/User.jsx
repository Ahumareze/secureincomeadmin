import React, { useState } from 'react';

//styles
import classes from './user.module.css';

//icons
import { FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateAccStatus } from '../../redux/actions/mainActions';

function User({data, openTransactions, updateBalance}) {
    const dispatch = useDispatch();
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

    const handleDisable = () => {
        const newUser = {
            ...data,
            active: false
        };

        dispatch(updateAccStatus(newUser));
    }

    const handleEnable = () => {
        const newUser = {
            ...data,
            active: true
        };

        dispatch(updateAccStatus(newUser));
    }

    const more = (
        <div className={classes.more_div}>
            <div onClick={updateBalance}>Update Balances</div>
            <div onClick={openTransactions}>Transactions</div>
            {data.active === true ? (
                <div onClick={handleDisable} style={{color: 'red'}}>Disable account</div>
            ):(
                <div onClick={handleEnable}>Activate account</div>
            )}
        </div>
    )

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <img src={data.img} />
                <div className={classes.top_details}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                        <h3>{data.name}</h3>
                        {data.active === false && (
                            <div style={{background: '#ff000020', fontSize: 12, fontWeight: 500, color: '#ff0000', width: 'fit-content', borderRadius: 30, paddingRight: 10, paddingLeft: 10, paddingTop: 3, paddingBottom: 3}}>Account disabled</div>
                        )}
                    </div>
                    
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