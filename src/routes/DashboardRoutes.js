
import { React, useContext, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes as RoutesR,
    Route,
    Navigate,
    redirect
} from 'react-router-dom'

// Hooks
import useAuth from "../hooks/useAuth";

// Layout da aplicação
import ContainerUser from "../components/Layout/ContainerUser";

// Páginas da aplicação 
import Dashboard from "../pages/User/Dashboard";
import SignIn from "../pages/Auth/SignIn";
import FormAtivacao from "../pages/Auth/Signup/Form/FormAtivacao";
import Signup from "../pages/Auth/Signup";
import RecoverPasswordForm from "../pages/Auth/SignIn/Form/RecoverPasswordForm";
import ResetPasswordForm from "../pages/Auth/SignIn/Form/ResetPasswordForm";
import Financeiro from "../pages/User/Financeiro";
import { UserContext } from "../hooks/UserContext"
import { useState } from "react"
import Community from "../pages/User/Community/index";
import OrderConfirmation from "../pages/User/ConfirmPayment/OrderConfirmation/OrderVerify";
import OrderPlaced from "../pages/User/ConfirmPayment/OrderPlaced/OrderPlacedVerify";

// Páginas de Admin
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminCompliance from "../pages/Admin/Compliance/AdminCompliance";

const DashboardRoutes = () => {

    const logged = localStorage.getItem('tk-user')
    const role = localStorage.getItem('role')
    const [value, setValue] = useState(false);

    return (
        <Router>
            <RoutesR>
                <Route path={'/login'} element={<SignIn />}></Route>
                <Route path='/cadastro' element={<Signup />}></Route>
                <Route path='/' element={logged ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}></Route>
                <Route path='/activation/:token' element={<FormAtivacao />}></Route>
                <Route path='/recover-password' element={<RecoverPasswordForm />}></Route>
                <Route path='/reset-password/:token' element={<ResetPasswordForm />}></Route>
            </RoutesR>

            <UserContext.Provider value={{ value, setValue }}>
                {/* User logged routes */}
                <ContainerUser>
                    <RoutesR>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/financeiro"
                            element={logged ? <Financeiro /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/community"
                            element={<Community />}
                        />
                        <Route
                            path="/orderConfirmation"
                            element={<OrderConfirmation />}
                        />
                        <Route
                            path="/orderPlaced"
                            element={<OrderPlaced />}
                        />
                    </RoutesR>
                </ContainerUser>

                <RoutesR>
                    {/* Admin routes */}
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/compliance"
                        element={<AdminCompliance />}
                    />

                </RoutesR>
            </UserContext.Provider>

        </Router >
    )
}

export default DashboardRoutes;