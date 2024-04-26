import { Button, InputNumber } from "antd";
import React from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import orderContant from '../../contant';
import { QuantityBox } from '../OrderPage/style';
import { Lable, WrapperContainer, WrapperInfo, WrapperItemOrder, WrapperStyleHeader, WrapperValue } from "./style";


const OrderSuccessPage = () => {
  const order = useSelector((state) => state?.order)
  const user = useSelector((state) => state?.user)
  const navigate = useNavigate()

  const location = useLocation();
  const { state } = location
  const goToHome = () => {
    navigate('/')
  }


  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Đơn hàng đã đặt thành công</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperContainer >
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]} </span>

                  Giao hàng nhanh
                </WrapperValue>

              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>
                <WrapperValue >
                  <span > {orderContant.payment[state?.payment]} : <span style={{color: 'red', fontWeight: 600, fontSize: '1.3rem'}} >{state?.priceTotal?.toLocaleString()} VND</span> </span>
                  
                </WrapperValue>
                

              </div>
            </WrapperInfo>
          </WrapperContainer>

        </div>

        <WrapperInfo>
        <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px', textAlign: 'c' }}>
                Tên sản phẩm
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
              </div>
            </WrapperStyleHeader>
          {state?.orders?.map((order) => {
            return(
              <WrapperItemOrder>
                <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>{order?.name}</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>
                    <span style={{ fontSize: '18px', color: '#242424' }}>{order?.price?.toLocaleString()}</span>
                  </span>
                  <span style={{ fontSize: '18px', color: '#242424' }}>
                    {order?.amount}
                  </span>
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '18px', fontWeight: 'bold' }}>{(order?.price * order?.amount)?.toLocaleString()}</span>
                </div>
              </WrapperItemOrder>
            )
          }
          )}

        </WrapperInfo>
        <div style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', marginTop: '10px', padding: '10px'}} >
          <Button onClick={goToHome} style={{ backgroundColor: 'ButtonFace', fontSize: '16px', fontWeight: 500}} >
            Trở về trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage;