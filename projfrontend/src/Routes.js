import React from 'react'
import {createBrowserRouter} from "react-router-dom"
import Home from "./core/Home"


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    }
])

export default routes;