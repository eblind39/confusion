import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutUsComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../data/dishes';
import { COMMENTS } from '../data/comments';
import { LEADERS } from '../data/leaders';
import { PROMOTIONS } from '../data/promotions';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS,
        };
    }

    render () {

        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
                      promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                      leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/menu" component={() => <Menu dishes={ this.state.dishes } /> } />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
