import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";

const HomePage = () => {
    const category = ['Thời Trang Nam',
        'Điện Thoại & Phụ Kiện',
        'Thiết Bị Điện Tử',
        'Thời Trang Nữ',
        'Nhà Cửa & Đời Sống',
        'Sắc Đẹp',
        'Sức Khỏe',
        'Thể Thao & Du Lịch',
        'Đồng Hồ',
        ';alksdf'
    ]
    return (
        <div style={{ padding: '5px 120px' }} >
            <WrapperTypeProduct>

                {
                    category.map((cate) => {
                        return (
                            <TypeProduct name={cate} key={cate} />

                        )
                    })
                }
            </WrapperTypeProduct>
            HomePage
        </div>
    )
}

export default HomePage;
