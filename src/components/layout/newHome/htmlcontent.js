const HtmlContent = (props) => {
    if(props && props.htmlcontent && Object.keys(props.htmlcontent).length > 0){
        return(
            <div dangerouslySetInnerHTML={{__html: props.htmlcontent.htmlcontent.content}} />
        )
    }else{
        return (
            <React.Fragment />
        )
    }
}

export default HtmlContent