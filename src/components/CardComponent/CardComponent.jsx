import React from 'react'
import {
    PriceProduct,
    StyleNameProduct,
    StyleStateProuct,
    WrapperCardStyle,
    WrapperHoverCard,
    WrapperReportText
} from './style';
import favorite from '../../assets/images/favorite.png'
import { useNavigate } from 'react-router-dom';

const CardComponent = (props) => {
    const navigate = useNavigate()

    const {
        id,
        countInStock,
        description,
        image,
        name,
        price,
        rating,
        type,
        status,
        sell
    } = props
    const handleDetailProduct = (id) => {
        navigate(`/productdetail/${id}`)
    }
    return (
        <WrapperHoverCard  >

            <WrapperCardStyle onClick={() => handleDetailProduct(id)}
                hoverable
                style={{ width: 220, height: 330, borderRadius: '10px', overflow: 'hidden' }}
                bodyStyle={{ padding: '10px' }}
                cover={<img alt={name} src={image} />}
            >
                <img style={{
                    position: 'absolute',
                    top: '15px',
                    left: '0',
                    width: '50px',
                    height: '20px',
                }}
                    src={favorite} />
                <StyleNameProduct>{name}</StyleNameProduct>
                {status === 'Đang bán chạy' ? (<StyleStateProuct>
                    {status}
                </StyleStateProuct>) : (<></>)}

                <WrapperReportText>
                    <PriceProduct>
                        <span>
                            &#x20AB;
                        </span>
                        <span style={{ fontSize: '1.25rem', marginLeft: '5px' }} >
                            {price?.toLocaleString()}
                        </span>
                    </PriceProduct>
                    <span style={{ color: 'rgba(0, 0, 0, .54118)', fontSize: '0.8rem', lineHeight: '2rem' }} >
                        Đã bán {sell}
                    </span>
                </WrapperReportText>
            </WrapperCardStyle>
        </WrapperHoverCard>

    )
}

export default CardComponent;