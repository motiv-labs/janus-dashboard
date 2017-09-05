import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class SimpleSelect extends Component {
    state = {
        selectValue: this.props.input.value ? this.props.input.value : '',
    }

    updateValue = (newValue) => {
        this.setState({
            selectValue: newValue
        });
    }

    render() {
        return (
            <Select
                className="j-select"
                {...this.props.input}
                value={this.state.selectValue}
                onChange={this.updateValue}
                simpleValue
                searchable={this.props.searchable}
                clearable={this.props.clearable}
                options={this.props.options}
                onBlur={() => {
                    this.props.input.onBlur(this.state.selectValue);
                }}
            />
        );
    }
};

SimpleSelect.propTypes = propTypes;

export default SimpleSelect;
