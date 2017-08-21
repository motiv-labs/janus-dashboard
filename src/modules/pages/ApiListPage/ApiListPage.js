import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchingContainer from '../../SearchBar/searchContainer';
import ApiListContainer from './apiListContainer';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Button from '../../buttons/Button';
import UnhealthyReport from '../HealthCheckPage/UnhealthyReport';

const ApiListPage = ({ healthcheckStatus }) => {
    const renderHealthcheckInfo = () => {
        if (!healthcheckStatus && healthcheckStatus !== null) {
            return (
                <UnhealthyReport />
            );
        }

        return null;
    };

    return (
        <div>
            <Section>
                <Section>
                    <Row>
                        <Title>APIs</Title>
                        <Row>
                            <SearchingContainer />
                            <Link to="/new">
                                <Button mod="primary" label="Create New Api">+ Create New API</Button>
                            </Link>
                        </Row>
                    </Row>
                </Section>
                { renderHealthcheckInfo() }
                <Section>
                    <ApiListContainer />
                </Section>
            </Section>
        </div>
    );
};

const mapStateToProps = state => ({
    healthcheckStatus: state.healthcheckReducer.status,
});

export default connect(
    mapStateToProps,
    null,
)(ApiListPage);
