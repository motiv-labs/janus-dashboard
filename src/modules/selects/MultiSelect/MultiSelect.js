import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired
}

class MultiSelect extends Component {
    state = {
      options: this.props.options,
      value: []
    }

    componentWillReceiveProps = nextProps => {
      if (nextProps.edit) {
        this.setState({ value: nextProps.input.value })
      }
    }

    handleSelectChange = value => {
      this.setState((prevState, props) => ({ value }), this.props.input.onChange(value.split(',')))
    }

    render () {
      return (
        <Select
          {...this.props}
          multi
          simpleValue
          className='j-select'
          value={this.state.value}
          placeholder='Choose one or more methods'
          options={this.props.options}
          onChange={this.handleSelectChange}
          onBlur={() => this.props.input.onBlur(this.props.input.value)}
        />
      )
    }
};

MultiSelect.propTypes = propTypes

export default MultiSelect
