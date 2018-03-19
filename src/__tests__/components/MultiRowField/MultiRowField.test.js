/* eslint-env jest */
import React from 'react'
import { createStore } from 'redux'
import { mount } from 'enzyme'

import { renderFakeForm, wrap } from '../../../utils/createTestForm'
import MultiRowField from '../../../components/MultiRowField/MultiRowField'

const initialValues = {
  'mock-name': [
    {
      name: 'me'
    },
    {
      name: 'you'
    }
  ]
}

const store = createStore(() => ({
  form: {
    mockForm: {
      values: initialValues
    }
  }
}))

describe('MultiRowField component', () => {
  const requiredProps = {
    name: 'mock-name'
  }

  it('renders correctly', () => {
    const tree = wrap(store)(initialValues)(
      <MultiRowField
        {...requiredProps}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders all what was passed as a props', () => {
    const notRequiredProps = {
      hint: 'mock-hint',
      title: 'mock-title',
      placeholder: 'mock-placeholder'
    }

    const tree = wrap(store)(initialValues)(
      <MultiRowField
        {...requiredProps}
        {...notRequiredProps}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('calls `push` method when Control `Add` was clicked', () => {
    const tree = wrap(store)(initialValues)(
      <MultiRowField
        {...requiredProps}
      />
    ).toJSON()

    expect(tree.children[0].children[0].children[1].props.onClick().type).toBe('@@redux-form/ARRAY_PUSH')
  })

  it('calls `remove` method when Control `Remove` was clicked', () => {
    const wrapper = mount(
      renderFakeForm(store)(initialValues)(
        <MultiRowField
          {...requiredProps}
        />
      )
    )
    const [firstControl, ...removeControls] = wrapper.find('.j-control') // eslint-disable-line

    // first Control for adding, all others for removing
    removeControls.forEach(el =>
      expect(el.props.onClick().type).toBe('@@redux-form/ARRAY_REMOVE')
    )
  })
})
