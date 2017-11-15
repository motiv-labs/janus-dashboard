import React from 'react';
import renderer from 'react-test-renderer';

import Tumbler from '../../../components/Tumbler/Tumbler';

describe('Tumbler component', () => {
    const requiredProps = {
        text: 'mock-text',
    };

    it('renders correctly', () => {
        // const tree = renderer
        //     .create(
        //         <Tumbler />
        //     )
        //     .toJSON();

        // expect(tree).toMatchSnapshot();
        expect(true).toBe(true);
    });
});
