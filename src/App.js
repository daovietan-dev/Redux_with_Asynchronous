import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useEffect } from 'react'
import { fetchCartData, sendCartData } from './store/cart-action'
import Notification from './components/UI/Notification'

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)

  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])

  useEffect(
    prams => {
      if (isInitial) {
        // dispatch(sendCartData(cart))
        isInitial = false
        return
      }

      // sendCartData(cart) là một actionCreator nhưng lại return một hàm. Tuy nhiên, điều này là khả thi vì Redux chấp nhận nó và sẽ thực thi hàm trả về đó một lần nữa
      if (cart.changed) {
        dispatch(sendCartData(cart))
      }
    },
    [cart, dispatch]
  )

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
