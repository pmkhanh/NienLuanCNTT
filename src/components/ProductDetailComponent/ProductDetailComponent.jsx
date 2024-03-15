import { Button, Col, Image, InputNumber, Radio, Rate, Row } from 'antd';
import React from 'react'
import thoitrang from '../../assets/images/thoitrang2.png'
import thoitrangsmall from '../../assets/images/thoitrangsmall.png'
import {
    TruckOutlined,
    ShoppingCartOutlined,
    PlusOutlined,
    MinusOutlined
} from '@ant-design/icons'
import { QuantityBox, StyleButtonCart, StyleButtonHover, WrapperColImg, WrapperImgSmalls, WrapperInfoProduct, WrapperOptionProduct, WrapperPolicyProduct, WrapperPriceNewProduct, WrapperPriceOldProduct, WrapperReportProduct } from './style';

const ProductDetailComponent = () => {
    const onChange = {};
    return (
        <div style={{ border: '2px solid blue' }} >
            <Row style={{ padding: '16px' }}>
                <Col span={10} >
                    <Image src={thoitrang} alt="Thoi Trang" preview={false} />
                    <Row style={{ justifyContent: 'center' }}>
                        <WrapperColImg span={5}>
                            <WrapperImgSmalls src={thoitrang} alt='Thoi trang' />
                        </WrapperColImg>
                        <WrapperColImg span={5}>
                            <WrapperImgSmalls src={thoitrangsmall} alt='Thoi trang small' />
                        </WrapperColImg>
                        <WrapperColImg span={5}>
                            <WrapperImgSmalls src={thoitrangsmall} alt='Thoi trang small' />
                        </WrapperColImg>
                        <WrapperColImg span={5}>
                            <WrapperImgSmalls src={thoitrangsmall} alt='Thoi trang small' />
                        </WrapperColImg>
                    </Row>
                </Col>
                <Col span={14}>
                    <WrapperInfoProduct>
                        <h1 >
                            Áo sơ mi nam Basic
                        </h1>
                        <div style={{ display: 'flex', gap: '5px' }} >
                            <WrapperReportProduct>
                                4.6 <Rate style={{ color: '#ee4d2d' }} allowHalf disabled defaultValue={4.5} />
                            </WrapperReportProduct>
                            <span style={{ fontSize: '20px' }}>
                                | 4.3K Đánh giá | 15.6K Đã bán
                            </span>
                        </div>
                        <div style={{ margin: '15px 0', backgroundColor: '#F2F1EB', padding: '15px 20px', borderRadius: '2px' }}>
                            <WrapperPriceOldProduct>
                                &#x20AB;250.000
                            </WrapperPriceOldProduct>
                            <WrapperPriceNewProduct>
                                &#x20AB;99.000
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
                                        Vận chuyển đến:    P. Long Hưng, Q. Ô Môn, TP. Cần Thơ
                                    </Row>
                                    <Row style={{ marginLeft: '32px', fontSize: '1.15rem' }}>
                                        Chi phí: 37.000 &#x20AB;
                                    </Row>
                                </div>
                            </WrapperOptionProduct>
                        </WrapperPolicyProduct>
                        <WrapperPolicyProduct>
                            <div>
                                Size:
                            </div>
                            <div style={{ marginLeft: '80px' }} >
                                <Radio.Group name="radiogroup" defaultValue={1}>
                                    <Radio value={1}>S</Radio>
                                    <Radio value={2}>L</Radio>
                                    <Radio value={3}>XL</Radio>
                                    <Radio value={4}>XXL</Radio>
                                </Radio.Group>
                            </div>
                        </WrapperPolicyProduct>
                        <WrapperPolicyProduct>
                            <div >
                                Số lượng:
                            </div>
                            <QuantityBox>
                                <Button  ><MinusOutlined /></Button>
                                <InputNumber style={{width: '20%'}} variant="outlined" defaultValue={1} onChange={onChange} />
                                <Button ><PlusOutlined /></Button>

                            </QuantityBox>
                        </WrapperPolicyProduct>
                    </WrapperInfoProduct>
                    <div>
                        <div style={{ textAlign: 'center', justifyContent: 'space-evenly' }} >
                            <StyleButtonCart
                                icon={<ShoppingCartOutlined style={{fontSize: '1.5rem'}} />}
                                textButton={" Thêm vào giỏ hàng"} type="outline" styleButton={{
                                    border: '1px solid #f53d2d',
                                    width: 'auto', height: '40px', borderRadius: '5px',
                                    backgroundColor: '#FF57221A',
                                    color: '#ee4d2d'
                                }
                                } />
                            <StyleButtonCart textButton={"Mua ngay"} type="outline" styleButton={{
                                border: '1px solid #f53d2d',
                                width: '120px', height: '40px', borderRadius: '5px',
                                backgroundColor: '#ee4d2d'
                            }
                            } />
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default ProductDetailComponent;