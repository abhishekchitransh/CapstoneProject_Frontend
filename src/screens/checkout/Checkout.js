import React, { Component } from "react";
import Header from "../../common/header/Header";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import * as Utils from '../../common/Utils';
import * as Constants from '../../common/Constants';

import { withStyles } from "@material-ui/core/styles";
import { border } from '@material-ui/system';


//Stepper
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

//Tabs
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { FormControl, InputLabel, Input, Select, AppBar } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';

import SummaryCard from './SummaryCard';
import CustomerAddress from './CustomerAddress';

import { getCountry } from '../../common/dataServices';

const styles = muiBaseTheme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: muiBaseTheme.spacing(),
    marginRight: muiBaseTheme.spacing()
  },
  actionsContainer: {
    marginBottom: muiBaseTheme.spacing(2)
  },
  resetContainer: {
    padding: muiBaseTheme.spacing(3)
  },
  connector: {
    display: "none"
  },
  step: {
    marginBottom: muiBaseTheme.spacing(5)
  },
  iconContainer: {
    transform: "scale(2)",
    marginRight: muiBaseTheme.spacing(5)
  },
  formControl:{
      width:"90%",
      minWidth:120
  },
  saveAddressButton:{
      display:"block",
      marginTop:30
  },
  summaryCard:{
    marginLeft:"-10px;"
  },
  divider:{
    marginTop:"10px",
    marginBottom:"10px",
    marginLeft:"auto"
  } 
});

const access_token = "eyJraWQiOiI5ZmIzNDkyOC1hYTkzLTQ1ZjAtOTVhNi0wYzg5YjNkZmQ1MmQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIzNzU2ZDRjYy0wODZmLTQxZWEtYWE5Mi02OTBjZDFkNWFmNzIiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU2MTkyNSwiaWF0IjoxNTYxODk2fQ.28egiqghFsWqlcyH8QWbU9-JsP-fioXXwslVfelHoCmJyo95mFVb9PHgmdRVTrTqizPOIYwk3hscvdrXM-gikw";
const req_header = {
  "Accept": "application/json;charset=UTF-8",
  "authorization": "Bearer " +  access_token,
  "Access-Control-Allow-Origin" : "*",
  "Content-Type": "application/json" 
}

const cust_address = [ { "id": "7b3fe6a4-6add-428f-8ba4-7428497270eb", "flat_building_name": "a-509", "locality": "BKC", "city": "bandra", "pincode": "400020", "state": { "id": "c860e78a-a29b-11e8-9a3a-720006ceb890", "state_name": "Maharashtra" } }, { "id": "cf38c624-4145-4a17-a15b-c4dc49fdeb73", "flat_building_name": "c-509", "locality": "Gopal Nager", "city": "worli", "pincode": "400018", "state": { "id": "c860e78a-a29b-11e8-9a3a-720006ceb890", "state_name": "Maharashtra" } } ]

function TabContainer(props) {
    return (
        <Typography component={'div'} variant={'body2'} style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function getSteps() {
  return ["Delivery", "Payment"];
}

const baseURL = "http://localhost:8080/api/";

class Checkout extends Component {    
    constructor(){
        super();
        this.state = {            
            value:0, 
            activeStep : 0,
            data:getCountry(), 
            dataAddress:[],           
            selected:'IN',
            dataPayments:[],
            paymentMethod:[],
            dataStates:[]
        };
    }
    renderOptions() {
        return this.state.data.map((dt, i) => {         
          return (
              <MenuItem
                label="Select a country"
                value={dt.country_code}
               key={i} name={dt.country_name}>{dt.country_name}</MenuItem>
            
          );
        });
    }
      getAddresses(baseURL, access_token){      
      let data = null   
      let xhrAddresses = new XMLHttpRequest();
      let that = this;
      xhrAddresses.addEventListener("readystatechange", function () {  
          if (this.readyState === 4) {                                      
                let address = JSON.parse(xhrAddresses.response); 
                that.setState({dataAddress: address["addresses"]});
                
          }
      })
      xhrAddresses.open("GET", baseURL + "address/customer");
      xhrAddresses.setRequestHeader("Authorization", "Bearer " + access_token); //sessionStorage.getItem('access-token')
      xhrAddresses.setRequestHeader("Content-Type", "application/json");
      xhrAddresses.setRequestHeader("Cache-Control", "no-cache");
      xhrAddresses.setRequestHeader("Access-Control-Allow-Origin", "*");  
      xhrAddresses.send(data);
    }
    getStates(){
      const url = baseURL + 'states'
      const that = this;

      Utils.makeApiCall(
        url, 
        null,
        null,
        Constants.ApiRequestTypeEnum.GET,
        null,
        responseText => {
          that.setState({
            dataStates : JSON.parse(responseText).states
          })
          }
        )
    }
    getPaymentMethods(){
      const url = baseURL + 'payment'
      const that = this;
    
      Utils.makeApiCall(
        url, 
        null,
        null,
        Constants.ApiRequestTypeEnum.GET,
        req_header,
        responseText => {
          that.setState({
            dataPayments : JSON.parse(responseText).paymentMethods
          })
          }
        )
    }
    onStateChange = (event) => {
        this.setState({selected:event.target.value})
    };

    componentDidMount(){
      this.getAddresses(baseURL, access_token);
      this.getPaymentMethods();
      this.getStates();
    }

    handleChange = (event) => {
      this.setState({paymentMethod:event.target.value})
    }

    getStepContent= (step) => { 
      console.log(this.state.dataStates);       
        switch (step) {
          case 0:
            return (
                <div>
                    <AppBar position={"static"}>
                    <Tabs className={this.props.tabs} value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Existing Address" />
                        <Tab label="New Address" />
                    </Tabs>
                    </AppBar>
                    {this.state.value === 0 && 
                        <TabContainer>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          className={this.props.root}
                          >
                            <Grid container spacing={10}>
                              {
                                this.state.dataAddress.map((val, idx) => ( 
                                  <Grid item xs={4} key={val.id}>
                                    <CustomerAddress address={val} key={val.id + "_" + idx} />                                 
                                  </Grid>                                       
                              ))            
                              }
                          </Grid>
                        </Grid>
                        </TabContainer>
                    },
                    {this.state.value === 1 && 
                        <TabContainer>
                            <div className="login">                            
                                <FormControl required className={this.props.formControl}>
                                    <InputLabel htmlFor="FltBldNo">Flat/Build No.</InputLabel>
                                    <Input 
                                        id="FlatBldNo"
                                        type="text"
                                    />
                                </FormControl><br/><br />
                                <FormControl required className={this.props.formControl}>
                                    <InputLabel htmlFor="Locality">Locality</InputLabel>
                                    <Input 
                                        id="Locality"
                                        type="text"
                                    />
                                </FormControl><br/><br/>
                                <FormControl required className={this.props.formControl}>
                                    <InputLabel htmlFor="city">City</InputLabel>
                                    <Input 
                                        id="City"
                                        type="text"
                                    />
                                </FormControl><br/><br/>                                
                                <FormControl required className={this.props.formControl}>
                                    <InputLabel htmlFor="State" shrink>State</InputLabel>
                                    <Select 
                                        value={this.state.selected}
                                        onChange={this.onStateChange}                                        
                                        input={<Input name="state" id="state" />} 
                                        style={{width:'200px'}} 
                                        placeholder="Select State"                                      
                                        >
                                            <MenuItem selected value="0">
                                                Select State
                                            </MenuItem>                                   
                                            {this.state.dataStates.map((state,i) => (                                                
                                            <MenuItem key={"state_" + state.id + "_" + i} value={state.state_name}>
                                                {state.state_name}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                </FormControl><br/><br/>
                                <FormControl required className={this.props.formControl}>
                                    <InputLabel htmlFor="Pincode">Pin Code</InputLabel>
                                    <Input 
                                        id="Pincode"
                                        type="text"
                                    />
                                </FormControl><br/><br/>
                                <Button variant="contained" color="primary" onClick={this.addressClickHandler} className={this.props.formControl}>
                                  SAVE ADDRESS
                                </Button>                                                        
                            </div>
                        </TabContainer>
                    }
                </div>
              );
          case 1:
            return (
              <div>
               <FormControl component="fieldset" className={this.props.formControl}>
               <FormLabel component="legend">Select Mode of Payment</FormLabel>
               <RadioGroup
                  aria-label="Payment Method"
                  name="payment"
                  className={this.props.group}
                  value={this.state.paymentMethod}
                  onChange={this.handleChange}
                >
              {this.state.dataPayments.map((val, index) => (                
                <FormControlLabel value={val.payment_name} control={<Radio />} label={val.payment_name} key={index}/>                
              ))}
              </RadioGroup>
              </FormControl>
              </div>
            )
          default:
            return "Unknown step";
        }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: this.state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: this.state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  tabChangeHandler = (event, value) => {
    this.setState({value})
  };

  searchRestaurantsByName = event => {        
    const searchValue = event.target.value;    
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;        
    return (
      <div>
        <Header showSearch = {false} searchRestaurantsByName = {this.searchRestaurantsByName}/>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(label => {
                  return (
                    <Step key={label} className={classes.step}>
                      <StepLabel classes={{iconContainer: classes.iconContainer}}>
                        <Typography component={'div'} variant={"h5"}>
                          {label}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography component={'div'}>{this.getStepContent(activeStep)}</Typography>
                        <div>
                            <div>
                            <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                            </div>
                        </div>               
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>                                    
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard className={classes.summaryCard}
            key="test"
            index="1"
            classes={classes}    
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}


Checkout.propTypes = {
    classes: PropTypes.object,
  };
export default withStyles(styles)(Checkout);
