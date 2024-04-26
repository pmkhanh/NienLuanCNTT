import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getall?filter=name&filter=${search}&limit=${limit}`)
    } else {

        res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getall?limit=${limit}`)
    }
    return res.data
}
export const productType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getall?filter=type&filter=${type}&page=${page}&limit=${limit}`)
        return res.data
    } 
}
export const getAllProductType = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getalltype`)
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/product/create`, data)
    return res.data
}

export const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/detail/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    }
    )
    return res.data
}
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    }
    )
    return res.data
}
export const deleteMany = async (ids, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_KEY}/product/deletemany`, ids, {
        headers: {
            token: `Bearer ${access_token}`
        }
    }
    )
    return res.data
}