import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './InfoPanel.css';

const propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
};

const b = block('info-panel');

const InfoPanel = ({ icon, text }) => {
    return (
        <div className={b.mix('j-pane')()}>
            {
                icon && icon
            }
            <p className={b('text')()}>{ text }</p>
        </div>
    );
};

InfoPanel.propTypes = propTypes;

export default InfoPanel;
