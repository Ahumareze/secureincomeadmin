import React, { useState } from 'react'

//pages
import { Dashboard, Transactions, UpdateBalance } from './containers';

function App() {
  //UI state
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateBalance, setUpdateBalance] = useState(null)

  let container = <Dashboard openTransactions={e => setSelectedUser(e)} updateBalance={e => setUpdateBalance(e)} />

  if(selectedUser){
    container = <Transactions data={selectedUser} close={() => setSelectedUser(null)} />
  }else if(updateBalance){
    container = <UpdateBalance data={updateBalance} close={() => setUpdateBalance(null)} />
  }

  return (
    container
  );

}

export default App