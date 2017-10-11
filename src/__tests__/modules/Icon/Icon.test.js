import React from 'react';
import { mount } from 'enzyme';
import Icon from '../../../modules/Icon/Icon';

describe('Icon component', () => {
    it('renders with aria-label if passed', () => {
        const props = {
            ariaLabel: 'aria-label',
        };
        const wrapper = mount(<Icon {...props} />);
    });

    it('h', () => {
        expect(true).toBe(true);
    });
});
