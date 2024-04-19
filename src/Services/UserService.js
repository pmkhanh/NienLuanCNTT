import axios from "axios"

export const  axiosJWT = axios.create()

export const loginUser = async(data) => {
    const respone = await axios.post(`${process.env.REACT_APP_API_KEY}/user/signin`, data)
    return respone.data
}
export const signUpUser = async(data) => {
    const respone = await axios.post(`${process.env.REACT_APP_API_KEY}/user/signup`, data)
    return respone.data
}
export const getDetailUser = async(idUser, access_token) => {
    const respone = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/user/getuser/${idUser}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return respone.data
}
export const refreshToken = async() => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/refreshtoken`, {
        // Tự động lấy cookie và truyền xuống backend khi có
        withCredentials: true
    })
    return res.data
}
export const logout = async() => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/logout`)
    return res.data
}
export const updateUser = async(idUser, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/user/updateuser/${idUser}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/user/getalluser`,{
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteUser = async (idUser, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/user/deleteuser/${idUser}`,{
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteMany = async (ids, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/user/deletemany`, ids, {
        headers: {
            token: `Bearer ${access_token}`
        }
    }
    )
    return res.data
}