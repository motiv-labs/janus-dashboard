import React from 'react';

import block from '../../helpers/bem-cn';

import './CopyToClipboard.css';

const cn = block('copy-to-clipboard');

const copyToClipboard = value => {
    const fakeInput = document.createElement('textarea');

    fakeInput.value = value;
    document.body.appendChild(fakeInput);
    fakeInput.select();
    document.execCommand('copy');
    document.body.removeChild(fakeInput);
};

const CopyToClipboard = ({ children, value }) => (
    <div className={cn()}>
        <span
            className={cn('control')}
            onClick={() => copyToClipboard(value)}
        >
            Copy to clipboard
        </span>
        { children }
    </div>
);

export default CopyToClipboard;
