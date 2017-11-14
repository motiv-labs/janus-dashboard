import React from 'react';
import renderer from 'react-test-renderer';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

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

// const spy = jest.fn();
const store = createStore(() => ({
    form: {
        mockForm: {
            values: initialValues,
        }
    }
}));

let Form = ({ children, initialValues }) => children;

const _Form = connect(
    () => ({
        initialValues
    }),
    null,
)(
    reduxForm({
        form: 'mockForm',
    })(Form)
);

const renderFakeForm = el => <Provider store={store}>
    <_Form
    >
        {el}
    </_Form>
</Provider>;

describe('MultiRowField component', () => {
    const requiredProps = {
        name: 'mock-name',
    };

    const wrap = el => renderer
        .create(
            renderFakeForm(el)
        );

    it('renders correctly', () => {
        const tree = wrap(
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

        const tree = wrap(
            <MultiRowField
                {...requiredProps}
                {...notRequiredProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('calls `push` method when Control `Add` was clicked', () => {
        const tree = wrap(
            <MultiRowField
                {...requiredProps}
            />
        ).toJSON();

        expect(tree.children[0].children[0].children[1].props.onClick().type).toBe('@@redux-form/ARRAY_PUSH');
    });

    it('calls `remove` method when Control `Remove` was clicked', () => {
        const wrapper = mount(
            renderFakeForm(
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
