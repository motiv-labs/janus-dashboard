import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './MultiSelect.css';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class MultiSelect extends Component {
    state = {
        options: this.props.options,
        // value: this.props.input.value,
        value: [],
    }

    componentDidMount = () => {
        // console.error('MultiSelect did mount', this.props)
        // this.setState({ value: this.props.input.value });
    }

    componentWillReceiveProps = nextProps => {
        // console.error('MultiSelect:');
        // console.error(this.props.input.name);
        // console.error('MultiSelect____PROPS:', this.props.input.value);
        // console.error('MultiSelect____NEXT_PROPS:', nextProps.input.value);
        // console.error('NEXT_PROPS:', nextProps);
        // if (nextProps.input.value !== this.props.input.value) {
        //     this.setState({ value: nextProps.input.value });
        // }
        if (nextProps.edit) {
            this.setState({ value: nextProps.input.value });
        }
        // this.setState({ value: nextProps.input.value });
    }

    handleSelectChange = value => {
        this.setState((prevState, props) => ({ value }), this.props.input.onChange(value.split(',')));
    }

    render() {
        console.warn('MULTI_THIS>PROPS:', this.props);
        // console.error('MULTI__THIS>STATE: ', this.state);
        return (
            <Select
                {...this.props}
                multi
                simpleValue
                className="j-multiselect"
                value={this.state.value}
                placeholder="Choose one or more methods"
                options={this.props.options}
                onChange={this.handleSelectChange}
                onBlur={() => this.props.input.onBlur(this.props.input.value)}
            />
        );
    }
};

MultiSelect.propTypes = propTypes;

export default MultiSelect;
