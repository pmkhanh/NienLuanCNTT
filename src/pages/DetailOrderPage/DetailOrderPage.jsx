import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
// import logo from '../../assets/images/logo.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../Services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Breadcrumb } from 'antd'

const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location
    const { id } = params

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.access_token)
        return res.data
    }

    const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder, enabled: !!id })
    const { isPending, data } = queryOrder

    const priceOrder = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [data])

    return (
        <div>
           
            <div style={{ width: '1270px', margin: '10px auto', background: '#FFF2E1' }}>
                <Loading isPending={isPending}>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }} >Chi tiết đơn hàng</h2>
                    <WrapperHeaderUser>
                        <WrapperInfoUser>
                            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                            <WrapperContentInfo>
                                <div className='name-info'>{data?.shippingAddress?.fullname}</div>
                                <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} `}</div>
                                <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                        <WrapperInfoUser>
                            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                            <WrapperContentInfo>
                                <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
                                <div className='delivery-fee'><span>Phí giao hàng: </span> {data?.shippingPrice}</div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                        <WrapperInfoUser>
                            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                            <WrapperContentInfo>
                                <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
                                <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                    </WrapperHeaderUser>
                    <WrapperStyleContent>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ width: '670px' }}>Sản phẩm</div>
                            <WrapperItemLabel>Giá</WrapperItemLabel>
                            <WrapperItemLabel>Số lượng</WrapperItemLabel>
                            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
                        </div>
                        {data?.orderItems?.map((order) => {
                            return (
                                <WrapperProduct>
                                    <WrapperNameProduct>
                                        <img src={order?.image}
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                border: '1px solid rgb(238, 238, 238)',
                                                padding: '2px'
                                            }}
                                        />
                                        <div style={{
                                            width: 260,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            marginLeft: '10px',
                                            height: '70px',
                                        }}>Điện thoại</div>
                                    </WrapperNameProduct>
                                    <WrapperItem>{order?.price?.toLocaleString()}</WrapperItem>
                                    <WrapperItem>{order?.amount}</WrapperItem>


                                </WrapperProduct>
                            )
                        })}

                        <WrapperAllPrice>
                            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                            <WrapperItem>{priceOrder?.toLocaleString()}</WrapperItem>
                        </WrapperAllPrice>
                        <WrapperAllPrice>
                            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                            <WrapperItem>{data?.shippingPrice?.toLocaleString()}</WrapperItem>
                        </WrapperAllPrice>
                        <WrapperAllPrice>
                            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                            <WrapperItem><WrapperItem>{data?.totalPrice?.toLocaleString()}</WrapperItem></WrapperItem>
                        </WrapperAllPrice>
                    </WrapperStyleContent>
                </Loading >
            </div>

        </div>

    )
}

export default DetailsOrderPage