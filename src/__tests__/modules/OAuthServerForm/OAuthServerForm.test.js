import React from 'react';
import R from 'ramda';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import schema from '../../../configurations/oAuthServerSchema';
import { renderFakeForm, wrap } from '../../../utils/createTestForm';

import OAuthServerForm from '../../../modules/pages/NewOAuthServerPage/OAuthServerForm';

const initialValues = {
    token_strategy: {
        name: 'mock-name',
    },
    oauth_endpoints: {},
    oauth_client_endpoints: {},
};

const store = createStore(() => ({
    form: {
        mockForm: {
            values: initialValues,
        }
    }
}));

const api = {
    name: 'mock-api'
};

describe('EndpointForm component', () => {
    const requiredProps = {
        schema,
        handleSubmit: jest.fn(),
        initialValues,
    };

    it('renders correctly', () => {
        const passedProps = {
            editing: false,
        };
        const wrapper = mount(
            renderFakeForm(store)(initialValues)(
                <OAuthServerForm
                    {...requiredProps}
                    {...passedProps}
                />
            )
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly if property `editing` is passed', () => {
        const passedProps = {
            editing: true,
        };
        const wrapper = mount(
            renderFakeForm(store)(initialValues)(
                <OAuthServerForm
                    {...requiredProps}
                    {...passedProps}
                />
            )
        );

        expect(wrapper).toMatchSnapshot();
    });
});
