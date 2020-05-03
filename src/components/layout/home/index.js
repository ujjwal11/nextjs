import React from 'react'
import HeroBanner from "./heroBanner"
import BestSeller from "./bestSeller"
import Kids from "./kids"
import FooterLinks from "./footerLinks"

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state={
          data : this.props.data
        }
        // console.log('here is the props',this.props.data)
    }
    

  render() {
    const { data } = this.state
    return (
      <main role="main" className="container-p-3 mainDiv">
        <HeroBanner />
        <BestSeller data={data}/>
        <Kids />
        <FooterLinks />
      </main>
    );
  }
}

export default Home