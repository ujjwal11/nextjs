
const Spotlight = props => {
  // console.log('props.homeData',props.homeData)
    const {bestSeller} = props.homeData
    return (
      <section className="best-seller">
        <h1>Best Sellers</h1>
        {
          bestSeller.map((data, i) => {
            return(
              <figure key={i}>
              <img
                src={data.sourceImage}
                alt="assets/img/errorimage.jpg"
              />
              <figcaption>
                <a href="#">{data.t_shirtType}</a>
                <p>
                  <del>&#36;{data.discountedPrice}</del> &#8208; &#36;{data.finalPrice}
                </p>
              </figcaption>
            </figure>
            )
          })
        }
      </section>
    );
}

export default Spotlight;