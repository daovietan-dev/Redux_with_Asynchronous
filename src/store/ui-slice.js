import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle: state => {
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
    },
  },
})

export const sendCartData = cart => {
  // dispatch argument được tạo tự động, vì đây là một thiết kế của Redux giúp cho những developer có thể thực thi side-effect trong actionCreator()
  return async dispatch => {
    // ta thực sự đã gửi đi một action khác trong hàm trả về này
    dispatch(
      uiSlice.actions.showNotification({
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
          body: JSON.stringify(cart),
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
        uiSlice.actions.showNotification({
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

export default uiSlice
export const uiActions = uiSlice.actions
