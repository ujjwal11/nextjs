import Banner from './banner'
import HtmlContent from './htmlcontent'

const NewHome = (props) => {
    // console.log('props in index.js>>',props)
    if(props && props.newHomeData && Object.keys(props.newHomeData).length > 0){
            return(
                props.newHomeData.entries[0].main_section.map((s,i) => {
                    // console.log('asdasd>>',s)
                    if(Object.keys(s) == "banner"){
                        return(
                            <div className="row" key={i}>
                                <Banner key={i} banner={s && Object.keys(s).length > 0 ? s : {}}/>
                            </div>
                        )
                    }
                    else if(Object.keys(s) == "htmlcontent"){
                        return(
                            <div className="row" key={i}>
                                <HtmlContent key={i} htmlcontent={s && Object.keys(s).length > 0 ? s : {}}/>
                            </div> 
                        )
                    }
                })
            )
    }else{
        return(
            <React.Fragment />
        )
    }
}

export default NewHome