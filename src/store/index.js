import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './products.slice'
import appSlice from './app.slice'
import cartSlice from './cart.slice'
import purchasesSlice from './purchases.slice'

export default configureStore({
    reducer: {
        products: productsSlice,
        app: appSlice,
        cart: cartSlice,
        purchases: purchasesSlice
    }
})