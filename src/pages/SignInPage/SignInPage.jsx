import { GoogleLogin } from '@react-oauth/google';
import { Checkbox, Form, message } from 'antd';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../Services/UserService';
import logfb from '../../assets/images/logo_fb.png';
import logoSignIn from '../../assets/images/logo_signin.png';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { useMutationHook } from '../../hooks/UseMutation';
import { updateUser } from '../../redux/sliders/userSlide';
import { InputPassword, InputUsername, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperLogo, WrapperOr, WrapperTextOr } from './style';


const SignInPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation();
    const navigate = useNavigate()
    const disPath = useDispatch()
    const signUp = () => {
        navigate('/signup')
    }
    const mutation = useMutationHook(
        data => UserService.loginUser(data)
    )
    const mutationGG = useMutationHook(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation
    const { dataGG, isPendingGG, isSuccessGG, isErrorGG } = mutationGG
    const handleSignIn = () => {
        mutation.mutate({
            username,
            password
        })
    }
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success("Đăng nhập thành công!")
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            const token = data?.access_token
            if (token) {
                const decoded = jwtDecode(token)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, token)
                }
            }
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
        }
        if (data?.status === 'ERR') {
            message.error("Có lỗi xảy ra, hãy kiểm tra lại tài khoản và thử lại sau")
        }
    }, [isError, isSuccess])
    const handleGetDetailUser = async (idUser, token) => {
        console.log('token', token)
        const res = await UserService.getDetailUser(idUser, token)
        disPath(updateUser({ ...res?.data, access_token: token }))
    }
    const handleGetDetailUserGG = async (email, token) => {
        const res = await UserService.getDetailUser(email, token)
        disPath(updateUser({ ...res?.data, access_token: token }))
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const loginGG = () => {

    }
    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} >
            <WrapperContainer>
                <WrapperContainerLeft>
                    <h1>Đăng nhập</h1>
                    <div style={{ alignItems: 'center', textAlign: 'center' }} >
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                hasFeedback
                                rules={[
                                    {
                                        min: 8,
                                        required: true,
                                        message: 'Vui lòng nhập tài khoản!',
                                    },
                                ]}
                            >
                                <InputUsername type='text' value={username} onChange={onChangeUsername} allowClear placeholder="Tên tài khoản" style={{ marginBottom: '10px' }} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                hasFeedback
                                rules={[
                                    {
                                        min: 8,
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <InputPassword type='text' value={password} onChange={onChangePassword} allowClear placeholder="Mật khẩu" />
                            </Form.Item>
                            <Form.Item
                                valuePropName="checked"
                                style={{ textAlign: 'left', marginBottom: '15px' }}
                            >
                                <Checkbox>Ghi nhớ tôi</Checkbox>
                            </Form.Item>
                            <Form.Item

                            >
                                {data?.status == "ERR" && <span style={{ color: 'red' }} >{data?.message}</span>}
                                <Loading isPending={isPending}>
                                    <ButtonComponent textButton={'Đăng Nhập'}
                                        styleButton={{
                                            backgroundColor: '#ee4d2d',
                                            color: '#fff',
                                            width: '300px',
                                            height: '40px',
                                            fontSize: '1.25rem',

                                        }}
                                        htmlType="submit"
                                        disabled={!username.length || !password.length}
                                        onClick={handleSignIn}
                                    />
                                </Loading>
                            </Form.Item>

                        </Form>
                    </div>
                    <div>
                        <a href="">Quên mật khẩu?</a>

                    </div>

                    <div style={{ display: 'flex', marginTop: '27px' }}>
                        <WrapperOr />
                        <WrapperTextOr>hoặc</WrapperTextOr>
                        <WrapperOr />
                    </div>
                    <div style={{ display: 'flex', gap: '45px', justifyContent: 'center', marginTop: '20px' }} >
                        <WrapperLogo>
                            <img width={'33px'} height={'33px'} src={logfb} alt="Logo Facebook" />
                            <span> Facebook</span>
                        </WrapperLogo>
                        <div style={{}} >
                            <GoogleLogin
                                onSuccess={async credentialResponse => {
                                    const decoded = jwtDecode(credentialResponse?.credential);
                                    console.log('cre', decoded)
                                    localStorage.setItem('user', JSON.stringify({
                                        email: decoded?.email,
                                        name: decoded?.name,
                                        avatar: decoded?.picture
                                    }))
                                    disPath(updateUser({
                                        email: decoded?.email,
                                        name: decoded?.name,
                                        avatar: decoded?.picture,
                                        idAdmi: false
                                    }))
                                    message.success("Đăng nhập thành công")
                                    navigate('/')
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', color: '#ccc' }} >
                        <span>
                            Bạn chưa có tài khoản? <a onClick={signUp} style={{ cursor: 'pointer', color: 'rgb(238, 77, 45)' }}>Đăng ký</a>
                        </span>
                    </div>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <img width={'203'} height={'203'} src={logoSignIn} alt="" />
                    <p>Mua sắm tại cửa hàng <br />Siêu ưu đãi mỗi ngày</p>
                </WrapperContainerRight>
            </WrapperContainer>
        </div>
    )

}

export default SignInPage;