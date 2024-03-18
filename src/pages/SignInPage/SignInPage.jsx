import React from 'react'
import { InputPassword, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperLogo, WrapperOr, WrapperTextOr } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import logoSignIn from '../../assets/images/logo_signin.png'
import logfb from '../../assets/images/logo_fb.png'
import logogg from '../../assets/images/logo_gg.png'


const SignInPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} >
            <WrapperContainer>
                <WrapperContainerLeft>
                    <h1>Đăng nhập</h1>
                    <div style={{ alignItems: 'center', textAlign: 'center' }} >
                        <InputFormComponent placeholder="Email/Số điện thoại" style={{ marginBottom: '10px' }} />
                        <InputPassword allowClear placeholder="Mật khẩu" />
                        <ButtonComponent textButton={'Đăng Nhập'}
                            styleButton={{
                                backgroundColor: '#ee4d2d',
                                color: '#fff',
                                width: '300px',
                                height: '40px',
                                fontSize: '1.25rem',
                                margin: '26px 0 10px'
                            }}
                        />
                    </div>
                    <div>
                        <a href="">Quên mật khẩu?</a>

                    </div>

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
                                <span>  Google</span>
                        </WrapperLogo>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', color: '#ccc' }} >
                        <span>
                            Bạn chưa có tài khoản? <a href="#">Đăng ký</a>
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