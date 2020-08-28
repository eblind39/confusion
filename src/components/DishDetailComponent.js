import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
    /* If the dish is null then return an empty <div> */
    if (dish == null)
        return (
            <div></div>
        );

    return(

        <div className="row">
            {/* Dish section including the picture and name of the dish */}
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                <Card>
                    <CardImg className="100%" src={dish.image} alt={dish.name} />
                    <CardTitle className="bold-text">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
            </div>

            {/* Comments section with a dedicated function to render them. */}
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                <RenderComments comments={dish.comments} />
            </div>
        </div>

    );
}

function RenderComments({comments}) {
    /* If the comments are null then return an empty <div> */
    if (comments == null)
        return (
            <div></div>
        );

    /* Iterate and format the corresponding JSX for the comments. */
    const commentsFmt = comments.map((comment) => {
        return (
            <div key={comment.id}>
                <li>{comment.comment}</li>
                <li>{'--' + comment.author + ', ' + new Intl.DateTimeFormat('es-NI', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </div>
        );
    });

    return(
        <div>
            <h4>Comments</h4>
            {/* Use a Bootstrap list-unstyled to show the comments */}
            <ul className="list-unstyled">{commentsFmt}</ul>
        </div>
    );
}

const DishDetail = (props) => {
    if (typeof props.dish === "undefined") return <div></div>;
    return(
        <div className="container">
            <RenderDish dish={props.dish} />
        </div>
    );
}

export default DishDetail;