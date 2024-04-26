import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderService from '../../Services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHook } from '../../hooks/UseMutation';
import { Button, message } from 'antd';
import { WrapperHeaderItem, WrapperContainer, WrapperItemOrder, WrapperStatus, WrapperFooterItem, WrapperListOrder } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const MyOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderbyUser(state?.id, state?.access_token)
    return res.data
  }
  const user = useSelector((state) => state?.user)

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder })
  const { isPending, data } = queryOrder

  const handleDetailsOrder = (id) => {

    navigate(`/details-order/${id}`, {
      state: {
        access_token: state?.access_token
      }
    })
  }
  const mutation = useMutationHook(
    (data) => {
      const { id, token, orderItems, userId } = data
      const res = OrderService.cancelOrder(id, token, orderItems, userId)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success('Hủy đơn hàng thành công')
    } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    } else if (isErrorCancle) {
      message.error('Hủy thất bại, vui lòng thử lại sau')
    }
  }, [isErrorCancle, isSuccessCancel])
  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={order?.image}
          style={{
            width: '70px',
            height: '70px',
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
          marginLeft: '10px'
        }}>{order?.name}</div>
        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}> Số lượng: {order?.amount}</span>
        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{order?.price?.toLocaleString()}</span>
      </WrapperHeaderItem>
    })
  }
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <Loading isPending={isPending || isPendingCancel}>
        <WrapperContainer>
          <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', justifyContent: 'center', paddingTop: '7px' }} >Đơn hàng của tôi</h2>
            <WrapperListOrder>
              {data?.length > 0 ? (
                data?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?._id}>
                      <WrapperStatus>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái: </span>
                        <div>
                          <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                          <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</span>
                        </div>
                        <div>
                          <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                          <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                        </div>
                        <div>
                          <span style={{ color: 'rgb(255, 66, 78)' }}>Phí vận chuyển: </span>
                          <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{order?.shippingPrice?.toLocaleString()} VNĐ</span>
                        </div>
                      </WrapperStatus>
                      {renderProduct(order?.orderItems)}

                      <WrapperFooterItem>
                        <div>
                          <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                          <span
                            style={{ fontSize: '18px', color: 'rgb(56, 56, 61)', fontWeight: 600 }}
                          >{order?.totalPrice?.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <ButtonComponent
                            onClick={() => handleCanceOrder(order)}
                            size={40}
                            styleButton={{
                              height: '36px',
                              border: '1px solid #9255FD',
                              borderRadius: '4px'
                            }}
                            textButton={'Hủy đơn hàng'}
                            styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                          >
                          </ButtonComponent>
                          <ButtonComponent
                            onClick={() => handleDetailsOrder(order?._id)}
                            size={40}
                            styleButton={{
                              height: '36px',
                              border: '1px solid #9255FD',
                              borderRadius: '4px'
                            }}
                            textButton={'Xem chi tiết'}
                            styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                          >
                          </ButtonComponent>
                        </div>
                      </WrapperFooterItem>
                    </WrapperItemOrder>
                  )
                }
                )

              ) : (
                <div style={{fontSize: '20px', fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>Chưa có đơn hàng</div>
              )
              }
            </WrapperListOrder>
          </div>
        </WrapperContainer>
      </Loading>
    </div>
  )
}

export default MyOrderPage;