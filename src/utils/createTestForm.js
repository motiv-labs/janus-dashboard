import React from 'react'
import renderer from 'react-test-renderer'
import { connect, Provider } from 'react-redux'
import { reduxForm } from 'redux-form'

const Form = ({ children, initialValues }) => children

const createTestForm = initialValues => connect(
  () => ({
    initialValues
  }),
  null
)(
  reduxForm({
    form: 'mockForm'
  })(Form)
)

export const renderFakeForm = store => initialValues => el => {
  const ConnectedForm = createTestForm(initialValues)

  return (
    <Provider store={store}>
      <ConnectedForm>
        {el}
      </ConnectedForm>
    </Provider>
  )
}

export const wrap = store => initialValues => el => renderer
  .create(
    renderFakeForm(store)(initialValues)(el)
  )
