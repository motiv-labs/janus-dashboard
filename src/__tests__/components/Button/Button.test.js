import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import Button from '../../../components/Button/Button';

describe('Button component', () => {
    const requiredProps = {
        mod: 'primary',
    };

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

        const tree = renderer
            .create(
                <Button
                    {...requiredProps}
                    {...passedProps}
                />
            )
            .toJSON();

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

        const tree = renderer
            .create(
                <Button
                    {...requiredProps}
                    {...passedProps}
                />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
