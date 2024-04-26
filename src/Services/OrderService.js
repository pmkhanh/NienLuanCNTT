import { axiosJWT } from "./UserService"

export const createOrder = async (id, data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_KEY}/order/create/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const getOrderbyUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/getallorder/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/order/cancelorder/${userId}`, { data }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const acceptOrder = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/order/acceptorder/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/getallorder`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/getdetailsorder/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}