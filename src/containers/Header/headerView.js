import React from 'react'
import Header from '../../components/layout/header'
import axios from 'axios';
import getAnime from "../../api/index"


class HeaderView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        }
    }

    render(){
      // console.log('this.state is here with graphql data',this.props)
        return (
          <React.Fragment>
            <Header data={this.props.navData}/>
          </React.Fragment>
        );
    }
}

export default HeaderView