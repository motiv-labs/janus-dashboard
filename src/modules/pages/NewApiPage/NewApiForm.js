import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import transformFormValues from '../../../helpers/transformFormValues';
import block from '../../../helpers/bem-cn';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';

import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/plugins/RenderPlugins';

import './NewApiForm.css';

const b = block('j-api-form');

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

const ApiForm = (props) => {
    const {
        handleSubmit,
        initialValues,
        plugins,
        selectPlugin,
        selectedPlugins,
    } = props;
    const parse = value => (value === undefined ? undefined : parseInt(value));
    const includePlugin = value => {
        plugins.map((plugin, index) => {
            if (plugin.name === value.value && !selectedPlugins.includes(plugin.name)) {
                // props.dispatch(props.change(`plugins[${index}].enabled`, true));
                selectPlugin(plugin.name);
            }
        });
    };

    return (
        <form className={b} onSubmit={handleSubmit}>
            <Section>
                <Row>
                    <Title>Create New API</Title>
                    <Button
                        type="submit"
                        mod="primary"
                    >
                        Create API
                    </Button>
                </Row>
            </Section>
            <div className={b('inner')}>
                <div className={b('section')}>
                    <div className={b('section-title')}>1. General</div>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>API Name</Label>
                            <Field
                                name="name"
                                type="text"
                                component={Input}
                            />
                            <Hint>Must be unique</Hint>
                        </Row>
                        <Row col>
                            <Label>Is Active?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="active"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="is-active"
                                    />
                                    <Label htmlFor="is-active">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="active"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="is-not-active"
                                    />
                                    <Label htmlFor="is-not-active">No</Label>
                                </Row>
                            </Row>
                        </Row>
                    </Row>
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>2. Proxy</div>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Listen Path</Label>
                            <Field
                                name="proxy.listen_path"
                                type="text"
                                placeholder="eg. http://gw.hellofresh.com/"
                                component={Input}
                            />
                            <Hint>The public url that is exposed by the Gateway</Hint>
                        </Row>
                        <Row col>
                            <Label>Upstream URL</Label>
                            <Field
                                name="proxy.upstream_url"
                                type="text"
                                component={Input}
                            />
                            <Hint>The url to which the Gateway forwards requests made to the public url.</Hint>
                        </Row>
                    </Row>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Methods</Label>
                            <Field
                                name="health_check.url"
                                type="text"
                                placeholder="select methods"
                                component={Input}
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
                                plugins={plugins}
                                selectedPlugins={selectedPlugins}
                                handlePluginInclude={includePlugin}
                                hand
                            />
                    }

                </div>
            </div>
            <Row className={b('row')()}>
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

ApiForm.propTypes = propTypes;

const selector = formValueSelector('apiForm');

const form = reduxForm({
    form: 'apiForm',
    enableReinitialize: true, // this is needed!!
})(ApiForm);

export default connect(
    state => {
        const plugins = selector(state, 'plugins');

        return {
            initialValues: transformFormValues(state.apiReducer.api),
            selectedPlugins: state.apiReducer.selectedPlugins,
            plugins,
        };
    },
    null,
)(form);
