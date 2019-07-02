import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import "./Details.css";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import restaurantData from "./restaurantData";
import ItemList from "./ItemList.js";
import Cart from "./Cart.js";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Grade from '@material-ui/icons/Grade'
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  image:{
    width:260,
    height:220
  }

});
class Details extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      total: 0,
      categories:[]
    };
   
  }

  componentDidMount(){
    let newState = this.state;
    let { categories } = restaurantData;
    categories.map(function(cat){
    newState.categories.push(cat.category_name+" ")
  })
  this.setState(newState)
  }

  addItem = (item, id) => {
    console.log(item);

    this.state.data.push({
      id: id,
      name: item.item_name,
      type: item.item_type,
      price: item.price
    });
    this.state.total += item.price;
    this.setState(this.state);
  };
  handleTotalHandler = price => {
    this.setState({
      total: this.state.total + price
    });
    console.log(this.state.total);
  };

  checkoutHandler = () =>{
    localStorage.setItem("orders",JSON.stringify(this.state.data));
    localStorage.setItem("OrderDataTotal", this.state.total);
  }


  render() {
    let that = this;
    const { classes } = this.props;
    let { categories } = restaurantData;
  
    let items = this.state.data.map(function(item, index) {
      return (
        <Cart
          key={index}
          name={item.name}
          price={item.price}
          type={item.type}
          handleTotal={that.handleTotalHandler}
        />
      );
    });
    //console.log(categories);
    let catId = 0;

    return (
      <div>
        <div className="up-container">
          <div className='img-container'>
            <img className={classes.image} src={restaurantData.photo_URL}></img>
          </div>
          <div className='info-container'>
              <div className='res-name'>
                <h3>{restaurantData.restaurant_name}</h3>
              </div>
              <div className='address-container'>
                <p>{restaurantData.address.locality}</p>
              </div>
              <div className='catagory-container'>
                <p>{this.state.categories}</p>
          </div>
              <div className='avg-rating-price'>
                <div className='avg-rating'>
                  <div>
                    <Grade/>
                    <span className='rating'>{restaurantData.customer_rating}</span>
                  </div>
                  <div>AVERAGE RATING BY {restaurantData.number_customers_rated} CUSTOMERS</div>
                </div>
                <div className='avg-price'>
                <div>
                  <span>&#8377; {restaurantData.average_price}</span>
                </div>
                <div>AVERAGE COST FOR TWO PEOPLE</div>
                </div>
              </div>
            </div>
          </div>
        <div className="flex-container">
          <div className="left-container">
            <Grid item xs={12}>
              <div className={classes.demo}>
                {categories.map((val, index) => {
                  catId += 1;
                  return (
                    <List key={"item" + index}>
                      <Typography className={classes.title}>
                        {val.category_name}
                      </Typography>
                      <hr />
                      <ItemList
                        addItem={this.addItem}
                        items={val.item_list}
                        id={"item" + catId + index}
                      />
                    </List>
                  );
                })}
              </div>
            </Grid>
          </div>
          <div className="right-container">
            <Grid item xs={12}>
              <div>
                <Card>
                  <CardHeader
                    avatar={
                      <IconButton aria-label="4 pending messages">
                        <Badge
                          badgeContent={this.state.data.length}
                          color="primary"
                        >
                          <ShoppingCart />
                        </Badge>
                      </IconButton>
                    }
                    title={<h2>My cart</h2>}
                  />
                  {this.state.data.length === 0 && <span>Cart is empty</span>}
                  {items}
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        Total Amount
                      </Grid>
                      <Grid item xs />
                      <Grid item xs>
                        <span>&#8377;</span>
                        {this.state.total}
                      </Grid>
                    </Grid>
                      <Grid container>
                        <Button variant="contained"
                            color="primary"
                            size="large"
                            fullWidth="true"
                            aria-label="Large contained secondary button group"
                            onClick={this.checkoutHandler}
                            component={AdapterLink} to="/checkout">CHECKOUT
                        </Button>
                      </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Details);
