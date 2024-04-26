import { Col, Image, Upload } from "antd";
import styled from "styled-components";

export const WrapperContainerProfile = styled.div`
    width: 1270px;
    margin: 10px auto 0;
`
export const WrapperHeaderProfile = styled.h1`
    padding-top: 20px;
    text-align: center;
    justify-content: center;
    color: #000;
    font-size: 26px;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
`

export const WrapperTableTr = styled.tr`
    text-align: right;
    vertical-align: middle;
    display: table-row;
    border-color: inherit;
    
`
export const WrapperTableTdLabel = styled.td`
    margin-left: 25px;
`
export const WrapperLabel = styled.label`
    cursor: default;
    color: rgba(85,85,85,.8);
    min-width: 20%; 
    overflow: hidden;
    white-space: nowrap;
`

export const WrapperTableTdInput = styled.td`
    box-sizing: border-box;
    padding: 13px;
`

export const WrapperTablediv = styled.div`
    align-items: center;
    border: 1px solid rgba(0,0,0,.14);
    border-radius: 4px;
    box-shadow: inset 0 2px 0 rgba(0,0,0,.02);
    box-sizing: border-box;
    display: flex; 
    height: 50px;
    overflow: hidden;
    width: 90%;
    font-size: 1.1rem;
`
export const WrapperInput = styled.input`
    background: none;
    border: 0;
    filter: none;
    flex: 1;
    flexShrink: 0;
    padding: 12px;
`

export const WrapperDivImage = styled.div`
    border-left: .1rem solid #efefef;
    overflow: hidden;
    width: 50%;
    height: auto;
    display: flex;
    justify-content: center;
    text-align: center;
    padding-left: 3.125rem;
    flex-direction: column;
    align-items: center;
`

export const WrapperAvatar = styled.div`
    font-size: 1.5rem;
    color: rgba(85,85,85,.8);
    text-transform: capitalize;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`

export const WrapperImage = styled(Image)`
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    object-fit: cover;
`

export const WrapperContainerImage = styled.div`
    height: 200px;
    width: 200px;
    margin: 1.25rem 0;
    position: relative;
    text-align: center;
`
export const WrapperUploadFile = styled(Upload)`
    &.ant-upload.ant-select.ant-upload-select-piture-card{
        width: 60px;
        height: 60px;
        boder-radius: 50%;
    }
    &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item-container{
        display: none;
    }
`

export const WrapperDivLeft = styled(Col)`
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 1.3rem;
    text-align: left;
    padding: 25px;
    
`

export const WrapperListStyle = styled.li`
    padding: 5px;
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    text-transform: capitalize;
    &:hover{
        color: rgb(238, 77, 45);
    }
`

export const WrapperCategory = styled.div`
    cursor: pointer;
    &:hover {
        color: rgb(238, 77, 45);
    }
`