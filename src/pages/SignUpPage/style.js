import { Button, Input } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
    width: 810px;
    height: 525px;
    border: 1px solid red;
    border-radius: 10px;
    background-color: #FFFFFF;
    display: flex;
`

export const WrapperContainerLeft = styled.div`
    flex: 1;
    width: 500px;
    padding: 40px 45px 24px;
`

export const InputPassword = styled(Input.Password)`
    width: 450px;
    border-top: none;
    border-right: none;
    border-left: none;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperOr = styled.div`
    background-color: #dbdbdb;
    flex: 1;
    height: 1px;
    width: 100%;
`
export const WrapperTextOr = styled.span`
    color: #ccc;
    font-size: 1.15rem;
    padding: 0 16px;
    text-transform: uppercase;
`

export const WrapperLogo = styled(Button) `
    background: #fff;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, .26);
    height: 40px;
    padding: 2px 4px;
    width: 150px;
    text-align: center;
    &:hover{
        color: black;
    }
`

export const WrapperContainerRight = styled.div`
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: rgb(11, 116, 229);
    font-size: 17px;
    font-weight: 500;
`