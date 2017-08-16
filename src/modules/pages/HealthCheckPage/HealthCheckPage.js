import React from 'react';
import PropTypes from 'prop-types';

import HealthCheckContainer from './healthCheckContainer';

import Section from '../../Layout/Section/Section';
import Title from '../../Layout/Title/Title';

const propTypes = {
    location: PropTypes.object.isRequired,
};

const HealthCheckPage = ({ location }) => (
    <div>
        <Section>
            <Title>Health Check</Title>
        </Section>
        <Section>
            <HealthCheckContainer location={location} />
        </Section>
    </div>
);

HealthCheckPage.propTypes = propTypes;

export default HealthCheckPage;
