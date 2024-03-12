import React from 'react'
import { WrapperContent, WrapperLable, WrapperTextValue } from './style';
import { Checkbox, Input, Rate } from 'antd';

const NavbarComponent = () => {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>
                        <Checkbox >{option}</Checkbox>
                    </WrapperTextValue>
                })
            case 'option':
                return (
                    options.map((option) => {
                        return <WrapperTextValue>
                            <Checkbox value={option.value} >{option.label}</Checkbox>
                        </WrapperTextValue>
                    })
                )
            case 'rate':
                return (options.map((option) => {
                    return (
                        <Rate allowHalf disabled defaultValue={option} />
                    )
                })
                )

            case 'price':
                return (
                    <div style={{display: 'flex', width: 'fit-content'}} >
                        <Input placeholder="&#x20AB; TỪ" />
                        <span>
                        &nbsp;-&nbsp;
                        </span>
                        <Input  placeholder="&#x20AB; ĐẾN" />
                    </div>
                )


            default:
                return {}
        }
    }

    return (
        <WrapperLable>
            Danh Mục Sản Phẩm
            <WrapperContent>
                {renderContent('text', ['Điện Thoại & Phụ Kiện',
                    'Thiết Bị Điện Tử',
                    'Thời Trang Nữ',
                    'Nhà Cửa & Đời Sống',
                    'Sắc Đẹp',
                    'Sức Khỏe',
                    'Thể Thao & Du Lịch',
                    'Đồng Hồ'])}
                <span style={{ borderTopStyle: 'solid' }} >
                    Nơi Bán
                </span>
                {renderContent('option', [
                    { value: 'CT', label: 'Cần Thơ' },
                    { value: 'HCM', label: 'Hồ Chí Minh' },
                    { value: 'HN', label: 'Hà Nội' },
                ])}
                <span style={{ borderTopStyle: 'solid' }} >
                    Đơn Vị Vận Chuyển
                </span>
                {renderContent('option', [
                    { value: 'HT', label: 'Hỏa Tốc' },
                    { value: 'N', label: 'Nhanh' },
                    { value: 'TK', label: 'Tiết Kiệm' },
                ])}
                <span style={{ borderTopStyle: 'solid' }} >
                    Thương Hiệu
                </span>
                {renderContent('option', [
                    { value: 'IP', label: 'Iphone' },
                    { value: 'SS', label: 'SamSung' },
                    { value: 'OP', label: 'Oppo' },
                ])}
                <span style={{ borderTopStyle: 'solid' }} >
                    Khoảng Giá
                </span>
                {renderContent('price')}
                <span style={{ borderTopStyle: 'solid' }} >
                    Đánh Giá
                </span>
                {renderContent('rate', [5, 4, 3, 2, 1])}
            </WrapperContent>

        </WrapperLable>
    )
}

export default NavbarComponent;