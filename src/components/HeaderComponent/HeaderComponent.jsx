import React from 'react';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperHeaderIcon } from './style';
import { Col } from 'antd';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const navigate = useNavigate()
    const login = () => {
        navigate('/signin')
    }

    return (
        <div>
            <WrapperHeader>
                <Col span={5} ><WrapperTextHeader> Shop bán hàng</WrapperTextHeader> </Col>
                <Col style={{ gap: '10px', paddingRight: '10px' }} span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="Bạn tìm gì hôm nay ?"
                        textButton="Tìm kiếm"
                        //  onSearch={onSearch} 
                        enterButton /></Col>
                <Col span={6}>
                    <WrapperHeaderAccount>
                        <div style={{display: 'flex'}} >

                            <UserOutlined style={{ fontSize: '25px' }} />
                            <div onClick={login} style={{cursor: 'pointer'}} >
                                <span>Đăng nhập / Đăng ký</span>
                                <div>
                                    <span>Tài khoản <CaretDownOutlined /></span>
                                </div>
                            </div>
                        </div>
                        <WrapperHeaderIcon>
                            <ShoppingCartOutlined />
                        </WrapperHeaderIcon>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent;