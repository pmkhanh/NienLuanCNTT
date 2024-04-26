import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../Services/UserService';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import Loading from '../../components/LoadingComponent/Loading';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import StepComponent from '../../components/StepComponent/StepComponent';
import { useMutationHook } from '../../hooks/UseMutation';
import { minus, plus, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/sliders/orderSlide';
import { updateUser } from '../../redux/sliders/userSlide';
import { QuantityBox, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style';

const OrderPage = () => {
  const order = useSelector((state) => state?.order);
  const user = useSelector((state) => state?.user);
  const [listChecked, setListChecked] = useState([]);
  const [isModal, setIsModal] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      title: '0VNĐ',
      description: 'Chọn sản phẩm',

    },
    {
      title: '40K',
      description: 'Nhỏ hơn 200.000 VNĐ',
    },
    {
      title: '20K',
      description: 'Lớn hơn 200.000 VNĐ'
    },
  ];
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };


  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }

  // Tang giam so luong
  const handleChangeNum = (type, idProduct, limited) => {
    if (type === 'plus') {
      if (!limited ) {
        dispatch(plus({ idProduct }))
      }
    } else if (type === 'minus') {
      if (!limited) {
        dispatch(minus({ idProduct }))
      }
    }
  }
  // tong tien
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])
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

  // Mua hang 
  const [stateUserDetail, setStateUserDetail] = useState({
    phone: user?.phone,
    address: user?.address,
    name: user?.name,
  })
  const [form] = Form.useForm()


  const handleAddCard = () => {
    if (!user?.phone || !user?.address || !user?.name) {
      setIsModal(true)
    }
    else if (!order?.orderItemSelected?.length) {
      message.error("Vui lòng chọn sản phẩm")
    } else {
      navigate('/payment')
    }
  }
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

  const { isPending, data, isSuccess } = mutationUpdate


  const handleCancelUpdate = () => {
    setStateUserDetail({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
    })
    form.resetFields()
    setIsModal(false)
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

  const handleChangeAddress = () => {
    setIsModal(true)
  }

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Cập nhật thông tin thành công')
    }
    else if (data?.status === 'ERR') {
      message.error('Cập nhật thông tin thất bại')
    }
  }, [isSuccess, data])
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '5px auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <StepComponent current={priceShip===40000 ? 1 : priceShip===20000 ? 2 : 0} items={items} />
            </WrapperStyleHeader>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer', fontSize: '1.6rem', color: 'white', backgroundColor: '#FF6868', padding: '4px', borderRadius: '5px' }} onClick={handleRemoveAllOrder} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
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
                        <span style={{ fontSize: '15px', color: '#242424' }}>{order?.price.toLocaleString()}</span>
                      </span>

                      <QuantityBox>

                        <Button onClick={() => handleChangeNum('minus', order?.product, order?.amount === 1)}  ><MinusOutlined /></Button>
                        <InputNumber style={{ width: '15%', display: 'flex', textAlign: 'center' }} value={order?.amount} onChange={onChange} />
                        <Button onClick={() => handleChangeNum('plus', order?.product, order?.amount === order?.countInStock)} ><PlusOutlined /></Button>
                      </QuantityBox>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '15px', fontWeight: 'bold' }}>{(order?.price * order?.amount)?.toLocaleString()}</span>
                      <DeleteOutlined style={{ cursor: 'pointer', fontSize: '1.6rem', color: 'white', backgroundColor: '#FF6868', padding: '4px', borderRadius: '5px' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
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

            <ButtonComponent
              onClick={() => handleAddCard()}
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
              textButton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
            <ModalComponent title='Cập nhật thông tin người dùng' isOpen={isModal} onCancel={handleCancelUpdate} onOk={onOkUpdate} >
              <Loading isPending={isPending} >

                <Form
                  name="updateInfo"
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
              </Loading>

            </ModalComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  )
}

export default OrderPage;