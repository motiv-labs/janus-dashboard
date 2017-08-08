import React, { Component } from 'react';
import { Creatable } from 'react-select';

import './TagSelect.css';

class TagSelect extends Component {
    state = {
        multi: true,
        multiValue: [],
        options: this.props.options,
    }

    handleOnChange = value => {
        this.setState((prevState, props) => ({ multiValue: value }));
        this.props.input.onChange(value.split(','));
    }

    render() {
        const { multi, multiValue, options } = this.state;
        return (
            <Creatable
                {...this.props}
                className="j-tags-select"
                placeholder={this.props.placeholder}
                multi={multi}
                simpleValue
                options={this.state.options}
                onChange={this.handleOnChange}
                value={multiValue}
            />
        );
    }
}

export default TagSelect;
