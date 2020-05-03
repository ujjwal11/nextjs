import FooterLink from '../../../components/layout/home/footerLinks'


const FooterData = (props) => {
  // console.log('asdasdasdas>', props)
  if(props.FooterData && props.FooterData.length > 0){
    return (
      props.FooterData.map((data,index) => (
        data.url == `/${props.ctxQuery.footerPage}` && data.title == "About US" ?
          <main role="main" className="container-p-3 mainDiv" key={index}>
            <div dangerouslySetInnerHTML={{ __html: data.main_section[0].htmlcontent.content }} />
            <FooterLink />
          </main>
        :
        data.url == `/${props.ctxQuery.footerPage}` && data.title == "Contact US" ?
            <main role="main" className="container-p-3 mainDiv" key={index}>
              <div dangerouslySetInnerHTML={{ __html: data.main_section[0].htmlcontent.content }} />
              <FooterLink />
            </main>
        :
        ''
      ))
    )
  }else{
    return(
      <React.Fragment>

      </React.Fragment>
    )
  }
};

export default FooterData;