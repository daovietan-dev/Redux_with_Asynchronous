import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useEffect } from 'react'
import { uiActions } from './store/ui-slice'
import Notification from './components/UI/Notification'

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(
    prams => {
      const sendCartData = async params => {
        dispatch(
          uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
          })
        )

        const response = await fetch(
          'https://redux-learn-8e504-default-rtdb.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cart),
          }
        )

        if (!response.ok) {
          throw new Error('Somethings wrong!')
        }

        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sending cart data successfully!',
          })
        )
      }

      if (isInitial) {
        isInitial = false
        return
      }

      sendCartData().catch(error => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!',
          })
        )
      })
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
