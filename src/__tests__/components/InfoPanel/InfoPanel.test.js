import React from 'react';
import renderer from 'react-test-renderer';

import InfoPanel from '../../../components/InfoPanel/InfoPanel';

describe('InfoPanel component', () => {
    const requiredProps = {
        text: 'mock-text',
    };

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <InfoPanel
                    {...requiredProps}
                />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders icon if passed', () => {
        const passedProps = {
            icon: 'mock-node',
        };
        const tree = renderer
            .create(
                <InfoPanel
                    {...requiredProps}
                    {...passedProps}
                />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
