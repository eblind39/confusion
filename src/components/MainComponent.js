import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutUsComponent';
import ContactUs from './ContactUsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../data/dishes';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
        };
    }

    render () {

        const HomePage = () => {
            return (
                <Home />
            );
        }
        
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path="/contactus" component={ContactUs} />
                    <Route exact path="/menu" component={() => <Menu dishes={ this.state.dishes } /> } />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
