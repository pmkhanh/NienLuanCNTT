import React, { useEffect, useState } from 'react'
import { InputPassword, InputUsername, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperLogo, WrapperOr, WrapperTextOr } from './style';
import logoSignIn from '../../assets/images/logo_signin.png'
import logfb from '../../assets/images/logo_fb.png'
import logogg from '../../assets/images/logo_gg.png'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../Services/UserService'
import { useMutationHook } from '../../hooks/UseMutation'
import Loading from '../../components/LoadingComponent/Loading';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/sliders/userSlide';



const SignInPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const disPath = useDispatch()
    const signUp = () => {
        navigate('/signup')
    }
    const mutation = useMutationHook(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation
    const handleSignIn = () => {
        mutation.mutate({
            username,
            password
        })

    }
    useEffect(() => {
        if(isSuccess){
            message.success("Đăng nhập thành công!")
            navigate('/')
            localStorage.setItem('access_token',JSON.stringify(data?.access_token))
            const token = data?.access_token
            // console.log(token)
            if(token){
                const decoded = jwtDecode(token)
                // console.log("decode", decoded)
                if(decoded?.id) {
                    handleGetDetailUser(decoded?.id, token)
                }
            }
        }
        if(isError){
            message.error("Có lỗi xảy ra, hãy kiểm tra lại tài khoản và thử lại sau")
        }
    },[isError, isSuccess])
    const handleGetDetailUser = async (idUser, token) => {
        const res = await UserService.getDetailUser(idUser, token)
        disPath(updateUser({...res?.data, access_token: token}))
    }
    // console.log("mutation", mutation)
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
                        <WrapperLogo>
                            <img width={'23px'} height={'23px'} src={logogg} alt="Logo Google" />
                            <span>  Google</span>
                        </WrapperLogo>
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