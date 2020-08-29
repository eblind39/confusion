import React from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    /* If the dish is null then return an empty <div> */
    if (dish == null)
        return (
            <div></div>
        );

    return(

        <div>
            {/* Dish section including the picture and name of the dish */}
            <Card>
                <CardImg className="100%" src={dish.image} alt={dish.name} />
                <CardTitle className="bold-text">{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </Card>
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
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/menu'>menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;