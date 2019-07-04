import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles = muiBaseTheme => ({
  card: {
    maxWidth: 250,
    minWidth: 250,
    maxHeight : 200,    
    margin: "auto",
    transition: "0.3s",
    boxShadow: "3px -3px 0px 6px rgba(255,0,102,1)",    
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

function TestCard( props ) {
    const classes = props.classes;
    const address = props.address;
    
  return (
    <div className="App">
      <Card className={classes.card} key={address.id}>
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {address.flat_building_name} {address.locality} <br />
            {address.city} <br />
            {address.state.state_name} <br />
            {address.pincode} <br />
          </Typography>          
          <Divider className={classes.divider} light />          
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(TestCard);


