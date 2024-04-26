import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    selectedItemOrder: [],
    orderItemSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: '',
    painAt: '',
    isDelivered: false,
    deliveredAt: '',
}


export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const { shipAddress } = action.payload
            // state.shippingAddress.push(shipAddress)
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                itemOrder.amount += orderItem.amount
            } else {
                state.orderItems.push(orderItem)
            }

        },
        plus: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const orderItemSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct)
            itemOrder.amount++
            if (orderItemSelected) {
                orderItemSelected.amount++
            }
        },
        minus: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const orderItemSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct)
            if (itemOrder.amount <= 1) {
                itemOrder.amount = 1
                if (orderItemSelected) {
                    orderItemSelected.amount = 1
                }
                orderItemSelected.amount = 1
            } else if (itemOrder.amount > 1) {
                itemOrder.amount--
                if (orderItemSelected) {
                    orderItemSelected.amount--
                }
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const orderItemSelected = state?.orderItemSelected?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder
            state.orderItemSelected = orderItemSelected;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const orderItemSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrder
            state.orderItemSelected = orderItemSelected
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((item) => {
                if (listChecked.includes(item.product)) {
                    orderSelected.push(item)
                }
            })
            state.orderItemSelected = orderSelected
        }
    }
})

export const { addOrderProduct, removeOrderProduct, plus, minus, removeAllOrderProduct, selectedOrder } = orderSlide.actions

export default orderSlide.reducer