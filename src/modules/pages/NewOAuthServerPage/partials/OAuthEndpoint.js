import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Field } from 'redux-form';

import PLACEHOLDER from '../../../../configurations/placeholders.config';
import block from '../../../../helpers/bem-cn';
import checkOnPattern from '../../../../helpers/pattern-check';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Radio from '../../../inputs/Radio/Radio';
import Input from '../../../inputs/Input';
import Hint from '../../../labels/Hint/Hint';
import SimpleSelect from '../../../selects/SimpleSelect/SimpleSelect';
import MultiSelect from '../../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../../selects/TagSelect/TagSelect';

const b = block('j-api-form');
const row = block('j-row');
const col = block('j-col');
const grid = block('j-grid');

const propTypes = {
    endpoint: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

const OAuthEndpoint = ({ endpoint, name, schema }) => {
    const createOptions = (list1, list2) => {
        const combinedListOfUnitsAndLabels = R.zip(list1, list2);

        return combinedListOfUnitsAndLabels.map(item => ({
            label: item[1],
            value: item[0],
        }));
    };
    const optionsTransformer = config => config.map(item => ({
        label: item,
        value: item,
    }));

    return (
        <div className={b('section')}>
            <div className={b('section-title')}>{name}</div>
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <div className={row('item')}>
                    <div className={col()}>
                        <div className={col('item')}>
                            <Label>Listen Path</Label>
                        </div>
                        <Field
                            name={`oauth_endpoints[${name}].listen_path`}
                            type="text"
                            placeholder={PLACEHOLDER.LISTEN_PATH}
                            component={Input}
                            validate={checkOnPattern('/')}
                        />
                        <span className="j-input__warning">Listen path should start from '/'</span>
                        <Hint>The public url that is exposed by the Gateway</Hint>
                    </div>
                </div>
                <div className={row('item')}>
                    <div className={col()}>
                        <div className={col('item')}>
                            <Label>Upstream URL</Label>
                        </div>
                        <Field
                            name={`oauth_endpoints[${name}].upstream_url`}
                            type="text"
                            component={Input}
                            placeholder={PLACEHOLDER.UPSTREAM_URL}
                            validate={checkOnPattern(['http://', 'https://'])}
                        />
                        <span className="j-input__warning">Upstream url should start as url ('http://' or 'https://')</span>
                        <Hint>The url to which the Gateway forwards requests made to the public url.</Hint>
                    </div>
                </div>
            </div>
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <div className={row('item')}>
                    <Label>Insecure skip verify?</Label>
                    <Row className={b('radio-wrap')()}>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].insecure_skip_verify`}
                                component={Radio}
                                value={'true'}
                                type="radio"
                                id="is-active"
                            />
                            <Label htmlFor="is-active">Yes</Label>
                        </Row>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].insecure_skip_verify`}
                                component={Radio}
                                value={'false'}
                                type="radio"
                                id="is-not-active"
                            />
                            <Label htmlFor="is-not-active">No</Label>
                        </Row>
                    </Row>
                </div>
                <div className={row('item')}>
                    <Label>Preserve host?</Label>
                    <Row className={b('radio-wrap')()}>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].preserve_host`}
                                component={Radio}
                                value={'true'}
                                type="radio"
                                id="is-active"
                            />
                            <Label htmlFor="is-active">Yes</Label>
                        </Row>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].preserve_host`}
                                component={Radio}
                                value={'false'}
                                type="radio"
                                id="is-not-active"
                            />
                            <Label htmlFor="is-not-active">No</Label>
                        </Row>
                    </Row>
                </div>
            </div>
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <div className={row('item')}>
                    <Label>Append path?</Label>
                    <Row className={b('radio-wrap')()}>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].append_path`}
                                component={Radio}
                                value={'true'}
                                type="radio"
                                id="is-active"
                            />
                            <Label htmlFor="is-active">Yes</Label>
                        </Row>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].append_path`}
                                component={Radio}
                                value={'false'}
                                type="radio"
                                id="is-not-active"
                            />
                            <Label htmlFor="is-not-active">No</Label>
                        </Row>
                    </Row>
                </div>
                <div className={row('item')}>
                    <Label>Strip path?</Label>
                    <Row className={b('radio-wrap')()}>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].strip_path`}
                                component={Radio}
                                value={'true'}
                                type="radio"
                                id="is-active"
                            />
                            <Label htmlFor="is-active">Yes</Label>
                        </Row>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].strip_path`}
                                component={Radio}
                                value={'false'}
                                type="radio"
                                id="is-not-active"
                            />
                            <Label htmlFor="is-not-active">No</Label>
                        </Row>
                    </Row>
                </div>
            </div>
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <div className={row('item')}>
                    <Label>Enable load balancing?</Label>
                    <Row className={b('radio-wrap')()}>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].enable_load_balancing`}
                                component={Radio}
                                value={'true'}
                                type="radio"
                                id="is-active"
                            />
                            <Label htmlFor="is-active">Yes</Label>
                        </Row>
                        <Row className={b('radio')()}>
                            <Field
                                name={`oauth_endpoints[${name}].enable_load_balancing`}
                                component={Radio}
                                value={'false'}
                                type="radio"
                                id="is-not-active"
                            />
                            <Label htmlFor="is-not-active">No</Label>
                        </Row>
                    </Row>
                </div>
                <div className={row('item')}>
                    <div className={col()}>
                        <Label>Methods</Label>
                        <Field
                            name={`oauth_endpoints[${name}].methods`}
                            type="text"
                            edit={false}
                            value={`oauth_endpoints[${name}].methods`}
                            options={optionsTransformer(schema.oauth_endpoints[name].methods)}
                            component={MultiSelect}
                        />
                        <Hint>HTTP methods that are supported for the endpoint.</Hint>
                    </div>
                </div>
            </div>
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <div className={row('item')}>
                    <div className={col()}>
                        <Label>Hosts</Label>
                        <Field
                            name={`oauth_endpoints[${name}].hosts`}
                            type="text"
                            edit={false}
                            value={`oauth_endpoints[${name}].hosts`}
                            options={optionsTransformer(schema.cors_meta.methods)}
                            component={TagSelect}
                        />
                        <Hint>HTTP methods that are supported for the endpoint.</Hint>
                    </div>
                </div>
            </div>
        </div>
    );
};

OAuthEndpoint.propTypes = propTypes;

export default OAuthEndpoint;
