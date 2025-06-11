import react from 'react';
import { useEffect, useState, useContext } from 'react';
import Listform from './List.form';
import Navbar from './Navbar';
import Footer from './Footer';
import Userlist from './User.List';
import { AuthContext } from '../context/AuthContext';

function List(){
    const { user } = useContext(AuthContext);
    return(
        <>
<Navbar />
{user && user.role=="user"?(<Userlist/>):(<Listform />)}
<Footer />
        </>
    )
}

export default List;