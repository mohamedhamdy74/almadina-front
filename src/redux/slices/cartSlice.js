import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL
    ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
    : '/api';
const API_URL = `${BASE}/cart`;

// Configure axios to send cookies
axios.defaults.withCredentials = true;

// Get cart
export const getCart = createAsyncThunk('cart/getCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'فشل في جلب السلة');
    }
});

// Add to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity = 1 }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/add`, { productId, quantity });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'فشل في إضافة المنتج للسلة');
        }
    }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/update`, { productId, quantity });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'فشل في تحديث الكمية');
        }
    }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/remove/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'فشل في حذف المنتج');
        }
    }
);

// Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/clear`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'فشل في تفريغ السلة');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        itemCount: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.itemCount = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.itemCount = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update cart item
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.itemCount = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.itemCount = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Clear cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
                state.totalAmount = 0;
                state.itemCount = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
