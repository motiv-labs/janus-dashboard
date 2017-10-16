import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import PLACEHOLDER from '../../../configurations/placeholders.config';

import transformFormValues from '../../../helpers/transformFormValues';
import block from '../../../helpers/bem-cn';
import checkOnPattern from '../../../helpers/pattern-check';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';
import MultiSelect from '../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../selects/TagSelect/TagSelect';

import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/plugins/RenderPlugins';

// import './NewApiForm.css';

const b = block('j-api-form');
const col = block('j-col');

const propTypes = {
    schema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // initialValues: PropTypes.object,
};

const OAuthServerForm = props => {
    const {
        handleSubmit,
        schema,

        apiSchema,
        includePlugin,
        removePlugin,
        initialValues,
        plugins,
        excludePlugin,
        selectPlugin,
        selectedPlugins,
    } = props;
    const parse = value => value && parseInt(value);
    const optionsTransformer = config => config.map(item => ({
        label: item,
        value: item,
    }));

    return (
        <form className={b} onSubmit={handleSubmit}>
            <Section>
                <Row>
                    <Title>Create New oAuth Server</Title>
                </Row>
            </Section>
            <div className={b('inner')}>
                <div className={b('section')}>
                    <div className={b('section-title')}>1. General</div>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>oAuth Server Name</Label>
                            <Field
                                name="name"
                                type="text"
                                component={Input}
                            />
                            <Hint>Must be unique</Hint>
                        </Row>
                    </Row>
                </div>

                <div className={b('section')}>
                    <div className={b('section-title')}>2. Cors_meta</div>

                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Is Enabled?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="cors_meta.active"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="is-active"
                                    />
                                    <Label htmlFor="is-active">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="cors_meta.active"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="is-not-active"
                                    />
                                    <Label htmlFor="is-not-active">No</Label>
                                </Row>
                            </Row>
                        </Row>
                        {/*
                        <Row col>
                            <Label>Domains</Label>
                            <Field
                                name="cors_meta.domains"
                                type="text"
                                placeholder="*"
                                component={Input}
                            />
                            <Hint>A list of all domains from which the endpoint will accept requests</Hint>
                        </Row>
                        */}
                    </Row>

                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Domains</Label>
                            <Field
                                name="cors_meta.domains"
                                type="text"
                                placeholder={PLACEHOLDER.DOMAINS}
                                component={Input}
                            />
                            <Hint>A list of all domains from which the endpoint will accept requests</Hint>
                        </Row>
                        <Row col>
                            <Label>Methods</Label>
                            <Field
                                name="cors_meta.methods"
                                type="text"
                                edit={false}
                                value="cors_meta.methods"
                                options={optionsTransformer(schema.cors_meta.methods)}
                                component={MultiSelect}
                            />
                            <Hint>HTTP methods that are supported for the endpoint.</Hint>
                        </Row>
                    </Row>

                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Request Headers</Label>
                            <Field
                                name="cors_meta.request_headers"
                                type="text"
                                edit={false}
                                value="cors_meta.request_headers"
                                placeholder={PLACEHOLDER.REQUEST_HEADERS}
                                options={optionsTransformer(schema.cors_meta.request_headers)}
                                component={TagSelect}
                            />
                            <Hint>Value(s) for the Access-Control-Allow-Headers header.</Hint>
                        </Row>
                        <Row col>
                            <Label>Exposed Headers</Label>
                            <Field
                                name="cors_meta.exposed_headers"
                                type="text"
                                edit={false}
                                value="cors_meta.exposed_headers"
                                placeholder={PLACEHOLDER.EXPOSED_HEADERS}
                                options={optionsTransformer(schema.cors_meta.exposed_headers)}
                                component={TagSelect}
                            />
                            <Hint>Value for the Access-Control-Expose-Headers header.</Hint>
                        </Row>
                    </Row>

                    {/*
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Methods</Label>
                            <Field
                                name="proxy.methods"
                                type="text"
                                placeholder="Choose one or more methods"
                                value={[]}
                                options={optionsTransformer(initialValues.proxy.methods)}
                                component={MultiSelect}
                            />
                            <Hint>HTTP methods that are supported for the endpoint.</Hint>
                        </Row>
                        <Row col>
                            <Label>Preserve Host?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="proxy.preserve_host"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="preserve-host-true"
                                    />
                                    <Label htmlFor="preserve-host-true">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="proxy.preserve_host"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="preserve-host-false"
                                    />
                                    <Label htmlFor="preserve-host-false">No</Label>
                                </Row>
                            </Row>
                            <Hint>Preserve the host header the client used for the incoming request.</Hint>
                        </Row>
                    </Row>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Append Path?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="proxy.append_path"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="append-path-true"
                                    />
                                    <Label htmlFor="append-path-true">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="proxy.append_path"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="append-path-false"
                                    />
                                    <Label htmlFor="append-path-false">No</Label>
                                </Row>
                            </Row>
                            <Hint>Appends the path from the listen_path when forwarding the request to the upstream_url.</Hint>
                        </Row>
                        <Row col>
                            <Label>Strips Path?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="proxy.strip_path"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="strip-path-true"
                                    />
                                    <Label htmlFor="strip-path-true">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="proxy.strip_path"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="strip-path-false"
                                    />
                                    <Label htmlFor="strip-path-false">No</Label>
                                </Row>
                            </Row>
                            <Hint> Strip the path out of the listen_path when forwarding the request to the upstream_url.</Hint>
                        </Row>
                    </Row>
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>3. Health check</div>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Health URL (optional)</Label>
                            <Field
                                name="health_check.url"
                                type="text"
                                placeholder="eg. http://gw.hellofresh.com/"
                                component={Input}
                            />
                            <Hint>The url that the Gateway will use to determine the health of the API. </Hint>
                        </Row>
                        <Row col>
                            <Label>Timeout (optional)</Label>
                            <Field
                                name="health_check.timeout"
                                type="number"
                                parse={parse}
                                component={Input}
                            />
                            <Hint>The length of time that the Gateway should wait before displaying an error.</Hint>
                        </Row>
                    </Row>
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>4. Plugins</div>

                    {
                        !!plugins &&
                            <RenderPlugins
                                className={b()}
                                apiSchema={apiSchema}
                                plugins={plugins}
                                initialValues={initialValues}
                                selectedPlugins={selectedPlugins}
                                handlePluginInclude={includePlugin}
                                handlePluginExclude={removePlugin}
                            />
                    }

                */}
                </div>
            </div>
            <Row className={b('row',{ 'button-row': true })()}>
                <Button
                    type="submit"
                    mod="primary"
                >
                    Create API
                </Button>
            </Row>
        </form>
    );
};

OAuthServerForm.propTypes = propTypes;

const selector = formValueSelector('oAuthServerForm');

const form = reduxForm({
    form: 'oAuthServerForm',
    enableReinitialize: true, // this is needed!!
})(OAuthServerForm);

export default connect(
    // state => {
    //     const plugins = selector(state, 'plugins');

    //     return {
    //         keepDirtyOnReinitialize: false,
    //         plugins,
    //     };
    // },
    null,
    null,
)(form);
