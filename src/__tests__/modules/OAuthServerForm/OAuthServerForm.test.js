import React from 'react';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import schema from '../../../configurations/oAuthServerSchema.config';
import { renderFakeForm } from '../../../utils/createTestForm';

import OAuthServerForm from '../../../modules/pages/NewOAuthServerPage/OAuthServerForm';

const initialValues = {
    name: 'mock-name',
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
