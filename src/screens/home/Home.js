import React, {Component} from 'react';
import Header from '../../common/header/Header';
import { Route, Link } from 'react-router-dom';
import Details from '../details/Details';


const id = "123456";

class Home extends Component{    
    render() {
        return(
            <div>
                <Header baseUrl={this.props.baseUrl}/>
                 Home                 
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

export default Home;