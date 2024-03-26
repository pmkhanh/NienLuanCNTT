import React, { useState } from 'react'
import { InputPassword, InputUsername, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperLogo, WrapperOr, WrapperTextOr } from './style';
import logoSignIn from '../../assets/images/logo_signin.png'
import logfb from '../../assets/images/logo_fb.png'
import logogg from '../../assets/images/logo_gg.png'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';



const SignInPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const signUp = () => {
        navigate('/signup')
    }
    const handleSignIn = ()=> {
        console.log("sign in", username, password)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangeUsername = (e)=> {
        setUsername(e.target.value)
    }
    const onChangePassword = (e)=> {
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
                                <InputUsername type='text' value={username} onChange={onChangeUsername}  allowClear placeholder="Email/Số điện thoại" style={{ marginBottom: '10px' }} />
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
                                style={{textAlign: 'left'}}
                            >
                                <Checkbox>Ghi nhớ tôi</Checkbox>
                            </Form.Item>
                            <Form.Item
                              
                            >
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