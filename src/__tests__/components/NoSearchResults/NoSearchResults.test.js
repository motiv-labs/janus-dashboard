/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import NoSearchResults from '../../../components/NoSearchResults/NoSearchResults'

describe('NoSearchResults component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NoSearchResults
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
