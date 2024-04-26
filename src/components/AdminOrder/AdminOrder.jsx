import { SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Input, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as OrderService from '../../Services/OrderService'
import orderContant from '../../contant'
import { useMutationHook } from '../../hooks/UseMutation'
import Loading from '../LoadingComponent/Loading'
import TableComponent from '../Table/TableComponent'
import PieChartComponent from './PieChart'
import { WrapperHeader } from './style'


const AdminOrder = () => {
    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('')
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [stateOrder, setStateOrder] = useState({
        isDelivered: '',
        orderItems: [],
        _id: '',
        statusOrder: '',
        isPaid: ''
    })

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }



    const acceptOrder = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, data: stateOrder })
    }

    const mutationUpdate = useMutationHook(
        (data) => {
            const {
                id,
                token,
                ...rests
            } = data
            if (stateOrder?.statusOrder === 'Chưa được duyệt') {
                const res = OrderService.acceptOrder(
                    id,
                    token,
                    { ...rests, stateOrder: 'Đã duyệt', },
                )
                return res
            }


        }
    )

    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    const fetchOrderDetail = async () => {
        try {
            const res = await OrderService.getDetailsOrder(rowSelected, user?.access_token)
            if (res?.data != null) {
                setStateOrder({
                    isDelivered: res?.data?.isDelivered,
                    orderItems: res?.data?.orderItems,
                    _id: res?.data?._id,
                    statusOrder: res?.data?.statusOrder
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Không tìm dữ liệu:", error.response.data);
            } else {
                console.error("Có lỗi trong khi lấy dữ liệu:", error);
            }
        }
    }

    useEffect(() => {
        if (rowSelected) {
            fetchOrderDetail()
        }
    }, [rowSelected])
    useEffect(() => {
        if (dataUpdated?.status === 'OK') {
            message.success('Cập nhật thành công')
            setIsPendingUpdate(true)
        }
        else if (dataUpdated?.status === 'ERR') {
            message.error('Cập nhật thất bại ')
        }
    }, [isSuccessUpdated, isErrorUpdated])

    const renderAction = () => {
        return (

            <Space size="middle">
                {stateOrder?.statusOrder === 'Đã duyệt' ?
                    (<Button disabled
                        style={{ background: '#FFC700', color: 'white', cursor: 'no-drop' }}
                    > Xác nhận
                    </Button>) :
                    (<Button onClick={acceptOrder}
                        style={{ background: '#FFC700', color: 'white' }}
                    > Xác nhận
                    </Button>)}


            </Space>
        )
    }

    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    const { isLoading: isLoadingOrders, data: orders } = queryOrder

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
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
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Tên người nhận',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Địa chỉ giao hàng',
            dataIndex: 'address',
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
        },
        {
            title: 'Vận chuyển',
            dataIndex: 'isDelivered',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusOrder',
        },
        {
            title: 'Xác nhận',
            dataIndex: 'action',
            key: 'x',
            render: renderAction
        },
    ];

    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        return {
            ...order,
            key: order._id,
            userName: order?.shippingAddress?.fullname,
            phone: order?.shippingAddress?.phone,
            address: order?.shippingAddress?.address,
            paymentMethod: orderContant.payment[order?.paymentMethod],
            isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
            isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
            totalPrice: (order?.totalPrice.toLocaleString() + ' VNĐ')
        }
    })

    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ height: 200, width: 200 }}>
                <PieChartComponent data={orders?.data} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <Loading isPending={isPendingUpdated}>

                    <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setRowSelected(record._id)
                            },

                        };
                    }} />
                </Loading>

            </div>
        </div>
    )
}

export default AdminOrder