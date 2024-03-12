import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { StyleButtonHover, StyleIncentives, StyleSlider, WrapperStyleProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/Slider1.webp'
import slider2 from '../../assets/images/Slider2.webp'
import slider3 from '../../assets/images/Slider3.webp'
import IncentivesComponent from "../../components/IncentivesComponent/IncentivesComponent";
import CardComponent from "../../components/CardComponent/CardComponent";



const HomePage = () => {
    const category = ['Thời Trang Nam',
        'Điện Thoại & Phụ Kiện',
        'Thiết Bị Điện Tử',
        'Thời Trang Nữ',
        'Nhà Cửa & Đời Sống',
        'Sắc Đẹp',
        'Sức Khỏe',
        'Thể Thao & Du Lịch',
        'Đồng Hồ'
    ]
    return (
        <div style={{ padding: '5px 120px', height: '2000px' }} >
            <WrapperTypeProduct>

                {
                    category.map((cate) => {
                        return (
                            <TypeProduct name={cate} key={cate} />

                        )
                    })
                }
            </WrapperTypeProduct>
            <StyleSlider>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <StyleIncentives>
                    <IncentivesComponent />
                </StyleIncentives>
            </StyleSlider>
            <WrapperStyleProducts  >
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </WrapperStyleProducts>
            <div style={{textAlign: 'center'}} >
                <StyleButtonHover textButton={"Xem Thêm"} type="outline" styleButton={{
                    border: '1px solid #f53d2d',
                    width: '120px', height: '40px', borderRadius: '5px'
                }
                } />
            </div>
        </div>
    )
}

export default HomePage;
