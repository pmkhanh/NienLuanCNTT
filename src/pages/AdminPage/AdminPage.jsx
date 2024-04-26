import { AppstoreOutlined, ContainerOutlined, LineChartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminReport from '../../components/AdminReport/AdminReport';
import AdminUser from '../../components/AdminUser/AdminUser';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { getItem } from '../../utils';

export const AdminPage = () => {

    
    const items = [
        getItem('Quản lý người dùng', 'users', <UserOutlined />,),
        {
            type: 'divider',
        },
        getItem('Quản lý sản phẩm', 'products', <AppstoreOutlined />,),
        {
            type: 'divider',
        },
        getItem('Quản lý đơn hàng', 'orders', <ContainerOutlined />),
        {
            type: 'divider',
        },
   

    ];
    const rootSubmenuKeys = ['users', 'products', 'orders', 'reports']
    const [keySelected, setKeySelected] = useState('');
    const onClickMenu = ({ key }) => {
        setKeySelected(key)
    }
    const renderPage = (key) => {
        switch (key) {
            case '':
                return (
                    <AdminUser />
                )
            case 'users':
                return (
                    <AdminUser />
                )
            case 'products':
                return (
                    <AdminProduct />
                )
            case 'orders':
                return (
                    <AdminOrder/>
                )
            case 'reports':
                return (
                    <AdminReport />
                )
            default:
                return <></>
        }
    }
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={onClickMenu}
                    style={{
                        width: 256,
                        height: 'auto',
                        boxShadow: '1px 1px 2px #ccc'

                    }}
                    defaultSelectedKeys={'users'}
                    defaultOpenKeys={'users'}
                    mode="inline"
                    items={items}
                />
                <div style={{padding: '15px', width: '100%'}} >
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage;