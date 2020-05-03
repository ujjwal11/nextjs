import React from 'react'
import Home from "../../components/layout/home"

class HomeView extends React.Component{
    constructor(props){
        super(props);

        this.state={}
        // console.log('here is the props',this.props)
    }
    

    render() {
        return (
          <Home data={this.props.data.homeData}/>
        );
    }
}

export default HomeView