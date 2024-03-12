import { Image } from 'antd';
import React from 'react'
import km from '../../assets/images/KM.png'
import ship from '../../assets/images/ship.png'



const IncentivesComponent = () => {
    return (
        <div>
        <Image style={{marginBottom: '15px'}} src={km} alt='Khuyến mãi' />
        <Image src={ship} alt='Ship'/>
        </div>
    )
}

export default IncentivesComponent;