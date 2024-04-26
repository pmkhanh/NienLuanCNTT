import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './route';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './Services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/sliders/userSlide';
import Loading from './components/LoadingComponent/Loading';


function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user)
  const [isPending, setIsPeding] = useState(false)
  useEffect(async () => {
    setIsPeding(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    }
    setIsPeding(false)

  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }



  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const { decoded } = handleDecoded()
    const currentTime = new Date()

    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  }
  )

  const handleGetDetailUser = async (idUser, token) => {
      const res = await UserService.getDetailUser(idUser, token)
      dispatch(updateUser({ ...res?.data, access_token: token }))
  }




  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const isCheckAdmin = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={ route.path} element={
                  <Layout >
                    <Page />
                  </Layout>} />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App;