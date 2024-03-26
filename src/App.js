import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './route';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


function App() {


  useEffect(() => {
    fetchApi()
  }, [])
  const fetchApi = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getall`)
    return result.data
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  console.log(query)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout >
                  <Page />
                </Layout>} />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App;