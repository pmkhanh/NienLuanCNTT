import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Col, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../Services/UserService';
import { resetUser } from '../../redux/sliders/userSlide';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import Loading from '../LoadingComponent/Loading';
import { WrapperAccount, WrapperContentPopover, WrapperHeader, WrapperHeaderAccount, WrapperHeaderIcon, WrapperTextHeader } from './style';
import { searchProduct } from '../../redux/sliders/productSlide';
import logo from '../../assets/images/logo.png'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state?.user)
    const order = useSelector((state) => state?.order);
    const [peding, setPending] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [search, setSearch] = useState('');
    const homePage = () => {
        navigate('/')
    }
    const profileUser = () => {
        navigate('/profileuser')
    }
    const getOrder = () => {
        navigate('/myorder', {
            state: {
                id: user?.id,
                access_token: user?.access_token
            }
        })
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

    const searchText = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div >
            <WrapperHeader style={{ justifyContent: isHiddenCart && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5} >
                    <WrapperTextHeader onClick={homePage} style={{ cursor: 'pointer' }} >
                        <img style={{borderRadius: '50%', marginRight: '4px'}} width={'20%'} src={logo} alt="Logo" />
                        MK Shop
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && <Col style={{ gap: '10px', paddingRight: '10px' }} span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="Bạn tìm gì hôm nay ?"
                        textButton="Tìm kiếm"
                        enterButton
                        onChange={searchText}
                    />
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
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }} >

                            <WrapperHeaderIcon>
                                <Badge count={order?.orderItems?.length} size='small' >
                                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                </Badge>
                            </WrapperHeaderIcon>
                        </div>
                    )}

                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent;