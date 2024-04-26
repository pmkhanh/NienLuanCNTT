import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const ProductDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    return (
        <div style={{ padding: '5px 120px', backgroundColor: '#F0F0F0', height: '1000px' }} >
            <Breadcrumb
            linkHoverColor="rgba(0, 0, 0, 0.88)"
            separator=">"
                items={[
                    {
                        title: <a href="/">Trang chủ</a>,
                        
                    },
                    {
                        title: 'Chi tiết sản phẩm',
                    },
                ]}
            />
            <div style={{ backgroundColor: '#fff' }}>
                <div style={{ padding: '5px' }} >
                    <h2 style={{ textAlign: 'center', marginTop: '20px' }} ><strong>Chi tiết sản phẩm</strong></h2>
                </div>
                <ProductDetailComponent idProduct={id} />
            </div>
        </div>
    )
}

export default ProductDetailPage;