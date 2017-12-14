import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/index';
// import Favicon from 'react-favicon';
// import { PATH, ENV_HREF } from '../config';

let user = {};

export default class MainLayout extends React.Component {

    


    render() {
        // let url = `../assets/images/favicon.png`;
        return (
            <div className='container'>
               <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}