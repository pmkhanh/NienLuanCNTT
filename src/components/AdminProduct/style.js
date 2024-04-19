import { Button, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader =styled.h1`
    font-weight: bold;
    font-size: 25px;
    align-items: center;
`

export const WrapperButton = styled(Button)`
    justify-items: center;
    background-color: rgb(26, 148, 255);
    color: white;
    font-size: 18px;
    height: 50px;
    width: 100px;
    box-shadow: 1px 1px 2px grey;
`

export const WrapperUploadFile = styled(Upload)`
    &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item-container{
        display: none;
    }
    &.css-dev-only-do-not-override-1drr2mu .ant-form-item{
        display: none;
    }
`