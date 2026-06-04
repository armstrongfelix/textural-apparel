/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react'
import api from '../services/api'

const AppContext = createContext(null)

const initialState = {
  user: null,
  cart: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, cart: [] }
    case 'ADD_TO_CART': {
      const existing = state.cart.find((item) => item._id === action.payload._id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        }
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      }
    case 'UPDATE_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.id
            ? { ...item, qty: Math.max(1, action.payload.qty) }
            : item
        ),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    default:
      return state
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    dispatch({ type: 'SET_USER', payload: data.user || data })
    return data
  }

  async function signup(email, password, role) {
    const { data } = await api.post('/auth/signup', { email, password, role })
    dispatch({ type: 'SET_USER', payload: data.user || data })
    return data
  }

  function logout() {
    dispatch({ type: 'LOGOUT' })
  }

  function addToCart(product) {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  function removeFromCart(id) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  function updateQty(id, qty) {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppStateProvider')
  return ctx
}
