import React, { Component } from 'react';
import { Card, CardImg, Media, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        /* get the selected dish information as props */
        super(props);
        /* Ensure we get the selected dish */
        console.log(props.dish);
    }

    renderComments(comments) {
        /* If the comments are null then return an empty <div> */
        if (comments == null)
            return (
                <div></div>
            );

        /* Iterate and format the corresponding comments for the selected dish. */
        const commentsFmt = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <Media tag="li">
                        <p>{comment.comment}</p>
                    </Media>
                    <Media tag="li">
                        <p>{'--' + comment.author + ', ' + comment.date}</p>
                    </Media>
                </div>
            );
        });

        return(
            <div>
                <h4>Comments</h4>
                {/* Use a Bootstrap list-unstyled to show the comments */}
                <Media list>{commentsFmt}</Media>
            </div>
        );
    }

    renderDish(dish) {
        /* If the dish is null then return an empty <div> */
        if (dish == null)
            return (
                <div></div>
            );

        return(

            <div className="row">
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                    <Card>
                        <CardImg className="100%" src={dish.image} alt={dish.name} />
                        <CardTitle className="bold-text">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </Card>
                </div>

                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>

        );
    }

    render() {

        return(
            <div>
                {this.renderDish(this.props.dish)}
            </div>
        );

    }
}

export default DishDetail;