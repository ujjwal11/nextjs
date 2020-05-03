import Router from 'next/router'

const HeroBanner = props => {

  const newHomePage = (e) => {
    Router.push('/newHome')
  }
  // console.log('here is the props',props)
	{/* <BreadCrumb display={props.breadcrumb} /> */}
  return (
    <section >
      <p className="shipping-msg">
        FREE SHIPPING ON ORDERS OVER $20
      </p>
      <div className="redBox col-sm-12 ">
      
        <h3>Markdowns on everything</h3>
        <p className="black-text">All your favorite brands at fantastic prices</p>
        {/* <a href="#" className="btn my-2 kk" title="">SHOP ALL BRANDS</a> */}
        
        <button type="button" className="btn my-2 text-uppercase" onClick={e => newHomePage(e)}>shop all brands</button>
        </div>
    </section>
  );
}

export default HeroBanner