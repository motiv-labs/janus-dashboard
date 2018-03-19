/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

import Modal from '../../../components/Modal/Modal'

describe('Modal component', () => {
  const render = props => mount(<Modal {...props} />)
  const mockFunction = jest.fn()
  const requiredProps = {
    closeModal: mockFunction,
    show: true,
    message: 'Modal test message'
  }

  const runCommonTest = (wrapper, props) => {
    const tree = toJSON(wrapper)
    const [modaliz] = tree.children

    expect(tree.props.show).toEqual(props.show)
    expect(
      wrapper.find('.j-confirmation__text').text()
    ).toEqual(props.message)

    modaliz.props.onClose()
    expect(mockFunction).toHaveBeenCalled()
    expect(tree).toMatchSnapshot()
  }

  beforeEach(() => {
    mockFunction.mockReset()
  })

  it('renders correctly', () => {
    const props = requiredProps
    const wrapper = render(props)

    runCommonTest(wrapper, props)
  })

  it('renders correctly with title if an additional prop `title` is passed', () => {
    const props = {
      ...requiredProps,
      title: 'Modal test title'
    }
    const wrapper = render(props)

    runCommonTest(wrapper, props)
    expect(
      wrapper.find('.j-confirmation__title').text()
    ).toEqual(props.title)
  })

  it('renders correctly with buttons if an additional prop `buttons` is passed', () => {
    const props = {
      ...requiredProps,
      buttons: [
        <button key={1}>Cancel</button>,
        <button key={2}>Confirm</button>
      ]
    }
    const wrapper = render(props)

    runCommonTest(wrapper, props)
    expect(
      wrapper.find('.j-confirmation__buttons-group').containsAllMatchingElements(props.buttons)
    ).toBe(true)
  })
})
