import axios from 'axios';
import * as actionTypes from './actionTypes';
const dbUrl = 'https://incomebrokers-default-rtdb.firebaseio.com/';

export const fetch_data = () => {
    return dispatch => {
        dispatch(setLoading(true));
        console.log('hello orld')

        axios.get(dbUrl + 'users.json').then(r => {
            const data = r.data;
            const arr = [];
            Object.keys(data).map(i => {
                const item = {...data[i], userId: i};
                arr.unshift(item)
            })
            dispatch(setUsers(arr));
            dispatch(setLoading(false));
        }).catch(e => {
            // console.log(e);
            dispatch(setLoading(false));
        })
    };
};

export const updateTransaction = (data) => {
    return dispatch => {
        dispatch(setLoading(true));

        axios.put(dbUrl + '/users/' + data.userId + '.json', data).then(r => {
            console.log(r);
            // window.location.reload()
            dispatch(setLoading(false));
        }).catch(e => {
            console.log(e);
            dispatch(setLoading(false))
        })
    }
};

export const updateBalance = (data) => {
    return dispatch => {
        dispatch(setLoading(true));

        axios.put(dbUrl + '/users/' + data.userId + '.json', data).then(r => {
            console.log(r);
            window.location.reload()
            // dispatch(setLoading(false));
        }).catch(e => {
            console.log(e);
            dispatch(setLoading(false))
        })
    }
}

export const setUsers = (value) => {
    return{
        type: actionTypes.SETUSERS,
        value
    }
}

const setLoading = (value) => {
    return{
        type: actionTypes.SETLOADING,
        value
    }
};
