import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
 
function RenderMenuItem({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

// Another way to implement functional component
const Menu = (props) => {

    if (typeof props.dishes === "undefined") return(<div></div>);
    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    );
}




export default Menu;