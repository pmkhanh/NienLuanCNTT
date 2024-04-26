import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, message } from "antd";
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as OrderServive from '../../Services/OrderService';
import * as UserService from '../../Services/UserService';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHook } from "../../hooks/UseMutation";
import { removeAllOrderProduct } from "../../redux/sliders/orderSlide";
import { updateUser } from "../../redux/sliders/userSlide";
import Loading from '../../components/LoadingComponent/Loading'
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from "../PaymentPage/style";
import { PayPalButton } from 'react-paypal-button-v2';
import * as PaymentService from '../../Services/PaymentService'


const PaymentPage = () => {
  const order = useSelector((state) => state?.order)
  const user = useSelector((state) => state?.user)

  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const navigate = useNavigate()
  const [sdkReady, setSdkReady] = useState(false)

  const [isModal, setIsModal] = useState(false)
  const [stateUserDetail, setStateUserDetail] = useState({
    phone: user?.phone,
    address: user?.address,
    name: user?.name,
  })
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  // Cap nhat thong tin
  const mutationUpdate = useMutationHook(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )
  const { isPendingUpDate, dataUpdate, isSuccessUpdate } = mutationUpdate

  const handleCancelUpdate = () => {
    setStateUserDetail({
      name: stateUserDetail?.name,
      address: stateUserDetail?.address,
      phone: stateUserDetail?.phone,
    })
    form.resetFields()
    setIsModal(false)
  }
  const handleChangeAddress = () => {
    setIsModal(true)
  }
  const onOkUpdate = () => {
    const { name, address, phone } = stateUserDetail
    if (name && address && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetail }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, phone }))
          setIsModal(false)
        }
      })
    }
  }

  const handleChangeInfo = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    form.setFieldsValue(stateUserDetail)
  }, [form, stateUserDetail])
  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === 'OK') {
      message.success('Cập nhật thông tin thành công')
    }
    else if (dataUpdate?.status === 'ERR') {
      message.error('Cập nhật thông tin thất bại')
    }
  }, [isSuccessUpdate, mutationUpdate])


  const priceOrder = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result;
  }, [order])
  const priceShip = useMemo(() => {
    if (priceOrder > 200000) {
      return 20000;
    } else if (priceOrder > 0 && priceOrder < 200000) {
      return 40000;
    } else {
      return 0;
    }
  }, [priceOrder])
  const priceTotal = useMemo(() => {
    return Number(priceOrder + priceShip)
  }, [priceOrder, priceShip])

  // tao don hang
  const handleAddOrder = () => {
    if (user?.access_token
      && order?.orderItemSelected
      && user?.name
      && user?.address
      && user?.phone
      && priceOrder
      && user?.id) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemSelected,
          fullname: user?.name,
          address: user?.address,
          phone: user?.phone,
          paymentMethod: payment,
          itemsPrice: priceOrder,
          shippingPrice: priceShip,
          totalPrice: priceTotal,
          user: user?.id,
          email: user?.email
        }
      )
    }
  }

  const mutationAddOrder = useMutationHook(
    (data) => {
      const {
        id,
        token,
        ...rests
      } = data
      const res = OrderServive.createOrder(
        user?.id,
        { ...rests },
        token,
      )
      return res
    },
  )

  const { data: dataAdd, isPending: isPendingAddOrder, isSuccess, isError } = mutationAddOrder
  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemSelected?.forEach(element => {
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
      message.success('Đặt hàng thành công')
      navigate('/ordersuccess', {
        state: {
          delivery,
          payment: true,
          orders: order?.orderItemSelected,
          priceTotal: priceTotal
        }
      })
    } else if (isError) {
      message.error('Có lỗi xảy ra, vui lòng kiểm tra lại')
    }
  }, [isSuccess, isError])



  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemSelected,
        fullname: user?.name,
        address: user?.address,
        phone: user?.phone,
        paymentMethod: payment,
        itemsPrice: priceOrder,
        shippingPrice: priceShip,
        totalPrice: priceOrder,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
        email: user?.email
      }
    )
  }



  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    script.async = true;
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!window.paypal) {
    addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [])


  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <Loading isPending={isPendingAddOrder}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Thanh toán</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng nhanh</Radio>
                    <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>

                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                    <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: '100%' }}>
                <WrapperInfo>
                  <span style={{ fontSize: '12px' }} >Thông tin đơn hàng:</span>
                  <div style={{ fontSize: '15px' }} >{user?.name + " - " + user?.phone}</div>
                  <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {user?.address}
                    <Button onClick={handleChangeAddress}
                      style={{ padding: '1px', width: '15%' }} ><EditOutlined /></Button>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Tạm tính</span>
                    <span style={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>{priceOrder?.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Phí giao hàng</span>
                    <span style={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>{(priceShip)?.toLocaleString()}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{priceTotal?.toLocaleString()} VND</span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === 'paypal' && sdkReady ? (
                <PayPalButton
                  amount="0.01"
                  onSuccess={onSuccessPaypal}
                  onError={() => {
                    alert("Thanh toán thất bại, vui lòng thử lại sau")
                  }}
                />
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                    background: '#0E46A3',
                    height: '48px',
                    width: '220px',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '18px',

                  }}
                  textButton='Mua hàng'
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonComponent>
              )}

            </WrapperRight>
          </div>
        </div>
        <ModalComponent title='Cập nhật thông tin vận chuyển' isOpen={isModal} onCancel={handleCancelUpdate} onOk={onOkUpdate} >
          <Form
            name="updateInfoShip"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên người nhận"

            >
              <Input required value={stateUserDetail?.name} type='text' onChange={handleChangeInfo} name='name' />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"


            >
              <Input required value={stateUserDetail['phone']} type='text' onChange={handleChangeInfo} name="phone" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"

            >
              <Input required value={stateUserDetail?.address} type='text' onChange={handleChangeInfo} name='address' />
            </Form.Item>
          </Form>
        </ModalComponent>
      </Loading>
    </div>
  )
}

export default PaymentPage;