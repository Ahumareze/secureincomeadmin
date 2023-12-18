import React from 'react';

//styles
import classes from './header.module.css';

function Header() {
    return (
        <div className={classes.container}>
            <p>Secure Income <span>Admin</span></p>
        </div>
    )
};

export default Header