import React from 'react';
import renderer from 'react-test-renderer';
import BubblePreloader from 'react-bubble-preloader';

import Preloader from '../../../components/Preloader/Preloader';

describe('Preloader component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Preloader />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
