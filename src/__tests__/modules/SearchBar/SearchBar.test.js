import React from 'react';
import renderer from 'react-test-renderer';

import SearchBar from '../../../modules/SearchBar/SearchBar';

describe('SearchBar component', () => {
    const passedProps = {
        discardPagination: jest.fn(),
        placeholder: 'Search...',
        searchQuery: '',
        setSearchQuery: jest.fn(),
    };

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <SearchBar
                    {...passedProps}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('handles onChange', () => {
        const otherProps = {
            placeholder: 'Search...',
            searchQuery: '',
        };

        it('triggers discarding pagination', () => {
            const discardPagination = jest.fn();
            const component = renderer.create(
                <SearchBar
                    discardPagination={discardPagination}
                    setSearchQuery={passedProps.setSearchQuery}
                    {...otherProps}
                />
            );

            let tree = component.toJSON();
            tree.children[1].props.onChange({ target: { value: 'some'}});

            expect(discardPagination).toBeCalled();

            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('triggers setting new search query', () => {
            const setSearchQuery = jest.fn()
                .mockReturnValue('default');
            const component = renderer.create(
                <SearchBar
                    discardPagination={passedProps.discardPagination}
                    setSearchQuery={setSearchQuery}
                    {...otherProps}
                />
            );

            let tree = component.toJSON();
            tree.children[1].props.onChange({ target: { value: 'some'}});

            expect(setSearchQuery).toBeCalled();

            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
