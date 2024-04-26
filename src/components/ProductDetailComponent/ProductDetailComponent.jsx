import {
    MinusOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    StarFilled,
    TruckOutlined
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, Image, InputNumber, Radio, Row } from 'antd';
import numeral from 'numeral';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductService from '../../Services/ProductService';
import Loading from '../LoadingComponent/Loading';
import { QuantityBox, StyleButtonCart, WrapperColImg, WrapperImgSmalls, WrapperInfoProduct, WrapperInputNumber, WrapperOptionProduct, WrapperPolicyProduct, WrapperPriceNewProduct, WrapperPriceOldProduct, WrapperReportProduct } from './style';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/sliders/orderSlide';

const ProductDetailComponent = (idProduct) => {
    const [isPendingFetch, setisPendingFetch] = useState(false);
    const [numProduct, setNumProduct] = useState(1);
    const navigate = useNavigate();
    const locatin = useLocation();
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch()
    const fetchProductDetail = async (context) => {
        try {

            const id = context?.queryKey && context?.queryKey[1]?.idProduct
            setisPendingFetch(true)
            const res = await ProductService.getDetailProduct(id)
            if (res?.data != null) {
                setisPendingFetch(false)
                return res.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Không tìm thấy sản phẩm:", error.response.data);
            } else {
                console.error("Có lỗi trong khi lấy dữ liệu:", error);
            }
        }

    }
    const { isPending, data: productDetail } = useQuery({ queryKey: ['productDetail', idProduct], queryFn: fetchProductDetail, retry: 3, retryDelay: 1000, enabled: !!idProduct })
    const onChange = (e) => {
        setNumProduct(e.target.value)
    };
    const handleChangeNum = (type) => {
        if (type === 'plus') {
            if (numProduct >= productDetail?.countInStock) {
                setNumProduct(productDetail?.countInStock)
            } else {
                setNumProduct(numProduct + 1)
            }
        } else if (type === 'minus') {
            if (numProduct <= 1) {
                setNumProduct(1)
            } else {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const reanderStar = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled key={i} style={{ marginLeft: '3px' }} />);
        }
        return stars;
    };

    // Them vao gio hang
    const handleAddOrderPro = () => {
        if (!user.id) {
            navigate('/signin', { state: locatin?.pathname })
        } else if (user?.id) {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetail?.name,
                    amount: numProduct,
                    image: productDetail?.image,
                    price: productDetail?.price,
                    product: productDetail?._id,
                    countInStock: productDetail?.countInStock
                },
                shipAddress: {
                    fullname: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                },
            }))
        }
    }

    return (
        <div >
            <Loading isPending={isPending} >
                <Row style={{ padding: '16px' }}>
                    <Col span={8} >
                        <Image src={productDetail?.image} alt={productDetail?.name} style={{width: '400px', height: '400px'}}   preview={false} />
                        <Row style={{ justifyContent: 'center' }}>
                            <WrapperColImg span={4}>
                                <WrapperImgSmalls src={productDetail?.image} alt={productDetail?.name} />
                            </WrapperColImg>
                        </Row>
                    </Col>
                    <Col span={14}>
                        <WrapperInfoProduct>
                            <h1 >
                                {productDetail?.name}
                            </h1>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} >
                                <WrapperReportProduct>
                                    {productDetail?.rating > 0 ? (reanderStar(productDetail?.rating)) : 'Chưa có đánh giá'}
                                </WrapperReportProduct>
                                <span style={{ fontSize: '20px' }}>
                                    | 4.3K Đánh giá | {productDetail?.sell} Đã bán
                                </span>
                            </div>
                            <div style={{ margin: '15px 0', backgroundColor: '#F2F1EB', padding: '15px 20px', borderRadius: '2px' }}>
                                <WrapperPriceOldProduct>
                                    &#x20AB;250.000
                                </WrapperPriceOldProduct>
                                <WrapperPriceNewProduct style={{ display: 'flex', alignItems: 'center' }} >
                                    <p style={{ fontSize: '0.8em', marginTop: '10px' }}>&#x20AB;</p>{numeral(productDetail?.price).format('0,0').replace(/,/g, '.')}
                                </WrapperPriceNewProduct>
                            </div >
                            <WrapperPolicyProduct>
                                <div>
                                    Chính Sách Trả Hàng
                                </div>
                                <WrapperOptionProduct>
                                    Trả hàng trong 15 ngày ( Đổi ý miễn phí )
                                </WrapperOptionProduct>
                            </WrapperPolicyProduct>
                            <WrapperPolicyProduct>
                                <div>
                                    Vận Chuyển
                                </div>
                                <WrapperOptionProduct>
                                    <div>
                                        <Row style={{ fontSize: '1.15rem' }} >
                                            <TruckOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
                                            Vận chuyển đến: {user?.address ? user?.address : 'Địa chỉ chưa được cập nhật'}
                                        </Row>
                                        <Row style={{ marginLeft: '32px', fontSize: '1.15rem' }}>
                                            Chi phí: 37.000 &#x20AB;
                                        </Row>
                                    </div>
                                </WrapperOptionProduct>
                            </WrapperPolicyProduct>

                            <WrapperPolicyProduct>
                                <div >
                                    Số lượng:
                                </div>
                                <QuantityBox>
                                    <Button onClick={() => handleChangeNum('minus')}  ><MinusOutlined /></Button>
                                    <WrapperInputNumber style={{ width: '15%', display: 'flex', textAlign: 'center' }} value={numProduct} onChange={onChange} />
                                    <Button onClick={() => handleChangeNum('plus')} ><PlusOutlined /></Button>
                                    <div style={{ marginLeft: '8px' }} >Số lượng: {productDetail?.countInStock}</div>
                                </QuantityBox>
                            </WrapperPolicyProduct>
                        </WrapperInfoProduct>
                        <div>
                            <div style={{ textAlign: 'center', justifyContent: 'space-evenly' }} >
                                {productDetail?.countInStock === 0 ? (
                                    <StyleButtonCart
                                        disabled={true}
                                        icon={<ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />}
                                        textButton={"Sản phẩm đã hết"} type="outline" styleButton={{
                                            border: '1px solid #f53d2d',
                                            width: 'auto', height: '40px', borderRadius: '5px',
                                            backgroundColor: '#FF57221A',
                                            color: '#ee4d2d'
                                        }
                                        } />
                                ) : (
                                    <StyleButtonCart
                                        onClick={handleAddOrderPro}
                                        icon={<ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />}
                                        textButton={" Thêm vào giỏ hàng"} type="outline" styleButton={{
                                            border: '1px solid #f53d2d',
                                            width: 'auto', height: '40px', borderRadius: '5px',
                                            backgroundColor: '#FF57221A',
                                            color: '#ee4d2d'
                                        }
                                        } />
                                )}


                            </div>
                        </div>
                       

                    </Col>
                </Row>
            </Loading>

        </div>
    )
}

export default ProductDetailComponent;