import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ProductService from '../../Services/ProductService';
import { useMutationHook } from '../../hooks/UseMutation';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';
import TableComponent from '../Table/TableComponent';
import { WrapperButton, WrapperHeader, WrapperUploadFile } from './style';

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        status: '',
        image: '',
    });
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        status: '',
        image: '',
    });
    const [form] = Form.useForm();

    const renderAction = () => {
        return (
            <Space size="middle">
                <Button onClick={handleEdit}
                    style={{ background: '#FFC700', color: 'white' }}
                >
                    <EditOutlined />
                </Button>
                <Button onClick={handleDelete}
                    style={{ background: '#EE4266', color: 'white' }}
                >
                    <DeleteOutlined />
                </Button>
            </Space>
        )
    }



    // Tất cả sản phẩm
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    }
    const queryProduct = useQuery({ queryKey: 'products', queryFn: getAllProducts })
    const { isPending: isPendingProduct, data: products } = queryProduct
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 30,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="medium"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        // searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //     highlightStyle={{
        //     //         backgroundColor: '#ffc069',
        //     //         padding: 0,
        //     //     }}
        //     //     searchWords={[searchText]}
        //     //     autoEscape
        //     //     textToHighlight={text ? text.toString() : ''}
        //     // />
        // ) : (
        //     text
        // ),
    })
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            filters: [
                {
                    text: 'Quần áo',
                    value: 'quần áo',
                },
                {
                    text: 'Thời trang',
                    value: 'thời trang',
                },
            ],
            onFilter: (value, record) => {
                // console.log('value', {value, record})
                return record.type.indexOf(value) === 0;
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'CountInStock',
            dataIndex: 'countInStock',
            sorter: (a, b) => a.sountInStock - b.sountInStock,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Mới nhất',
                    value: 'Mới nhất',
                },
                {
                    text: 'Bán chạy nhất',
                    value: 'Bán chạy nhất',
                },
            ],
            onFilter: (value, record) => {
                // console.log('value', {value, record})
                return record.status.indexOf(value) === 0;
            },
        },
        {
            title: 'Sell',
            dataIndex: 'sell',
            sorter: (a, b) => a.sell - b.sell,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'x',
            render: renderAction
        },

    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    // Tạo sản phẩm
    const mutation = useMutationHook(
        (data) => {
            const {
                name,
                type,
                countInStock,
                price,
                description,
                rating,
                status,
                image,
            } = data
            const res = ProductService.createProduct({
                name,
                type,
                countInStock,
                price,
                description,
                rating,
                status,
                image,
            })
            return res
        }
    )
    const { data, isPending, isSuccess, isError } = mutation


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            type: '',
            countInStock: '',
            price: '',
            description: '',
            rating: '',
            status: '',
            image: '',
        })
        form.resetFields()
    };
    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (e) => {
        setStateProduct({
            ...stateProduct, [e.target.name]: e.target.value
        });
    }
    const onChangeImage = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    useEffect(() => {
        if (isSuccess && data?.status == 'OK') {
            message.success("Thêm sản phẩm mới thành công!")
            handleCancel()
        }
        if (data?.status == 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccess, isError])


    // Cập nhật sản phẩm
    const mutationUpdate = useMutationHook(
        (data) => {
            const {
                id,
                token,
                ...rests
            } = data
            const res = ProductService.updateProduct(
                id,
                token,
                { ...rests }
            )
            return res
        }
    )
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    useEffect(() => {
        form.setFieldValue(stateProductDetail)
    }, [form, stateProductDetail])

    useEffect(() => {
        if (rowSelected != null) {
            fetchDetailProduct(rowSelected)
        }
    }, [rowSelected])
    const fetchDetailProduct = async (rowSelected) => {
        try {
            const res = await ProductService.getDetailProduct(rowSelected)
            if (res?.data != null) {
                setStateProductDetail({
                    name: res?.data?.name,
                    type: res?.data?.type,
                    countInStock: res?.data?.countInStock,
                    price: res?.data?.price,
                    description: res?.data?.description,
                    rating: res?.data?.rating,
                    status: res?.data?.status,
                    image: res?.data?.image,
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Không tìm thấy sản phẩm:", error.response.data);
            } else {
                console.error("Có lỗi trong khi lấy dữ liệu:", error);
            }
        }

        setIsPendingUpdate(false)
    }
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetail({
            name: '',
            type: '',
            countInStock: '',
            price: '',
            description: '',
            rating: '',
            status: '',
            image: '',
        })
        form.resetFields()
    };
    const handleChangeDetail = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateProductDetail({
            ...stateProductDetail, [e.target.name]: e.target.value
        });
    }
    const handleEdit = () => {
        // console.log('rowselected', rowSelected)
        if (rowSelected != null) {
            setIsPendingUpdate(true)
            fetchDetailProduct()
        }
        setIsOpenDrawer(true)
    }
    const onChangeImageDetail = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview
        })
    }
    const onUpdateProduct = async () => {
        // console.log("token_user", user.access_token)
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetail }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status == 'OK') {
            message.success("Cập nhật sản phẩm thành công!")
            handleCloseDrawer()
        }
        if (dataUpdated?.status == 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccessUpdated, isErrorUpdated])

    // Xóa sản phẩm
    const mutationDeleted = useMutationHook(
        (data) => {
            const {
                id,
                token,
            } = data
            const res = ProductService.deleteProduct(
                id,
                token
            )
            return res
        },
    )
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDelete = () => {
        setIsModalOpenDelete(true)
    }
    const handleOKDelete = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status == 'OK') {
            message.success("Xóa sản phẩm thành công!")
            handleCancelDelete()
        }
        if (dataDeleted?.status == 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccessDeleted, isErrorDeleted])

    // Xóa nhiều sản phẩm
    const mutationDeleteMany = useMutationHook(
        (data) => {
            const {
                ids,
                token,
            } = data
            const res = ProductService.deleteMany(
                ids,
                token
            )
            return res
        },
    )
    console.log('many', mutationDeleteMany)
    const { data: dataDeleteMany, isPending: isPendingDeleteMany, isSuccess: isSuccessDeleteMay, isError: isErrorDeleteMany } = mutationDeleteMany

    const handleDeleteMany = (_id) => {
        console.log('_id', {_id})
        // mutationDeleteMany.mutate()
    }



    return (
        <div style={{ width: '100%' }}>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '15px', display: 'flex' }}>
                <WrapperButton onClick={showModal} ><PlusOutlined /> Thêm </WrapperButton>
            </div>
            <div style={{ marginTop: '15px' }} >
                <TableComponent
                    handleDeleteMany={handleDeleteMany}
                    columns={columns}
                    isPending={isPendingProduct}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setRowSelected(record._id)
                            },

                        };
                    }}
                />
                {/* Modal tạo sản phẩm */}
                <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Loading isPending={isPending}>
                        <Form
                            name="newProduct"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item

                                label="Tên sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tên sản phẩm không được để trống!',
                                    },
                                ]}
                            >
                                <Input value={stateProduct.name} onChange={handleChange} name='name' />
                            </Form.Item>

                            <Form.Item
                                label="Loại"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thêm vào loại sản phẩm',
                                    },
                                ]}
                            >
                                <Input value={stateProduct.type} onChange={handleChange} name='type' />
                            </Form.Item>
                            <Form.Item
                                label="Số lượng"
                                name="countInStock"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thêm vào số lượng sản phẩm',
                                    },
                                ]}
                            >
                                <Input value={stateProduct.countInStock} onChange={handleChange} name='countInStock' />
                            </Form.Item>
                            <Form.Item
                                label="Giá bán"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thêm vào giá bán sản phẩm',
                                    },
                                ]}
                            >
                                <Input value={stateProduct.price} onChange={handleChange} name='price' />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thêm vào mô tả sản phẩm',
                                    },
                                ]}
                            >
                                <Input value={stateProduct.description} onChange={handleChange} name='description' />
                            </Form.Item>
                            <Form.Item
                                label="Trạng thái"
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thêm vào trạng thái sản phẩm',
                                    },
                                ]}
                            >
                                <Input value={stateProduct.status} onChange={handleChange} name='status' />
                            </Form.Item>
                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                            >
                                <WrapperUploadFile maxCount={1} onChange={onChangeImage}>
                                    <Button >Chọn ảnh</Button>
                                    {stateProduct?.image && (
                                        <img src={stateProduct?.image} style={{
                                            height: '60px',
                                            width: '60px',
                                            marginLeft: '30px',
                                            objectFit: 'cover'
                                        }} alt='image'
                                        />
                                    )}
                                </WrapperUploadFile>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    justifyItems: 'center'
                                }}
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button style={{ width: '130px', height: '40px', fontSize: '1.15rem', alignContent: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" htmlType="submit">
                                    Thêm
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
                {/* Modal thông báo xóa sản phẩm */}
                <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleOKDelete}>
                    <Loading isPending={isPendingDeleted} >
                        <div>Bạn có chắc muốn xóa sản phẩm này không ?</div>
                    </Loading>
                </ModalComponent>
                {/* Drawer cập nhật thông tin sản phẩm */}
                <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='45%'>
                    <Loading isPending={isPendingUpdate || isPendingUpdated}>
                        <Form
                            name="detailProduct"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onUpdateProduct}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item

                                label="Tên sản phẩm"

                            >
                                <Input value={stateProductDetail.name} onChange={handleChangeDetail} name='name' />
                            </Form.Item>

                            <Form.Item
                                label="Loại"

                            >
                                <Input value={stateProductDetail.type} onChange={handleChangeDetail} name="type" />
                            </Form.Item>
                            <Form.Item
                                label="Số lượng"

                            >
                                <Input value={stateProductDetail.countInStock} onChange={handleChangeDetail} name='countInStock' />
                            </Form.Item>
                            <Form.Item
                                label="Giá bán"

                            >
                                <Input value={stateProductDetail.price} onChange={handleChangeDetail} name='price' />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"

                            >
                                <Input value={stateProductDetail.description} onChange={handleChangeDetail} name='description' />
                            </Form.Item>
                            <Form.Item
                                label="Trạng thái"

                            >
                                <Input value={stateProductDetail?.status} onChange={handleChangeDetail} name='status' />
                            </Form.Item>

                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                            >
                                <WrapperUploadFile maxCount={1} onChange={onChangeImageDetail}>
                                    <Button >Chọn ảnh</Button>
                                    {stateProductDetail?.image && (
                                        <img src={stateProductDetail?.image} style={{
                                            height: '60px',
                                            width: '60px',
                                            marginLeft: '30px',
                                            objectFit: 'cover'
                                        }} alt={setStateProductDetail.name}
                                        />
                                    )}
                                </WrapperUploadFile>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    justifyItems: 'center'
                                }}
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button style={{ width: '130px', height: '40px', fontSize: '1.15rem', alignContent: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" htmlType="submit">
                                    Cập Nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>

                </DrawerComponent>
            </div>
        </div>
    )
}

export default AdminProduct;
