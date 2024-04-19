'use client'
import React, { useEffect } from 'react'
import { WrapperAvatar, WrapperCategory, WrapperContainerImage, WrapperContainerProfile, WrapperContentProfile, WrapperDivImage, WrapperDivLeft, WrapperHeaderProfile, WrapperImage, WrapperInput, WrapperLabel, WrapperListStyle, WrapperTableTdInput, WrapperTableTdLabel, WrapperTableTr, WrapperTablediv, WrapperUploadFile } from './style';
import { Button, Col, DatePicker, Image, Radio, Row, Space, Upload, message } from 'antd';
import { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../Services/UserService'
import { useMutationHook } from '../../hooks/UseMutation';
import { updateUser } from '../../redux/sliders/userSlide';
import { UploadOutlined, UserOutlined, ProfileOutlined, BellOutlined, InfoOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const disPath = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState(user?.email)
    const [username, setUsername] = useState(user?.username)
    const [name, setName] = useState(user?.name)
    const [address, setAddress] = useState(user?.address)
    const [phone, setPhone] = useState(user.phone)
    const [date, setDate] = useState(new Date())
    const [Gender, setGender] = useState(user?.gender);
    const [avatar, setAvatar] = useState(user?.avatar);
    const [pending, setPending] = useState(false)
    const dateFormat = 'DD/MM/YYYY';
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, data, access_token)
        }
    )
    const GenderDefault = useState(user?.gender)
    const { data, isSuccess, isError } = mutation
    // console.log("data", data)
    useEffect(() => {
        if (isSuccess) {
            setPending(true)
            message.success("Cập nhật thành công thành công!")
            handleGetDetailUser(user?.id, user?.access_token)
            setPending(false)

        }
        if (isError) {
            message.error("Có lỗi xảy ra, hãy kiểm tra lại thông tin và thử lại sau!")
        }
    }, [isError, isSuccess])
    const handleGetDetailUser = async (idUser, token) => {
        const res = await UserService.getDetailUser(idUser, token)
        disPath(updateUser({ ...res?.data, access_token: token }))
    }
    const selectGender = (e) => {
        setGender(e.target.value)
    }
    const onChangeDate = (date, dateString) => {
        // console.log("date",date, dateString)
    };
    const handleUpdateUser = (e) => {
        // console.log("update", name, email, phone, address, date, avatar, Gender)
        console.log("gender", Gender)
        mutation.mutate({ id: user?.id, name, email, phone, address, date, Gender, avatar, access_token: user?.access_token })
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const onChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    useEffect(() => {
        setEmail(user?.email)
        setAddress(user?.address)
        setPhone(user?.phone)
        setDate(user?.date)
        setName(user?.name)
        setGender(user?.gender)
        setUsername(user?.username)
        setAvatar(user?.avatar)
    }, [user])
    const profileUser = () => {
        navigate('/profileuser')
    }
    console.log(mutation)
    return (
        <div style={{ backgroundColor: '#cccc' }}>

            <WrapperContainerProfile>
                <WrapperHeaderProfile>
                    Thông tin tài khoản
                </WrapperHeaderProfile>

                <WrapperContentProfile>
                    <Row>
                        <WrapperDivLeft span={5}>
                            <WrapperCategory onClick={profileUser} style={{ cursor: 'pointer' }}>
                                <UserOutlined style={{ color: 'blue' }} /> Tài khoản của tôi
                            </WrapperCategory>
                            <ul style={{ listStyleType: 'none', padding: '5px auto' }} >
                                <WrapperListStyle onClick={profileUser} style={{ cursor: 'pointer', color: 'rgb(238, 77, 45)' }} >Hồ sơ</WrapperListStyle>
                                <WrapperListStyle>Ngân hàng</WrapperListStyle>
                                <WrapperListStyle>Địa chỉ</WrapperListStyle>
                                <WrapperListStyle>Đổi mật khẩu</WrapperListStyle>
                                <WrapperListStyle>Cài đặt thông báo</WrapperListStyle>
                            </ul>
                            <WrapperCategory><ProfileOutlined style={{ color: 'blue' }} /> Đơn mua</WrapperCategory>
                            <WrapperCategory><BellOutlined style={{ color: 'red' }} /> Thông báo</WrapperCategory>
                            <WrapperCategory><InfoOutlined style={{ color: 'green' }} /> Thông tin</WrapperCategory>
                        </WrapperDivLeft>
                        <Col style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: '25px', backgroundColor: '#fff', borderRadius: '5px', overflow: 'hidden', borderBottom: '0.5px solid #ccc' }} span={18}>
                            <div style={{ fontSize: '1.2rem', padding: '5px 0 0 5px', marginBottom: '-10px' }}>
                                Quản lý thông tin hồ sơ để bảo mật tài khoản
                            </div>
                            <div style={{ display: 'flex', paddingTop: '1.875rem' }}>
                                <table width={"620px"} >
                                    <WrapperTableTr >
                                        <WrapperTableTdLabel  >
                                            <WrapperLabel htmlFor="">
                                                Tên đăng nhập
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput >
                                            <WrapperTablediv  >
                                                <WrapperInput disabled={true} value={username} type="text" />
                                            </WrapperTablediv>

                                        </WrapperTableTdInput>
                                    </WrapperTableTr>
                                    <WrapperTableTr>
                                        <WrapperTableTdLabel>
                                            <WrapperLabel htmlFor="">
                                                Tên
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput>
                                            <WrapperTablediv  >
                                                <WrapperInput onChange={onChangeName} value={name} type="text" />
                                            </WrapperTablediv>

                                        </WrapperTableTdInput>
                                    </WrapperTableTr>
                                    <WrapperTableTr>
                                        <WrapperTableTdLabel>
                                            <WrapperLabel htmlFor="">
                                                Email
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput>
                                            <WrapperTablediv  >
                                                <WrapperInput onChange={onChangeEmail} value={email} type="text" />
                                            </WrapperTablediv>
                                        </WrapperTableTdInput>
                                    </WrapperTableTr>
                                    <WrapperTableTr>
                                        <WrapperTableTdLabel>
                                            <WrapperLabel htmlFor="">
                                                Số điện thoại
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput>
                                            <WrapperTablediv  >
                                                <WrapperInput onChange={onChangePhone} value={phone} type="text" />
                                            </WrapperTablediv>
                                        </WrapperTableTdInput>
                                    </WrapperTableTr>
                                    <WrapperTableTr>
                                        <WrapperTableTdLabel>
                                            <WrapperLabel htmlFor="">
                                                Địa chỉ
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput>
                                            <WrapperTablediv  >
                                                <WrapperInput onChange={onChangeAddress} value={address} type="text" />
                                            </WrapperTablediv>
                                        </WrapperTableTdInput>
                                    </WrapperTableTr>
                                    <WrapperTableTr>
                                        <WrapperTableTdLabel>
                                            <WrapperLabel htmlFor="">
                                                Giới tính
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput style={{ textAlign: 'left' }}>
                                            <div>
                                                <input type="radio" name='gender' value="nam" />
                                                <span>nam</span>
                                            </div>
                                            <div>
                                                <input type="radio" name='gender' value="nu" />
                                                <span>nu</span>
                                            </div>
                                            <div>
                                                <input type="radio" name='gender' value="other" />
                                                <span>khac</span>
                                            </div>
                                        </WrapperTableTdInput>
                                    </WrapperTableTr>
                                    <WrapperTableTr>
                                        <WrapperTableTdLabel>
                                            <WrapperLabel htmlFor="">
                                                Ngày sinh
                                            </WrapperLabel>
                                        </WrapperTableTdLabel>
                                        <WrapperTableTdInput style={{ textAlign: 'left' }}>
                                            <Space direction="vertical">
                                                <DatePicker onChange={setDate} format={dateFormat} />
                                            </Space>
                                        </WrapperTableTdInput>
                                    </WrapperTableTr>

                                </table>
                                <WrapperDivImage >

                                    <WrapperAvatar >
                                        Ảnh đại diện
                                    </WrapperAvatar>
                                    <WrapperContainerImage>

                                        <WrapperImage preview={false} src={avatar} />
                                        <WrapperUploadFile maxCount={1} onChange={onChangeAvatar}>
                                            <Button style={{ marginTop: '18px' }} icon={<UploadOutlined />}>Chọn ảnh</Button>
                                        </WrapperUploadFile>
                                    </WrapperContainerImage>
                                </WrapperDivImage>
                            </div>
                            <div style={{ padding: '15px', display: 'flex', textAlign: 'center', justifyContent: 'center' }} >

                                <ButtonComponent textButton={'Lưu'}
                                    styleButton={{
                                        backgroundColor: '#ee4d2d',
                                        color: '#fff',
                                        width: '5.5rem',
                                        height: '40px',
                                        fontSize: '1.25rem',

                                    }}
                                    htmlType="submit"
                                    onClick={handleUpdateUser}
                                />
                            </div>
                        </Col>
                    </Row>
                </WrapperContentProfile>
            </WrapperContainerProfile >
        </div >
    )
}

export default ProfilePage;