import React from 'react';
import renderer from 'react-test-renderer';

import InfoPanel from '../../../components/InfoPanel/InfoPanel';

describe('InfoPanel component', () => {
    const requiredProps = {
        tesxt: 'mock-text',
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
});
