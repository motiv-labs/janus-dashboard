import React from 'react';
import { createStore } from 'redux';

import { wrap } from '../../../utils/createTestForm';
import Tumbler from '../../../components/Tumbler/Tumbler';

const initialValues = {
    'mock-name': '',
};

const store = createStore(() => ({
    form: {
        mockForm: {
            values: initialValues,
        }
    }
}));

describe('Tumbler component', () => {
    const requiredProps = {
        name: 'mock-name',
    };

    it('renders correctly', () => {
        const tree = wrap(store)(initialValues)(
            <Tumbler
                {...requiredProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
