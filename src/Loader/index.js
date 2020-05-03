import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = (props) => {
    const color = [
            {"type" : "grow", "color" : "primary"},
            {"type" : "grow", "color" : "secondary"},
            {"type" : "grow", "color" : "success"},
            {"type" : "grow", "color" : "danger"},
            {"type" : "grow", "color" : "warning"},
            {"type" : "grow", "color" : "info"},
            {"type" : "grow", "color" : "light"},
            {"type" : "grow", "color" : "dark"},
    ]
    return (
        <div style={{marginTop : "60px", marginLeft : "37%"}}>
            {
                color.map((color, index) => {
                    return (
                        <Spinner type={color.type} color={color.color} key={index}/>
                    )
                })
            }
        </div>
    );
}

export default Loader
