import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//styles
import classes from './balance.module.css';

//components
import { Header, Loader } from '../../components';

//iocns
import { FiArrowLeft } from 'react-icons/fi';
import { updateBalance } from '../../redux/actions';

function UpdateBalance({close, data}) {
    //initialize
    const dispatch = useDispatch();

    //UI state
    const [balance, setBalance] = useState(data.balance);
    const [deposited, setDeposited] = useState(data.deposited);
    const [earned, setEarned] = useState(data.earned);
    const [withdrawn, setWithdrawn] = useState(data.withdrawn);

    //redux state
    const loading = useSelector(state => state.mainReducer.loading);

    const handleUpdate = () => {
        const newUser = {
            ...data,
            balance: JSON.parse(balance),
            deposited: JSON.parse(deposited),
            earned: JSON.parse(earned),
            withdrawn: JSON.parse(withdrawn)
        };

        dispatch(updateBalance(newUser));
    }

    let container = (
        <div className={classes.container}>
            <div className={classes.back} onClick={close}> <FiArrowLeft /> Back to dashboard </div>
            <h2>{data.name} - Edit Balance</h2>
            <p className={classes.availiable_balance}>Total availiable balance: <span>${(data.basic_plan + data.advance_plan + data.diamond_plan).toLocaleString()}</span></p>
            <div className={classes.mainContainer}>
                <div className={classes.BalanceItem}>
                    <input defaultValue={balance} type='number' onChange={e => setBalance(e.target.value)} />
                    <p>Balance</p>
                </div>
                <div className={classes.BalanceItem}>
                    <input defaultValue={deposited} type='number' onChange={e => setDeposited(e.target.value)} />
                    <p>Deposited</p>
                </div>
                <div className={classes.BalanceItem}>
                    <input defaultValue={earned} type='number' onChange={e => setEarned(e.target.value)} />
                    <p>Earned</p>
                </div>
                <div className={classes.BalanceItem}>
                    <input defaultValue={withdrawn} type='number' onChange={e => setWithdrawn(e.target.value)} />
                    <p>Withdrawn</p>
                </div>
            </div>
            <button onClick={handleUpdate}>Update Balance</button>
        </div>
    )

    return (
        <div>
            <Header />
            {loading ? <Loader /> : container }
        </div>
    )
}

export default UpdateBalance