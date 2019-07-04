import React, {Component} from 'react';
import Header from '../../common/header/Header';
import { Route, Link } from 'react-router-dom';
import Details from '../details/Details';
import * as Utils from "../../common/Utils";
import * as Constants from "../../common/Constants";
import RestaurantCard from './RestaurantCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";


const styles = {
    resCard:{width:"90%",cursor: "pointer"}    
};

class Home extends Component{ 
    
    constructor(){
        super();
        this.state = {
            imageData: [],
			data : []	
		}                
	}

    componentDidMount() {
        this.getAllImageData();				
    }

    getAllImageData = () => {        
        const requestUrl = this.props.baseUrl + "restaurant";		
        const that = this;		
        Utils.makeApiCall(
            requestUrl,
            null,
            null,
            Constants.ApiRequestTypeEnum.GET,
            null,
            responseText => {							
                that.setState(
                    {
                        imageData: JSON.parse(responseText).restaurants												
                    }					
                );
            },
            () => {}
        );        
    };

    searchRestaurantsByName = event => {        
        const searchValue = event.target.value;
        const requestUrl = this.props.baseUrl + "restaurant/name/" + searchValue;
        const that = this;
        if (!Utils.isEmpty(searchValue)) {
            Utils.makeApiCall(
                requestUrl,
                null,
                null,
                Constants.ApiRequestTypeEnum.GET,
                null,
                responseText => {					
                    that.setState(
                        {
                            imageData: JSON.parse(responseText).restaurants                    
                        }						
                    );
                },
                () => {}
            );
        } else {
            this.getAllImageData();
        }
    };  

    render() {
        const { classes } = this.props;
        return(
            <div>                
                <Header baseUrl={this.props.baseUrl} searchRestaurantsByName = {this.searchRestaurantsByName} showSearch="true" />
					<Grid container spacing={3} style={{padding:"1% 2%"}}>
                    {						
                        this.state.imageData.map((resItem,index) =>
                            <Grid item xs={12} sm={3} key={index}>
                                <RestaurantCard
                                    resId = {resItem.id}
                                    resURL = {resItem.photo_URL}
                                    resName = {resItem.restaurant_name}
                                    resFoodCategories = {resItem.categories}
                                    resCustRating = {resItem.customer_rating}
                                    resNumberCustRated = {resItem.number_customers_rated}
                                    avgPrice = {resItem.average_price}
                                    classes = {classes}
                                    index = {index}
                                />
                            </Grid>
                        )
                    }
					</Grid>
                <div>
                    <h1>Users</h1>
                    <strong>select a user</strong>
                    <ul>
                    <li>
                        <Link to="/restaurant/1">User 1 </Link>
                    </li>
                    <li>
                        <Link to="/restaurant/2">User 2 </Link>
                    </li>
                    <li>
                        <Link to="/restaurant/3">User 3 </Link>
                    </li>
                    </ul>
                    <Route path="/restaurant/:id" component={Details} />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);