import React, { Component } from 'react';
import { Creatable } from 'react-select';

import './TagSelect.css';

class TagSelect extends Component {
    state = {
        multi: true,
        multiValue: [],
        options: this.props.options,
        value: undefined,
    }

    handleOnChange = value => {
        const { multi } = this.state;
        console.error('VAL::: ', value);
        console.log(this.props);

        if (multi) {
            this.setState((prevState, props) => ({ multiValue: value }), this.props.input.onChange(value.split(',')));
        } else {
            this.setState((prevState, props) => ({ value }), this.props.input.onChange(this.state.value.split(',')));
        }
    }

    render() {
        const { multi, multiValue, options, value } = this.state;
        return (
            <Creatable
                {...this.props}
                className="j-tags-select"
                placeholder={this.props.placeholder}
                multi={multi}
                simpleValue
                options={this.state.options}
                onChange={this.handleOnChange}
                value={multi ? multiValue : value}
            />
        );
    }
}

export default TagSelect;
