import React from 'react';
import MegaNav from '../../components/layout/megaNav'
import _ from 'lodash';

const MegaNavView = props => {
        return (
            <MegaNav data={props.navData}/>
        );
    
}

export default MegaNavView