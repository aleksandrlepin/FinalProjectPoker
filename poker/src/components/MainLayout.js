import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/index';
import {storage, storageRef} from '../firebase';

export default class MainLayout extends React.Component {
    constructor(){
        super();
        this.state = {
            userpicUrl: '',
        }
    }

    // componentDidMount() {
    //     this.getUserpic();
    // }

    // componentDidUpdate() {
    //     this.getUserpic();
    // }

    getUserpic = () => {
        const that = this;
        const email = JSON.parse(localStorage.getItem('useremail'));
        const name = JSON.parse(localStorage.getItem('username'));
        storage.refFromURL(`gs://pokergoit.appspot.com/userpics/${email}/${name}`).getDownloadURL().then(function(url) {
            console.log('url', url);
            that.setState({userpicUrl: url})
        });
    }

    render() {
        return (
            <div className='wrapper'>
               {/* <Header /> */}
               <Header userpicUrl={this.state.userpicUrl} />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}
