import React, { useEffect, useState } from 'react'
import { InputPassword, InputUsername, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperLogo, WrapperOr, WrapperTextOr } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import logoSignIn from '../../assets/images/logo_signin.png'
import logfb from '../../assets/images/logo_fb.png'
import logogg from '../../assets/images/logo_gg.png'
import { useNavigate } from 'react-router-dom';
import { Form, Checkbox, message } from 'antd';
import * as UserService from '../../Services/UserService'
import { useMutationHook } from '../../hooks/UseMutation';
import Loading from '../../components/LoadingComponent/Loading';
import * as Messsage from '../../components/MessageComponent/MessageComponent'

const SignUpPage = () => {
    const navigate = useNavigate()
    const signIn = () => {
        navigate('/signin')
    }

    const mutation = useMutationHook(
        data => UserService.signUpUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation
    const handleSignUp = () => {
        mutation.mutate({
            username,
            password,
            confirmpassword,
            phone
        })
    }
    useEffect(() => {
        if (isSuccess) {
            message.success("Đăng ký tài khoản thành công!")
            signIn()
        }
        if (isError) {
            message.error("Có lỗi xảy ra, hãy kiểm tra và thử lại sau!")
        }

    }, [isSuccess, isError])
    console.log("mutation", mutation)
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')


    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeConPass = (e) => {
        setconfirmpassword(e.target.value)
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
                                name="phone"
                                hasFeedback
                                rules={[
                                    {
                                        min: 10,
                                        max: 10,
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
                                    },
                                ]}
                            >
                                <InputUsername type='text' value={phone} onChange={onChangePhone} allowClear placeholder="Số điệnt thoại" style={{ marginBottom: '10px' }} />
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
                                <InputPassword type='text' value={confirmpassword} onChange={onChangeConPass} allowClear placeholder="Nhập lại mật khẩu" />
                            </Form.Item>

                            <Form.Item
                                style={{ textAlign: 'center' }}
                            >
                                {/* console.log({data?.message}) */}
                                {data?.status === 'ERR' && <span style={{ color: 'red' }} >{data?.message}</span>}
                                <Loading isPending={isPending}>

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
                                        disabled={!username.length || !password.length || !confirmpassword.length}
                                    />
                                </Loading>
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