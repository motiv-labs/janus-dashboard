/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Control from '../../../components/Control/Control'

describe('Control component', () => {
  const render = props => renderer.create(<Control {...props} />).toJSON()
  const mockFunction = jest.fn()
  const requiredProps = {
    icon: 'add',
    onClick: mockFunction
  }
  const runCommonTest = tree => {
    const icon = tree.children[0]
    expect(tree.props.className).toContain('j-control')
    expect(icon.props.className).toContain('j-icon')
    expect(icon.props.className).toContain('j-icon--type-add')
    tree.props.onClick()
    expect(mockFunction).toHaveBeenCalled()
    expect(tree).toMatchSnapshot()
  }

  beforeEach(() => {
    mockFunction.mockReset()
  })

  it('renders correctly', () => {
    const props = requiredProps
    const tree = render(props)

    runCommonTest(tree)
  })

  it('renders with an additional className if passed', () => {
    const props = {
      ...requiredProps,
      className: 'mock-class'
    }
    const tree = render(props)

    runCommonTest(tree)
    expect(tree.props.className).toContain('mock-class')
  })

  it('renders with an additional ariaLabel if passed', () => {
    const props = {
      ...requiredProps,
      ariaLabel: 'mock-label'
    }
    const tree = render(props)
    const icon = tree.children[0]

    runCommonTest(tree)
    expect(icon.props['aria-label']).toContain(props.ariaLabel)
  })

  it('renders with an additional className and ariaLabel if passed', () => {
    const props = {
      ...requiredProps,
      className: 'mock-class',
      ariaLabel: 'mock-label'
    }
    const tree = render(props)
    const icon = tree.children[0]

    runCommonTest(tree)
    expect(tree.props.className).toContain('mock-class')
    expect(icon.props['aria-label']).toContain(props.ariaLabel)
  })
})
