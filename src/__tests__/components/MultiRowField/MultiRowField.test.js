import React from 'react';
import renderer from 'react-test-renderer';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Row from '../../../modules/Layout/Row/Row';
import MultiRowField from '../../../components/MultiRowField/MultiRowField';

const spy = jest.fn();
const store = createStore(() => ({}));

const Decorated = reduxForm({ form: 'testForm' })(MultiRowField);

describe('MultiRowField component', () => {
    const requiredProps = {
        name: 'mock-name',
    };

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Decorated
                        {...requiredProps}
                    />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders all what was passed as a props', () => {
        const notRequiredProps = {
            hint: 'mock-hint',
            title: 'mock-title',
            placeholder: 'mock-placeholder',
        };
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Decorated
                        {...requiredProps}
                        {...notRequiredProps}
                    />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
