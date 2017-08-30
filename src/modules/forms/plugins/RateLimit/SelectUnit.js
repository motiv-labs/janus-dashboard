import React, { PureComponent} from 'react';
// import PropTypes from 'prop-types';
import Select from 'react-select';

// const propTypes = {
//     className: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     plugin: PropTypes.object.isRequired,
//     pluginName: PropTypes.string.isRequired,
//     handlePluginExclude: PropTypes.func.isRequired,
// };

const options = [
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'Hs', value: 'Hs' },
];

class SelectUnit extends PureComponent {
    state = {
        selectValue: 'M'
    }

    updateValue = newValue => {
        console.clear();
        console.log('New Value: ', newValue);
        this.setState({
            selectValue: newValue
        });
    }

    render() {
        console.error('SelectUnit: ', this.props);
        return (
            <Select
                className="j-select"
                searchable={false}
                options={options}
                simpleValue
                value={this.state.selectValue}
                onChange={this.updateValue}
                onBlur={() => {
                    this.props.input.onBlur(this.state.selectValue);
                }}
            />
        );
    }
};

export default SelectUnit;
