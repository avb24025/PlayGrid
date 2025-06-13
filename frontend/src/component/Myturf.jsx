import react from 'react';
import { useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Owner from './Owner.turf';

function Myturf() {
    return(
        <>
        <Navbar />
        <Owner />
        <Footer />
        </>
    )
}

export default Myturf;