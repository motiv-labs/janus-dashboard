import React from 'react';

import block from '../../helpers/bem-cn';

import './Radio.css';

const radio = block('j-radio');

const Radio = props => {
    const { input, id, name } = props;

    return (
        <div className={radio('wrap')()}>
            <input
                className={radio('input')()}
                type="radio"
                name={name}
                id={id}
                {...input}
            />
            <div className={radio('d1')()}>
                <div className={radio('d2')()}>
                    <div>
                        <svg className={radio('svg', { '1': true })()} viewBox="0 0 24 24">
                            <path className={radio('path')} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        </svg>
                        <svg className={radio('svg', { '2': true })()}viewBox="0 0 24 24" >
                            <path className={radio('path')} d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Radio;
