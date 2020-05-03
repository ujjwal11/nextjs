const Banner = (props) => {
    console.log('props for the banner>>>', props)
    if (props && props.banner && Object.keys(props.banner).length > 0) {
        return (
            props.banner.banner.banner[0].images.map((s,i) => (
                <div className="" key={i}>
                    <img src={s.image.href} />
                </div>
            ))
        )
    } else {
        return (
            <React.Fragment />
        )
    }
}

export default Banner