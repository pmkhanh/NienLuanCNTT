import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundComponent from "../pages/NotFoundPage/NotFoundPage";
import TypeProductpage from "../pages/TypeProductPage/TypeProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSucessPage";
import DetailsOrderPage from "../pages/DetailOrderPage/DetailOrderPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/myorder',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/ordersuccess',
        page: OrderSuccessPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductpage,
        isShowHeader: true
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/productdetail/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/profileuser',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundComponent
    },
]