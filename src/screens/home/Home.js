import React, {Component} from 'react';
import Header from '../../common/header/Header';
import { Route, Link } from 'react-router-dom';
import Details from '../details/Details';
import * as Utils from "../../common/Utils";
import * as Constants from "../../common/Constants";
import RestaurantCard from './RestaurantCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";

const id = "123456";

const styles = {
    resCardWidth:{width:"90%"}    
};

class Home extends Component{ 
    
    constructor(){
        super();
        this.state = {
            imageData: []
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
                        imageData: JSON.parse(responseText)                    
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
                            imageData: JSON.parse(responseText)                    
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
                <Header baseUrl={this.props.baseUrl} searchRestaurantsByName = {this.searchRestaurantsByName}/>
                <Grid container spacing={3} style={{padding:"1% 2%"}}>
                    {
                        this.state.imageData.map((resItem,index) =>
                            <Grid item xs={12} sm={3} key={index}>
                                <RestaurantCard
                                    resURL = {resItem.restaurants[0].photo_URL}
                                    resName = {resItem.restaurants[0].restaurant_name}
                                    resFoodCategories = {resItem.restaurants[0].categories}
                                    resCustRating = {resItem.restaurants[0].customer_rating}
                                    resNumberCustRated = {resItem.restaurants[0].number_customers_rated}
                                    avgPrice = {resItem.restaurants[0].average_price}
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