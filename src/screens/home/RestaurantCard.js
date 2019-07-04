import React from 'react';
import "./RestaurantCard.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const RestaurantCard = function(props){
    // const image = props.image;
    const index = props.index;
    const classes = props.classes;    
		
    return (
        <Card className={classes.resCardWidth} key={index}>			
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="160"
					image={props.resURL}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.resName}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{props.resFoodCategories}
					</Typography>
					<br />
					<Typography variant="body2" component="div">
						<div className="rating-main-contnr">
							<div className="rating-bg-color">
								<span><i className="fa fa-star"></i></span>
								<span> {props.resCustRating} ({props.resNumberCustRated})</span>
							</div>
							<div className="avg-price">
								{/* <span><i className="fa fa-rupee-sign"></i></span>
								<span> {props.avgPrice} for two</span> */}

								<span><i className="fa fa-rupee-sign"></i> {props.avgPrice} for two</span>                            
							</div>
						</div>
					</Typography>
				</CardContent>						
        </Card>
    )

}

export default RestaurantCard;
