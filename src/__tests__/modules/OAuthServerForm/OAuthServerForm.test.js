/* eslint-env jest */
import React from 'react'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import schema from '../../../configurations/oAuthServerSchema.config'
import { renderFakeForm } from '../../../utils/createTestForm'

import OAuthServerForm from '../../../modules/pages/NewOAuthServerPage/OAuthServerForm'

const initialValues = {
  name: 'mock-name',
  token_strategy: {
    name: 'mock-name'
  },
  oauth_endpoints: {},
  oauth_client_endpoints: {}
}

const store = createStore(() => ({
  form: {
    mockForm: {
      values: initialValues
    }
  }
}))

describe('EndpointForm component', () => {
  const requiredProps = {
    schema,
    handleSubmit: jest.fn(),
    initialValues
  }

  it('renders correctly', () => {
    const passedProps = {
      editing: false
    }
    const wrapper = shallow(
      renderFakeForm(store)(initialValues)(
        <OAuthServerForm
          {...requiredProps}
          {...passedProps}
        />
      )
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly if property `editing` is passed', () => {
    const passedProps = {
      editing: true
    }
    const wrapper = shallow(
      renderFakeForm(store)(initialValues)(
        <OAuthServerForm
          {...requiredProps}
          {...passedProps}
        />
      )
    )

    expect(wrapper).toMatchSnapshot()
  })
})
