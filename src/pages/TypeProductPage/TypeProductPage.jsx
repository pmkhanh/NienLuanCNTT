import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Pagination } from 'antd'
import { WrapperTypeProduct } from './style'


const TypeProductpage = () => {
    return (
        <div>
            < div style={{ display: 'flex', marginTop: '30px', padding: '0 120px' }} >
                <div>
                    <NavbarComponent />
                </div>
                <WrapperTypeProduct  >
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperTypeProduct>
            </div>
            <div style={{textAlign: 'center', marginTop: '22px'}} >
            <Pagination defaultCurrent={1} total={100} />;
            </div>
        </div>
    )
}

export default TypeProductpage;