import React, { Component } from 'react';
import { Creatable } from 'react-select';

import './TagSelect.css';

class TagSelect extends Component {
    state = {
        multi: true,
        multiValue: [],
        options: this.props.options,
    }

    componentWillReceiveProps = nextProps => {
        // console.error('____NEXT_PROPS:', nextProps);
        // if (nextProps.input.value !== this.props.input.value) {
        //     this.setState({ multiValue: nextProps.input.value });
        // }
        if (nextProps.edit) {
            this.setState({ multiValue: nextProps.input.value });
        }
    }

    handleOnChange = value => {
        this.setState((prevState, props) => ({ multiValue: value }));
        this.props.input.onChange(value.split(','));
    }

    render() {
        const { multi, multiValue } = this.state;
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
