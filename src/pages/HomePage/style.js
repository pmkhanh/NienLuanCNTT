import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-item: center;
    gap: 20px;
    justify-content: flex-start;
    border-bottom: 1px solid #F5F5DC;
    margin: 5px;
    padding: 3px;
`

export const StyleSlider = styled.div`
    display: flex;
    align-items: center;
    justifiy-content: center;
    padding: 5px 120px;
    background-color: LightGray;
    box-shadow: 7px 7px 2px 2px lightblue;
    
`
export const StyleIncentives = styled.div`
    padding: 4 4px;
    margin-left: 25px;
`

export const StyleButtonHover = styled(ButtonComponent)`
    &:hover{
        background-color: #f53d2d;
        color: #fff;
    }
    margin-top: 15px;
`

export const WrapperStyleProducts = styled.div`
    background-color: #F0F0F0;
    display: flex;
    margin-top: 30px;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    overflow: hiden;
    justify-content: space-between;
`