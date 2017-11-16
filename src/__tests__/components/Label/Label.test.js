import React from 'react';
import renderer from 'react-test-renderer';

import Label from '../../../components/Label/Label';

describe('Label component', () => {
    const renderWithRequiredProps = props => renderer.create(
        <Label
            {...props}
        />
    ).toJSON();

    it('renders correctly', () => {
        const passedProps = {
            children: 'mock-text',
            htmlFor: 'mock-target',
        };
        const tree = renderWithRequiredProps(passedProps);

        expect(tree).toMatchSnapshot();
    });

    it('renders with single child, if `children` is not a String', () => {
        const passedProps = {
            children: <p>mock-child</p>,
        };
        const tree = renderWithRequiredProps(passedProps);

        expect(tree).toMatchSnapshot();
    });

    it('renders with all children,  if `children` is not a String', () => {
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
});
