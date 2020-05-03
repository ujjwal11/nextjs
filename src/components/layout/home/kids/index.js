const Kids = props => {
  return (
    <section className="kids container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <img src="assets/img/kids.jpg" className="hide-on-mobile" alt="assets/img/errorimage.jpg" />
          <img src="assets/img/kids-M.jpg" className="show-on-mobile" alt="assets/img/errorimage.jpg" />
        </div>
      </div>
    </section>
  );
}

export default Kids;