import React from 'react';
import {Link} from 'react-router-dom'

function LogoImage(props) {

    return <Link to={`${process.env.PUBLIC_URL}/products`} >
                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.logo}`} style={{height:150+'px',width:150 +'px'}} alt="" className="img-fluid" />
            </Link>;
}

export default LogoImage;