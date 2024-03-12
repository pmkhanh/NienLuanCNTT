import React from 'react'
import {PriceProduct, 
        StyleNameProduct, 
        StyleStateProuct, 
        WrapperCardStyle, 
        WrapperReportText 
        }  from './style';
import favorite from '../../assets/images/favorite.png'
import ThoiTrang from '../../assets/images/thoitrang2.png'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 220 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="ThoiTrang" src={ThoiTrang} />}
            >
            <img style={{
                position: 'absolute', 
                top: '15px', 
                left: '0', 
                width: '50px', 
                height: '20px',
                }} 
                    src={favorite} />
            <StyleNameProduct>Thời trang</StyleNameProduct>
            <StyleStateProuct>
                Đang bán chạy
            </StyleStateProuct>
            <WrapperReportText>
                <PriceProduct>
                    <span>
                        &#x20AB;
                    </span>
                    <span style={{fontSize: '1.25rem', marginLeft: '5px'}} >
                        49.000
                    </span>
                </PriceProduct>
                <span style={{color: 'rgba(0, 0, 0, .54118)', fontSize: '0.8rem', lineHeight: '2rem'}} >
                    Đã bán 111k
                </span>
            </WrapperReportText>
        </WrapperCardStyle>

    )
}

export default CardComponent;