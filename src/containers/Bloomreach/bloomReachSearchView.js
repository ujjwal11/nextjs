import React from 'react'
import BoomReach from '../../components/layout/bloomReach'

class BloomReachSearchView extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isOpen : [false, false, false, false, false, false, false],
        }
    }

    toggle = (e, index) => {
        const {isOpen} = this.state    
        isOpen[index] = !isOpen[index];
        this.setState({ isOpen: isOpen });
    }

    render(){
        return(
            <BoomReach bloomSearchData={this.props.searchData} toggle={this.toggle} isOpen={this.state.isOpen}/>
        )
    }
}

export default BloomReachSearchView