import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundComponent from "../pages/NotFoundPage/NotFoundPage";
import TypeProductpage from "../pages/TypeProductPage/TypeProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

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
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/typeproduct',
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
        path: '/productdetail',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundComponent
    },
]