import React, { PureComponent } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';

import Preloader from '../../Preloader/Preloader';

const propTypes = {
    fetchOAuthServer: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

class OAuthServerItem extends PureComponent {
    componentDidMount() {
        this.props.fetchOAuthServer(this.props.location.pathname);
    }

    render() {
        // Just basic primitive logic to render page. Real logic will be implemented in further PRs
        if (R.isEmpty(this.props.oAuthServer)) return <Preloader />;

        const { name } = this.props.oAuthServer;

        return (
            <p>{name}</p>
        );
    }
}

OAuthServerItem.propTypes = propTypes;

export default OAuthServerItem;
