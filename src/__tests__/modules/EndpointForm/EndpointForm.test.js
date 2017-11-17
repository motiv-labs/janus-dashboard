import React from 'react';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import apiSchema from '../../../configurations/apiSchema.config';
import { renderFakeForm, wrap } from '../../../utils/createTestForm';

import EndpointForm from '../../../modules/forms/EndpointForm/EndpointForm';

const initialValues = {
    proxy: {
        upstreams: 'sdeded'
    },
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
        name: 'mock-name',
        api: {},
        apiSchema,
        disabled: true,
        excludePlugin: jest.fn(),
        handleDelete: jest.fn(),
        handleSubmit: jest.fn(),
        initialValues,
        selectPlugin: jest.fn(),
        selectedPlugins: ['a', 'b'],
    };

    it('renders correctly', () => {
        const wrapper = mount(
            renderFakeForm(store)(initialValues)(
                <EndpointForm
                    {...requiredProps}
                />
            )
        );

        expect(wrapper).toMatchSnapshot();
    });
});
