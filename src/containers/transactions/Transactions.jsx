import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//styles
import classes from  './transactions.module.css';

//components
import { Header, Loader } from '../../components';
import Item from './components/Item';
import { FiArrowLeft } from 'react-icons/fi';
//images
import emptyfolder from '../../assets/empty-folder.png';
import { updateTransaction } from '../../redux/actions';


function Transactions({data, close}) {
    //initialize
    const dispatch = useDispatch();

    //redux state
    const loading = useSelector(state => state.mainReducer.loading);

    const updateHandler = (e, id) => {
        const newUser = {...data};

        newUser.transactions[id].status = e;

        dispatch(updateTransaction(newUser))

    }

    let container = (
        <div className={classes.empty_transactions}>
            <div>
                <img src={emptyfolder} alt='emptyfolder' />
                <p className={classes.empty_transactions_title}>No Transactions Yet</p>
                <p className={classes.empty_transactions_details}>No transaction has been performed on this account yet</p>
            </div>
        </div>
    );
    if(data.transactions){
        container = (
            <div className={classes.mainContainer}>
                {data.transactions.map((i, idx) => (
                    <Item
                        data={i}
                        updateStatus={e => updateHandler(e, idx)}
                        key={idx}
                    />
                ))}
            </div>
        )
    };

    return (
        <div>
            <Header />
            <div className={classes.container}>
                <div className={classes.back} onClick={close}> <FiArrowLeft /> Back to dashboard </div>
                <h2>{data.name} - transaction history</h2>
                {loading ? <Loader /> : container}
            </div>
        </div>
    )
}

export default Transactions