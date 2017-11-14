import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import createTestForm from '../../../utils/createTestForm';
import MultiRowField from '../../../components/MultiRowField/MultiRowField';

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

describe('MultiRowField component', () => {
    const requiredProps = {
        name: 'mock-name',
    };

    it('renders correctly', () => {
        const tree = wrap(store)(
            <MultiRowField
                {...requiredProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders all what was passed as a props', () => {
        const notRequiredProps = {
            hint: 'mock-hint',
            title: 'mock-title',
            placeholder: 'mock-placeholder',
        };

        const tree = wrap(store)(
            <MultiRowField
                {...requiredProps}
                {...notRequiredProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('calls `push` method when Control `Add` was clicked', () => {
        const tree = wrap(store)(
            <MultiRowField
                {...requiredProps}
            />
        ).toJSON();

        expect(tree.children[0].children[0].children[1].props.onClick().type).toBe('@@redux-form/ARRAY_PUSH');
    });

    it('calls `remove` method when Control `Remove` was clicked', () => {
        const wrapper = mount(
            renderFakeForm(store)(
                <MultiRowField
                    {...requiredProps}
                />
            )
        );
        const [firstControl, ...removeControls] = wrapper.find('.j-control');

        // first Control for adding, all others for removing
        removeControls.forEach(el =>
            expect(el.props.onClick().type).toBe('@@redux-form/ARRAY_REMOVE')
        );
    });
});
