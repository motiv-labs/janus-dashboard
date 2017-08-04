import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from '../Layout/Row/Row';
import Label from '../labels/Label';
import Input from '../inputs/Input';

import Section from '../Layout/Section/Section';
import FormRow from '../forms/FormRow';
import FormLabel from '../forms/FormLabel';

const propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
};

class PluginSection extends Component {
    state = {
        isExpended: true,
    };

    test = () => {
        this.setState(prevState => ({ isExpended: !prevState.isExpended }));
    }

    render() {
        return (
            <Section>
                <Row>
                    <Row col>
                        <Label>Plugin Name</Label>
                        <Input input={{value: this.props.name}} disabled />
                    </Row>
                </Row>
                <FormRow>{ this.props.children }</FormRow>
            </Section>
        );
    }
}

PluginSection.propTypes = propTypes;

export default PluginSection;
