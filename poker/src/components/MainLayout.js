import React from 'react';
// import Favicon from 'react-favicon';
// import { PATH, ENV_HREF } from '../config';


export default class MainLayout extends React.Component {

    

    render() {
        // let url = `../assets/images/favicon.png`;
        return (
            <div>
               
                {this.props.children}
            </div>
        )
    }
}