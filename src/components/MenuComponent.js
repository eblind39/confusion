import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent';
 
class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
        console.log('Menu Component constructor is invoked.');
    }

    componentDidMount() {
        console.log('Menu Component componentDidMount method is invoked.');
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }

    render() {

        console.log('Menu Component render method is invoked.');

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                
                {/* Use the DishDetail Component to display the details of the selected dish */}
                <DishDetail dish={this.state.selectedDish} />
            </div>
        );
        
    }

}

export default Menu;