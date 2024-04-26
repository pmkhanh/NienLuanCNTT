import { Col, Image, InputNumber, Row } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";


export const WrapperImgSmalls = styled(Image)`
    margin-top: 7px;
`

export const WrapperColImg = styled(Col)`
    flex-basic: unset;
    margin: 0 4px 0 2px;

`

export const WrapperInfoProduct = styled.div`
`

export const WrapperReportProduct = styled.span`
    color: #ee4d2d;
    font-size: 20px;
    margin-left: 5px;
    margin: 15px 0;
`

export const WrapperPriceOldProduct = styled.span`
    text-decoration-line: line-through;
    text-decoration-color: black;
    font-size: 1rem; 
    font-weight: 300;
    color: #929292;
    margin: 0 10px;;
`

export const WrapperPriceNewProduct = styled.span`
    color: #ee4d2d;
    font-size: 1.675rem;
    font-weight: 500;
    margin-left: 30px;
`

export const WrapperPolicyProduct = styled.div`
    display: flex;
    color: #757575;
    flex-shrink: 0;
    font-size: inherit;
    font-weight: 400;
    margin: 30px 0;
    // text-transform: capitalize;
    width: 100%;
    font-size: 1.15rem;
`

export const WrapperOptionProduct = styled.div`
    text-align: center;
    margin: 0 40px;
    color: black;

`

export const StyleButtonCart = styled(ButtonComponent)`
    &:hover{
        background-color: rgba(255,197,178,.181);
        color: #fff;
    }
    margin: 15px 10px;
`

export const QuantityBox = styled.div`
    color: #757575;
    margin-left: 23px;
    gap: 10px;
    display: flex;
    align-items: center;
`
export const WrapperInputNumber =styled(InputNumber)`
    &.ant-input-number-input-wrap  {
        &.ant-input-number-handler ant-input-number-handler-up{
            display: none !important;
        }
        display: none !important;
    };
    &.ant-input-number-input{
        display: none;
    }
`