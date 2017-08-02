import React from 'react';

import block from '../../../helpers/bem-cn';

import './Radio.css';

const radio = block('j-radio');

const Radio = () => {
    return (
        <div className={radio('wrap')}>
            <input type="radio" name="testRadio" id="testRadio-2" className={radio('input')} />
            <div className={radio('d1')}>
                <div className={radio('d2')}>
                    <div>
                        <svg className={radio('svg', { '1': true })} viewBox="0 0 24 24">
                            <path className={radio('path')} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        </svg>
                        <svg className={radio('svg', { '2': true })}viewBox="0 0 24 24" >
                            <path className={radio('path')} d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        </svg>
                    </div>
                </div>
                <label className="j-m-radio__label" htmlFor="testRadio-2">Label 1</label>
            </div>
        </div>
    );
};

export default Radio;
