import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../Services/UserService';
import { resetUser } from '../../redux/sliders/userSlide';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import Loading from '../LoadingComponent/Loading';
import { WrapperAccount, WrapperContentPopover, WrapperHeader, WrapperHeaderAccount, WrapperHeaderIcon, WrapperTextHeader } from './style';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [peding, setPending] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const homePage = () => {
        navigate('/')
    }
    const profileUser = () => {
        navigate('/profileuser')
    }
    const getOrder = () => {
        navigate('')
    }
    const system = () => {
        navigate('/system/admin')
    }
    const logout = async () => {
        setPending(true)
        await UserService.logout()
        dispatch(resetUser())
        navigate('/signin')
        setPending(false)
    }
    useEffect(() => {
        setName(user?.name)
        setAvatar(user?.avatar)
    }, [user?.name, user?.avatar])
    const content = (
        <div>
            <WrapperContentPopover onClick={profileUser} >Tài khoản của tôi</WrapperContentPopover>
            <WrapperContentPopover onClick={getOrder}  >Đơn mua</WrapperContentPopover>
            {user?.isAdmin && (<WrapperContentPopover onClick={system}  >Quản lý hệ thống</WrapperContentPopover>)}
            <WrapperContentPopover onClick={logout} >Đăng xuất</WrapperContentPopover>
        </div>
    );

    const login = () => {
        navigate('/signin')
    }
    // console.log("user", user)
    return (
        <div >
            <WrapperHeader style={{justifyContent: isHiddenCart && isHiddenSearch ? 'space-between' : 'unset'}}>
                <Col span={5} ><WrapperTextHeader onClick={homePage} style={{ cursor: 'pointer' }} > Shop bán hàng</WrapperTextHeader> </Col>
                {!isHiddenSearch && <Col style={{ gap: '10px', paddingRight: '10px' }} span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="Bạn tìm gì hôm nay ?"
                        textButton="Tìm kiếm"
                        //  onSearch={onSearch}
                        enterButton />
                </Col>}

                <Col span={6} style={{ display: 'flex' }}>
                    <WrapperAccount>
                        <Loading isPending={peding}>
                            <WrapperHeaderAccount>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    {avatar ? (
                                        <img style={{ width: '45px', borderRadius: '50%' }} src={avatar} alt="Avatar" />
                                    ) : (<UserOutlined style={{ fontSize: '25px' }} />)}

                                    {user?.username ? (
                                        <div style={{ cursor: 'pointer', marginTop: '5px', marginLeft: '9px' }}>

                                            <Popover placement="bottom" content={content}>
                                                {user?.name || user.username}
                                            </Popover>
                                        </div>
                                    ) : (
                                        <div onClick={login} style={{ cursor: 'pointer' }} >
                                            <span>Đăng nhập / Đăng ký</span>
                                            <div>
                                                <span>Tài khoản <CaretDownOutlined /></span>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </WrapperHeaderAccount>
                        </Loading>
                    </WrapperAccount>
                    {!isHiddenCart && <WrapperHeaderIcon>
                        <ShoppingCartOutlined />
                    </WrapperHeaderIcon>}

                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent;