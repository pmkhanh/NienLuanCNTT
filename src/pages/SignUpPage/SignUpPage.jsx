import React, { useState } from 'react'
import { InputPassword, InputUsername, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperLogo, WrapperOr, WrapperTextOr } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import logoSignIn from '../../assets/images/logo_signin.png'
import logfb from '../../assets/images/logo_fb.png'
import logogg from '../../assets/images/logo_gg.png'
import { useNavigate } from 'react-router-dom';
import { Form, Checkbox } from 'antd';

const SignUpPage = () => {
    const navigate = useNavigate()
    const signIn = () => {
        navigate('/signin')
    }

    const handleSignUp = () => {
        console.log("sign up", username, password, conPassword)
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

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
    const onChangeConPass = (e) => {
        setConPassword(e.target.value)
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} >
                <WrapperContainer>
                    <WrapperContainerLeft>
                        <h1>Đăng ký</h1>
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
                                style={{ marginBottom: '15px' }}
                                name="username"
                                hasFeedback
                                rules={[
                                    {
                                        min: 8,
                                        required: true,
                                        message: 'Vui lòng kiểm tra lại tên tài khoản, ít nhất 8 kí tự',
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
                                        message: 'Mật khẩu ít nhât 8 kí tự',
                                    },
                                ]}
                            >
                                <InputPassword type='text' value={password} onChange={onChangePassword} allowClear placeholder="Mật khẩu" />
                            </Form.Item>
                            <Form.Item
                                name="confirmpassword"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        min: 8,
                                        required: true,
                                        message: 'Mật khẩu ít nhất 8 kí tự',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập không khớp'));
                                        },
                                    }),
                                ]}
                            >
                                <InputPassword type='text' value={conPassword} onChange={onChangeConPass} allowClear placeholder="Nhập lại mật khẩu" />
                            </Form.Item>

                            <Form.Item
                                style={{ textAlign: 'center' }}
                            >
                                <ButtonComponent textButton={'Đăng Ký'}
                                    styleButton={{
                                        backgroundColor: '#ee4d2d',
                                        color: '#fff',
                                        width: '300px',
                                        height: '40px',
                                        fontSize: '1.25rem',

                                    }}
                                    htmlType="submit"
                                    onClick={handleSignUp}
                                    disabled={!username.length || !password.length || !conPassword.length}
                                />
                            </Form.Item>

                        </Form>

                        <div style={{ display: 'flex', marginTop: '30px' }}>
                            <WrapperOr />
                            <WrapperTextOr>hoặc</WrapperTextOr>
                            <WrapperOr />
                        </div>
                        <div style={{ display: 'flex', gap: '45px', justifyContent: 'center', marginTop: '23px' }} >
                            <WrapperLogo>
                                <img width={'33px'} height={'33px'} src={logfb} alt="Logo Facebook" />
                                <span> Facebook</span>
                            </WrapperLogo>
                            <WrapperLogo>
                                <img width={'23px'} height={'23px'} src={logogg} alt="Logo Google" />
                                <span> Google</span>
                            </WrapperLogo>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', color: '#ccc' }} >
                            <span>
                                Bạn đã có tài khoản! <a onClick={signIn} style={{ cursor: 'pointer', color: 'rgb(238, 77, 45)' }}>Đăng nhập</a>
                            </span>
                        </div>
                    </WrapperContainerLeft>
                    <WrapperContainerRight>
                        <img width={'203'} height={'203'} src={logoSignIn} alt="" />
                        <p>Mua sắm tại cửa hàng <br />Siêu ưu đãi mỗi ngày</p>
                    </WrapperContainerRight>
                </WrapperContainer>
            </div>
        </div>
    )
}

export default SignUpPage;