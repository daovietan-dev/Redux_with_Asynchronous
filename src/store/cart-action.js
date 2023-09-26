import { cartActions } from './cart-slice'
import { uiActions } from './ui-slice'

export const fetchCartData = cart => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-learn-8e504-default-rtdb.firebaseio.com/cart.json'
      )

      if (!response.ok) {
        throw new Error(`Could not fetch cart data!`)
      }
      const data = await response.json()

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(cartActions.replaceCart(cartData))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      )
    }
  }
}

export const sendCartData = cart => {
  // dispatch argument được tạo tự động, vì đây là một thiết kế của Redux giúp cho những developer có thể thực thi side-effect trong actionCreator()
  return async dispatch => {
    // ta thực sự đã gửi đi một action khác trong hàm trả về này
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    )

    // khai báo asynchronous code
    const sendRequest = async () => {
      const response = await fetch(
        'https://redux-learn-8e504-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          // không đồng bộ state.changed vào database
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Somethings wrong!')
      }
    }

    // thực thi asynchronous code
    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart data successfully!',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      )
    }
  }
}
