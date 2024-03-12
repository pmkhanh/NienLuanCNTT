import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row } from 'antd'


const TypeProductpage = () => {
    return (
        < div style = {{ display: 'flex', marginTop: '30px', padding: '0 120px' }} >
                <div>
                    <NavbarComponent/>
                </div>
                <div  >
                <Row style={{gap: '20px', justifyContent: 'space-around', alignItems: 'center'}} >
                    <Col span={4}><CardComponent/></Col>
                    <Col span={4}><CardComponent/></Col>
                    <Col span={4}><CardComponent/></Col>
                    <Col span={4}><CardComponent/></Col>
                </Row>
                </div>
        </div > 
    )
}

export default TypeProductpage;