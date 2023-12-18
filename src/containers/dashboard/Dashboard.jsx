import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//styles
import classes from './dashboard.module.css'

//components
import { Header, Loader, User } from '../../components';

//icons
import { FiSearch } from 'react-icons/fi';

//redux actions
import { fetch_data } from '../../redux/actions';

function Dashboard({openTransactions, updateBalance}) {
    //initialize
    const dispatch = useDispatch();

    //UI state
    const [searchQuery, setSearchQuery] = useState('');

    //redux state
    const users = useSelector(state => state.mainReducer.users)
    const loading = useSelector(state => state.mainReducer.loading)

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetch_data());
    }, []);

    let container = <p>Empty screen</p>
    if(users){
        container = (
            <div className={classes.container}>
                <div className={classes.searchbar}>
                    <div> <FiSearch size={20} /> </div>
                    <input placeholder='Search users' onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className={classes.mainContainer}>
                    {filteredUsers.map((i, idx) => (
                        <User
                            data={i}
                            key={idx}
                            openTransactions={() => openTransactions(i)}
                            updateBalance={() => updateBalance(i)}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            {loading ? <Loader /> : container}
        </div>
    )
}

export default Dashboard