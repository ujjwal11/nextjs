import FooterData from "../../components/layout/footerData"

const FooterDataView = (props) => {
	return (
		<FooterData FooterData={props.FooterData.entries} ctxQuery={props.ctxQuery}/>
	);
};

export default FooterDataView;