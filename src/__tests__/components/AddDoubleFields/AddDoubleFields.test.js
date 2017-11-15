import React from 'react';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import createTestForm from '../../../utils/createTestForm';
import { wrap } from '../../../utils/createTestForm';
import AddDoubleFields from '../../../components/AddDoubleFields/AddDoubleFields';

const initialValues = {
    'mock-name': [
        {
            name: 'me',
        },
        {
            name: 'you',
        },
    ]
};

const store = createStore(() => ({
    form: {
        mockForm: {
            values: initialValues,
        }
    }
}));

describe('AddDoubleFields component', () => {
    const requiredProps = {
        name: 'mock-name',
        title: 'mock-title',
        config: [
            {
                name: 'me',
            },
            {
                name: 'you',
            },
        ]
    };

    it('renders correctly', () => {
        const tree = wrap(store)(initialValues)(
            <AddDoubleFields
                {...requiredProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
