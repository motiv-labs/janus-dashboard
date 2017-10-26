import React, { Component } from 'react';
import { Creatable } from 'react-select';
import R from 'ramda';

class TagSelect extends Component {
    state = {
        multi: true,
        multiValue: [],
        options: this.props.options,
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.edit) {
            // because it could be user custom tag, we need to put in
            // into list of options:
            const computedOptions = (values, options) => {
                const allOptions = values.reduce((acc, value) => {
                    const transformedValue = {
                        value,
                        label: value,
                    };

                    acc.push(transformedValue);

                    return acc;
                }, options);

                return R.uniq(allOptions);
            };

            this.setState({
                multiValue: nextProps.input.value,
                options: computedOptions(nextProps.input.value, nextProps.options),
            });
        }
    }

    handleOnChange = value => {
        this.setState((prevState, props) => ({ multiValue: value }));
        this.props.input.onChange((value) ? value.split(',') : []);
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
