import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    users: [],
};

const mainReducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.SETLOADING):
            return {...state, loading: action.value};
        case(actionTypes.SETUSERS):
            return {...state, users: action.value};
    }
    return state;
};

export default mainReducer