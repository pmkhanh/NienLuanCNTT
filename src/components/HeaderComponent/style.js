import { Row } from "antd";
import styled from "styled-components";
import Loading from "../LoadingComponent/Loading";

export const WrapperHeader = styled(Row)`
    padding: 20px 120px;
    background-color: rgb(26, 148, 255);
    border-radius: 3px;
    align-items: center;
`

export const WrapperTextHeader = styled.span`
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`

export const WrapperHeaderAccount = styled.div`
    padding-left: 3em;
    display: flex;
    align-items: center;
    color: #fff;
    gap: 40px;
    font-size: 15px;
    justify-content:center;
`
export const WrapperHeaderIcon = styled.div`
    align-items: center;
    padding: 9px;
    margin-left: 27px;
`

export const WrapperContentPopover = styled.p`
    cursor: pointer;
    font-size: 1.05rem;
    &:hover {
        color: #15F5BA;
    }
`

export const WrapperAccount = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
}
`
