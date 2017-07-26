import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from '../Layout/Section/Section';
import FormRow from '../forms/FormRow';
import FormLabel from '../forms/FormLabel';

const propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
};

const styles = {
    plus: {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        marginRight: '20px',
        backgroundColor: '#7957d5',
        borderRadius: '3px',
        color: '#fff',
        textAlign: 'center',
        cursor: 'pointer',
    },
};

class PluginSection extends Component {
    state = {
        isExpended: false,
    };

    test = () => {
        this.setState(prevState => ({ isExpended: !prevState.isExpended }));
    }

    render() {
        return (
            <Section>
                <FormRow alignY>
                    <span
                        style={styles.plus}
                        onClick={this.test}
                    >
                        {this.state.isExpended ? '↑' : '↓'}
                    </span>
                    <FormLabel text={`${this.props.name} plugin`} />
                </FormRow>

                {
                    this.state.isExpended &&
                        <FormRow>{ this.props.children }</FormRow>
                }

            </Section>
        );
    }
}

PluginSection.propTypes = propTypes;

export default PluginSection;
