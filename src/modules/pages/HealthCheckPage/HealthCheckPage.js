import React from 'react';
import PropTypes from 'prop-types';

import SearchingContainer from '../../SearchBar/searchContainer';
import HealthCheckContainer from './healthCheckContainer';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';

const propTypes = {
    location: PropTypes.object.isRequired,
};

const HealthCheckPage = ({ location }) => (
    <div>
        <Section>
            <Section>
                <Row>
                    <Title>Health Check</Title>
                    <Row>
                        <SearchingContainer />
                    </Row>
                </Row>
            </Section>
            <Section>
                <HealthCheckContainer />
            </Section>
        </Section>
    </div>
);

HealthCheckPage.propTypes = propTypes;

export default HealthCheckPage;
