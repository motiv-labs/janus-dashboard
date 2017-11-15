import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import Button from '../../../components/Button/Button';

describe('Button component', () => {
    const requiredProps = {
        mod: 'primary',
    };
    const renderWithRequiredProps = props => renderer.create(
        <Button
            {...requiredProps}
            {...props}
        />
    ).toJSON();

    it('renders correctly with all possible `mod`s', () => {
        const mod = [
            'primary',
            'danger',
            'default',
            'github',
            'white',
        ];

        mod.forEach(el => {
            const tree = renderer
                .create(
                    <Button
                        mod={el}
                    />
                )
                .toJSON();

            expect(tree).toMatchSnapshot();
        });
    });

    it('renders with single child', () => {
        const passedProps = {
            children: <p>mock-child</p>,
        };
        const tree = renderWithRequiredProps(passedProps);

        expect(tree).toMatchSnapshot();
    });

    it('renders with all children', () => {
        const passedProps = {
            children: [
                <p key="1">mock-child-1</p>,
                <p key="2">mock-child-2</p>,
                <p key="3">mock-child-3</p>
            ],
        };
        const tree = renderWithRequiredProps(passedProps);

        expect(tree).toMatchSnapshot();
    });

    it('renders with an additional className if passed', () => {
        const passedProps = {
            className: 'mock-class',
        };
        const tree = renderWithRequiredProps(passedProps);
        const className = tree.props.className;

        expect(className).toContain('j-button');
        expect(className).toContain(`j-button--${requiredProps.mod}`);
        expect(className).toContain('mock-class');
        expect(tree).toMatchSnapshot();
    });
});
