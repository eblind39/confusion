import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Nav, NavItem, Button, Col, Row, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'

const maxLength = (len) => (val) => !(val) ||  (val.length <= len);
const minLength = (len) => (val) => val &&  (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil fa-lg"></span> Submit Comment
                        </Button>
                    </NavItem>
                </Nav>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select 
                                        model=".rating" 
                                        name="rating" 
                                        className="form-control-select" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author" 
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger" 
                                        model=".author" 
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea 
                                        model=".comment" 
                                        id="comment" 
                                        name="comment" 
                                        placeholder="Comment" 
                                        className="form-control" 
                                        rows="6" 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={ {size:10, offset:2} }>
                                    <Button type="submit" color="primary">Send</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

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

function RenderComments({comments, addComment, dishId}) {
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
            <CommentForm 
                dishId={dishId}
                addComment={addComment}
            />
        </div>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (typeof props.dish === "undefined") {
                return <div></div>;
    }
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
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;