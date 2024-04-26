import { DeleteOutlined, PlusOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as UserService from '../../Services/UserService';
import { useMutationHook } from '../../hooks/UseMutation';
import { getBase64 } from '../../utils';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';
import TableComponent from '../Table/TableComponent';
import { WrapperButton, WrapperHeader, WrapperUploadFile } from './style';

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const userAdmin = useSelector((state) => state?.user)
    const [stateUser, setstateUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        isAdmin: false,
        phone: '',
        address: '',
        name: '',
        gender: '',
        avatar: '',
    });
    const [stateUserDetail, setstateUserDetail] = useState({
        isAdmin: false
    });
    const [form] = Form.useForm();

    const renderAction = () => {
        return (
            <Space size="middle">
                <Button onClick={handleUpdate}
                    style={{ background: '#FFC700', color: 'white' }}
                >
                    <SyncOutlined />
                </Button>
                <Button onClick={handleDelete}
                    style={{ background: '#EE4266', color: 'white' }}
                >
                    <DeleteOutlined />
                </Button>
            </Space>
        )
    }



    // Tất cả tài khoản
    const getAllUser = async () => {
        const res = await UserService.getAllUser(userAdmin?.access_token);
        return res;
    }
    const queryUser = useQuery({ queryKey: 'users', queryFn: getAllUser })
    const { isPending: isPedingUser, data: users } = queryUser
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

    })
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <a>{text}</a>,
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                {
                    text: 'Nam',
                    value: 'Nam',
                },
                {
                    text: 'Nữ',
                    value: 'Nữ',
                },
                {
                    text: 'Khác',
                    value: 'Khác',
                },
            ],
            onFilter: (value, record) => {
                return record.gender.indexOf(value) === 0;
            },
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'x',
            render: renderAction
        },

    ];
    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return { ...user, key: user._id, name: user?.name ? user?.name : 'Chưa cập nhật', address: user?.address ? user?.address : 'Chưa cập nhật', isAdmin: user?.isAdmin ? 'Admin' : 'Khách hàng' }
    })

    // Tạo tài khoản
    const mutation = useMutationHook(
        (data) => {
            const {
                username,
                password,
                confirmpassword,
                isAdmin,
                phone,
                avatar,
            } = data
            const res = UserService.signUpUser({
                username,
                password,
                confirmpassword,
                isAdmin: false,
                phone,
                avatar,
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
        setstateUser({
            username: '',
            password: '',
            confirmpassword: '',
            phone: '',
        })
        form.resetFields()
    };
    const onFinish = () => {
        mutation.mutate(stateUser, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (e) => {
        setstateUser({
            ...stateUser, [e.target.name]: e.target.value
        });
    }
    const onChangeImage = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setstateUser({
            ...stateUser,
            avatar: file.preview
        })
    }
    useEffect(() => {
        if (isSuccess && data?.status == 'OK') {
            message.success("Thêm tài khoản mới thành công!")
            handleCancel()
        }
        if (data?.status == 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccess, isError])


    // Cập nhật tài khoản
    const mutationUpdate = useMutationHook(
        (data) => {
            const {
                id,
                token,
                ...rests
            } = data
            if (stateUserDetail?.isAdmin) {
                const res = UserService.updateUser(
                    id,
                    { isAdmin: false, ...rests },
                    token,
                )
                return res
            }
            else if (!stateUserDetail?.isAdmin) {
                const res = UserService.updateUser(
                    id,
                    { isAdmin: true, ...rests },
                    token,
                )
                return res
            }
        }
    )
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    useEffect(() => {
        if (rowSelected != null && isModalOpenUpdate) {
            setIsPendingUpdate(true)
            fetchDetailUser(rowSelected)
        }
    }, [rowSelected, isModalOpenUpdate])
    const fetchDetailUser = async (rowSelected) => {
        try {
            const res = await UserService.getDetailUser(rowSelected, userAdmin?.access_token)
            if (res?.data != null) {
                setstateUserDetail({
                    isAdmin: res?.data?.isAdmin
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Không tìm thấy tài khoản:", error.response.data);
            } else {
                console.error("Có lỗi trong khi lấy dữ liệu:", error);
            }
        }
        setIsPendingUpdate(false)
    }
    const handleCancelUpdate = () => {
        setIsModalOpenUpdate(false)
    }

    const handleUpdate = () => {
        setIsModalOpenUpdate(true)
    }
    const handleOkUpdate = () => {
        mutationUpdate.mutate({ id: rowSelected, token: userAdmin?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status == 'OK') {
            message.success("Thay đổi quyền thành công!")
            handleCancelUpdate()
        }
        if (dataUpdated?.status == 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccessUpdated, isErrorUpdated])

    // Xóa tài khoản
    const mutationDeleted = useMutationHook(
        (data) => {
            const {
                id,
                token,
            } = data
            const res = UserService.deleteUser(
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
        mutationDeleted.mutate({ id: rowSelected, token: userAdmin?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status == 'OK') {
            message.success("Xóa tài khoản thành công!")
            handleCancelDelete()
        }
        if (dataDeleted?.status == 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccessDeleted, isErrorDeleted])


    // Xóa nhiều tài khoản
    const mutationDeleteMany = useMutationHook(
        (data) => {
            const {
                token,
                ...ids
            } = data
            const res = UserService.deleteMany(
                ids,
                token
            )
            return res
        },
    )
    const { data: dataDeleteMany, isPending: isPendingDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany } = mutationDeleteMany

    const handleDeleteManyUsers = (ids) => {
        mutationDeleteMany.mutate()
        mutationDeleteMany.mutate({ ids: ids, token: userAdmin?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    useEffect(() => {
        if (isSuccessDeleteMany && dataDeleteMany?.status === 'OK') {
            message.success("Xóa tài khoản thành công!")
            handleCancelDelete()
        }
        if (dataDeleteMany?.status === 'ERR') {
            message.error('Có lỗi xảy ra, kiểm tra lại dữ liệu')
        }
    }, [isSuccessDeleteMany, isErrorDeleteMany])


    return (
        <div style={{ width: '100%' }}>
            <WrapperHeader>Quản lý tài khoản</WrapperHeader>
            <div style={{ marginTop: '15px', display: 'flex' }}>
                <WrapperButton onClick={showModal} ><PlusOutlined /> Thêm </WrapperButton>
            </div>
            <div style={{ marginTop: '15px' }} >
                <TableComponent
                    handleDeleteMany={handleDeleteManyUsers}
                    columns={columns}
                    isPending={isPedingUser}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setRowSelected(record._id)
                            },

                        };
                    }}
                />
                {/* Modal tạo tài khoản */}
                <ModalComponent forceRender title="Tạo tài khoản" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Loading isPending={isPending}>
                        <Form
                            name="newUser"
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 20,
                            }}
                            style={{
                                maxWidth: 700,
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

                                label="Tên tài khoản"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tên tài khoản không được để trống!',
                                    },
                                ]}
                            >
                                <Input value={stateUser.username} onChange={handleChange} name='username' />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        min: 8,
                                        required: true,
                                        message: 'Mật khẩu ít nhất 8 kí tự',
                                    },
                                ]}
                            >
                                <Input.Password value={stateUser.password} onChange={handleChange} name='password' />
                            </Form.Item>
                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="confirmpassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                        min: 8,
                                        required: true,
                                        message: 'Mật khẩu ít nhất 8 kí tự',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập không khớp'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password value={stateUser.confirmpassword} onChange={handleChange} name='confirmpassword' />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        min: 10,
                                        max: 10,
                                        required: true,
                                        message: 'Số điện thoại không được để trống',
                                    },
                                ]}
                            >
                                <Input value={stateUser.phone} onChange={handleChange} name='phone' />
                            </Form.Item>

                            <Form.Item
                                label="Ảnh đại diện"
                                name="avatar"
                            >
                                <WrapperUploadFile maxCount={1} onChange={onChangeImage}>
                                    <Button >Hình ảnh</Button>
                                    {stateUser?.avatar && (
                                        <img src={stateUser?.avatar} style={{
                                            height: '60px',
                                            width: '60px',
                                            marginLeft: '30px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
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

                {/* Modal thông báo xóa tài khoản */}
                <ModalComponent title="Xóa tài khoản" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleOKDelete}>
                    <Loading isPending={isPendingDeleted} >
                        <div>Bạn có chắc muốn xóa tài khoản này không ?</div>
                    </Loading>
                </ModalComponent>

                {/* Cấp quyền người dùng */}
                <ModalComponent title="Phân quyền tài khoản" open={isModalOpenUpdate} onCancel={handleCancelUpdate} onOk={handleOkUpdate}>
                    {stateUserDetail?.isAdmin
                        ? (
                            <Loading isPending={isPendingUpdate} >
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '1.5rem',
                                        color: 'red'
                                    }}
                                >
                                    Thu hồi quyền Admin
                                </div>
                            </Loading>
                        )
                        : (
                            <Loading isPending={isPendingUpdate} >
                                <div
                                    style={{
                                        fontSize: '1.1rem',
                                        color: 'grey'
                                    }}
                                >
                                    Khi bạn dùng chức năng này, tài khoản này sẽ có quyền thực thi của Admin.
                                </div>
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                        color: 'red'
                                    }}
                                >
                                    Bạn có chắc chắn không?
                                </div>
                            </Loading>
                        )
                    }



                </ModalComponent >

            </div >
        </div >
    )
}

export default AdminUser;
