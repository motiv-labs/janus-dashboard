import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import createTestForm from '../../../utils/createTestForm';
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

const ConnectedForm = createTestForm(initialValues);

const renderFakeForm = store => el =>
    <Provider store={store}>
        <ConnectedForm>
            {el}
        </ConnectedForm>
    </Provider>;

const wrap = store => el => renderer
    .create(
        renderFakeForm(store)(el)
    );

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
        const tree = wrap(store)(
            <AddDoubleFields
                {...requiredProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
