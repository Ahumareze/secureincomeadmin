import axios from 'axios';
import * as actionTypes from './actionTypes';
const dbUrl = 'https://incomebrokers-default-rtdb.firebaseio.com/';

export const setShowDrawer = (value) => {
    return{
        type: actionTypes.SETSHOWDRAWER,
        value
    }
};

export const fetch_data = () => {
    return dispatch => {
        dispatch(setLoading(true));

        const email = localStorage.getItem('@localEmail');

        axios.get(dbUrl + 'users.json').then(r => {
            //convert to array and map
            const data = r.data;
            Object.keys(data).map(i => {
                if(email === data[i].email){
                    const userId = i
                    const newUser = {...data[i], userId}
                    dispatch(setUserData(newUser));
                    dispatch(setLoading(false));
                }
            })
        }).catch(e => {
            console.log(e);
            dispatch(setLoading(false));
        })
    };
};

export const deposit = (amount, plan, coin, user) => {
    return dispatch => {
        dispatch(setDepositLoader(true))
        
        const date = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const transaction = {
            amount,
            plan,
            coin,
            type: 'deposit',
            status: 'pending',
            date
        };

        if(user.transactions){
            user.transactions.push(transaction);
            axios.put(dbUrl + 'users/' + user.userId + '.json', user).then(r => {
                console.log(r.data);
                dispatch(setDepositModal(true));
                dispatch(setDepositLoader(false))
            }).catch(e => {
                console.log(e);
                dispatch(setDepositLoader(false))
            })
        }else{
            const newUser = {
                ...user,
                transactions: []
            };
            newUser.transactions.push(transaction);
            axios.put(dbUrl + 'users/' + user.userId + '.json', newUser).then(r => {
                console.log(r.data);
                dispatch(setDepositModal(true));
                dispatch(setDepositLoader(false))
            }).catch(e => {
                console.log(e);
                dispatch(setDepositLoader(false))
            })
        }
        
    }
}

export const setUserData = (value) => {
    return{
        type: actionTypes.SETUSERDATA,
        value
    }
}

const setLoading = (value) => {
    return{
        type: actionTypes.SETLOADING,
        value
    }
};

const setDepositLoader = (value) => {
    return{
        type: actionTypes.SETDEPOSITLOADING,
        value
    }
};

const setDepositModal = (value) => {
    return{
        type: actionTypes.SETDEPOSITMODAL,
        value
    }
}
