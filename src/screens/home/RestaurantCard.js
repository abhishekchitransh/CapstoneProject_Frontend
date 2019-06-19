import React from 'react';
import "/RestaurantCard.css";
import * as Constants from "../../common/Constants";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const RestaurantCard = function(props){
    const image = props.image;
    const index = props.index;
    const classes = props.classes;
   
    return (
        <Card className={classes.restaurantCard} key={image.id}>
            
        </Card>
    )

}
