import React from 'react';
import renderer from 'react-test-renderer';

import Icon, { b } from '../../../components/Icon/Icon';

describe('Icon component', () => {
    const render = props => renderer.create(<Icon {...props} />).toJSON();
    const requiredProps = {
        type: 'add',
    };

    it('renders correctly', () => {
        const props = requiredProps;
        const tree = render(props);
        const className = tree.props.className;

        expect(className).toContain('j-icon');
        expect(className).toContain('j-icon--type-add');
        expect(tree).toMatchSnapshot();
    });

    it('renders with an additional className if passed', () => {
        const props = {
            ...requiredProps,
            className: 'mock-class',
        };
        const tree = render(props);
        const className = tree.props.className;

        expect(className).toContain('j-icon');
        expect(className).toContain('j-icon--type-add');
        expect(className).toContain('mock-class');
        expect(tree).toMatchSnapshot();
    });


    it('renders with an additional ariaLabel if passed', () => {
        const props = {
            ...requiredProps,
            ariaLabel: 'mock-label',
        };
        const tree = render(props);
        const className = tree.props.className;

        expect(className).toContain('j-icon');
        expect(className).toContain('j-icon--type-add');
        expect(tree.props['aria-label']).toContain(props.ariaLabel);
        expect(tree).toMatchSnapshot();
    });

    it('renders with an additional className and ariaLabel if passed', () => {
        const props = {
            ...requiredProps,
            className: 'mock-class',
            ariaLabel: 'mock-label',
        };
        const tree = render(props);
        const className = tree.props.className;

        expect(className).toContain('j-icon');
        expect(className).toContain('j-icon--type-add');
        expect(className).toContain('mock-class');
        expect(tree.props['aria-label']).toContain(props.ariaLabel);
        expect(tree).toMatchSnapshot();
    });

});
