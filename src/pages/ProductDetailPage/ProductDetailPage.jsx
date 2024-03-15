import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

const ProductDetailPage = () => {
    return (
        <div style={{border: '2px solid red', padding: '5px 120px', backgroundColor: '#F0F0F0', height: '1000px'}} >
            <div style={{backgroundColor: '#fff'}}>
            <ProductDetailComponent/>
            </div>
        </div>
    )
}

export default ProductDetailPage;