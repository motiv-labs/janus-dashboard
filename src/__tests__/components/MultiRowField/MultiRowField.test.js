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
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Decorated
                        name="mock-name"
                    />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

