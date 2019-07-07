import React , {Component} from 'react';
import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';


class Cart extends Component {


    constructor(props) {
        super(props);
        this.state = {
          qty: 1
        };
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
       
      }
    
    add() {
        if(this.state.qty>=1){
        this.setState({
          qty: this.state.qty + 1
    });
      console.log(this.props);
      this.props.handleTotal(this.props.price, this.props.name, this.state.qty);
      }
    }
    
      subtract(event) {
        if(this.state.qty>1){
        this.setState({
          qty: this.state.qty - 1
        });
        if(this.state.qty===1){
          this.props.handlePop(event.target.id);
        }
        this.props.handleTotal(-this.props.price, this.props.name, this.state.qty);
      }
    } 


    render(){
        return(
            <div>
                      <CardContent style={{padding:10, height:20}} key={this.props.id}>
                        <Grid container spacing={1}>
                          <Grid item xs={1}>
                          {
                            this.props.type === "VEG" ?
                          <ListItemAvatar style={{ color: "#008000" }}>
                                 <FiberManualRecord />
                           </ListItemAvatar>:
                          <ListItemAvatar style={{ color: "#b20505" }}>
                                <FiberManualRecord />
                          </ListItemAvatar>
                          }
                        </Grid>
                        
                        <Grid item xs={3}>
                          <span>{this.props.name}</span>
                        </Grid> 
                        <Grid item xs style={{margin:-10}}>

                        <button type='button' onClick={this.add} className='addSub'> 
                             +
                        </button>
                        {this.state.qty}
                          <button type='button' id={this.props.ID} onClick={this.subtract} className='addSub'>
                             -
                          </button>
                        </Grid>
                        <Grid style={{marginLeft:8}} item xs={4}>      
                            <span>&#8377;</span>{this.props.price}
                        </Grid>
                        </Grid>
                    </CardContent>
                
                   
            </div>
        )
    }
}
export default Cart;