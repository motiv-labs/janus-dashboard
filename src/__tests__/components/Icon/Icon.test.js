import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Icon, { b } from '../../../components/Icon/Icon';

configure({ adapter: new Adapter() });

const toFindByClassNames = classNames => tag => `${tag}.${classNames.split(' ').join('.')}`;

describe('Icon component', () => {
    const required = {
        type: 'add',
    };

    it('renders with className depends on `type` prop', () => {
        const props = required;
        const wrapper = mount(<Icon {...props} />);

        expect(wrapper.find(
            toFindByClassNames(b({ type: props.type })())('span')
        ).length).toEqual(1);
    });

    it('renders with an additional className if passed', () => {
        const props = {
            ...required,
            className: 'mock-class',
        };
        const wrapper = mount(<Icon {...props} />);

        expect(wrapper.find(
            toFindByClassNames(b({ type: props.type }).mix(props.className))('span')
        ).length).toEqual(1);
    });

    it('renders with an extra additional className if aria-label is passed', () => {
        const props = {
            ...required,
            className: 'mock-class',
            ariaLabel: 'aria-label',
        };
        const wrapper = mount(<Icon {...props} />);

        expect(wrapper.find(
            toFindByClassNames(
                b({ type: props.type })
                    .mix(props.className)
                    .mix(props.ariaLabel && 'j-tooltiped')
                )('span')
        ).length).toEqual(1);
    });

    it('renders with aria-label if passed', () => {
        const props = {
            ...required,
            ariaLabel: 'aria-label',
        };
        const wrapper = mount(<Icon {...props} />);

        expect(wrapper.find(
            `span[aria-label="${props.ariaLabel}"]`
        ).length).toEqual(1);
    });
});
