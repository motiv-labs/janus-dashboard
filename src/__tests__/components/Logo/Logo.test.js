import React from 'react';
import renderer from 'react-test-renderer';

import Logo from '../../../components/Logo/Logo';

describe('Logo component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Logo />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders with additional className if passed', () => {
        const props = {
            className: 'mock-class',
        };
        const tree = renderer
            .create(
                <Logo {...props} />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
