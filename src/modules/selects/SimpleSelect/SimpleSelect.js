import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// import './MultiSelect.css';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// class SimpleSelect extends Component {
//     // state = {
//     //     options: this.props.options,
//     //     value: {},
//     // }

//     // handleSelectChange = value => {
//     //     this.setState((prevState, props) => ({ value }), this.props.input.onChange({ value }));
//     // }

//     render() {
//         console.error('THIS>PROPS', this.props)
//         return (
//             <Select
//                 {...this.props}
//                 className="j-select"
//                 simpleValue
//                 value={this.props.input.value}
//                 options={this.props.options}
//                 onChange={this.props.input.onChange}
//                 onBlur={() => this.props.input.onBlur(this.props.input.value)}
//             />
//         );
//     }
// };
// const SimpleSelect = ({ name, options, input }) => {
//     return (
//         <Select
//             className="j-select"
//             name={name}
//             options={options}
//             onChange={(e, value) => {
//                 console.error('VALUE': e)
//                 input.onChange(input.value)
//             }}
//             onBlur={() => input.onBlur(input.value)}
//         />
//     );
// };
class SimpleSelect extends Component {
    handleOnChange = value => {
        console.log(value);
        this.props.input.onChange(value.value);
    }
    render() {
        console.error('THIS>PROPS>', this.props);
        return (
            <Select
                {...this.props}
                value={this.props.input.value}
                className="j-select"
                onChange={this.handleOnChange}
                onBlur={this.handleOnChange}
            />
        );
    }
};

SimpleSelect.propTypes = propTypes;

export default SimpleSelect;
