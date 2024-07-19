import React from 'react';
import {
    Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText, Button
} from "reactstrap";
import { Link } from "react-router-dom";

export const ItemCard = ({ id, image, title, subtitle, text }) => (
    <Card>
        <CardImg top src={image} alt={title} />
        <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardSubtitle>{subtitle}</CardSubtitle>
            <CardText>{text}</CardText>
            <Button color="Yellow">
                <Link to={`/itempage/${id}`}>View Product</Link>
            </Button>
        </CardBody>
    </Card>
);
