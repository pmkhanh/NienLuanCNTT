import { Card } from "antd";
import styled from "styled-components";

export const StyleNameProduct = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`
export const WrapperReportText = styled.div`
    font-size: 14px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const PriceProduct = styled.span`
    color: rgba(238, 77, 45);
`
export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 250px;
        width: 200px;
    },
    position: relative;
    border-radius: 5px;
    border: 1px solid grey;
`
export const StyleStateProuct = styled.span`
text-align: center;
margin: 5px 0;
color: rgba(238, 77, 45);
border: 1px groove red;
width: 95px;
line-height: 1rem;
font-size: 0.65rem;
`