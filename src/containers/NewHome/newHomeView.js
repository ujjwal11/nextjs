import NewHome from '../../components/layout/newHome'

const NewHomeView = (props) => {
    return(
        <NewHome newHomeData={props.newHomeData && Object.keys(props.newHomeData).length > 0 ? props.newHomeData : {}}/>
    )
}

export default NewHomeView