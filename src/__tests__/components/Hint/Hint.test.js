/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Hint from '../../../components/Hint/Hint'

describe('Hint component', () => {
  it('renders correctly', () => {
    const passedProps = {
      children: 'mock-text'
    }

    const tree = renderer
      .create(
        <Hint
          {...passedProps}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
