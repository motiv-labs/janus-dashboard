import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';
import transformFormValues from '../../../helpers/transformFormValues';

import Section from '../../Layout/Section/Section';
import Title from '../../Layout/Title/Title';
import Subtitle from '../../Layout/Title/Subtitle';
import Row from '../../Layout/Row/Row';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';
import MultiSelect from '../../selects/MultiSelect/MultiSelect';
import Button from '../../buttons/Button';
import Icon from '../../Icon/Icon';

import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
import FormLabel from '../../forms/FormLabel';

import RenderPlugins from '../../forms/plugins/RenderPlugins';

const b = block('j-api-form');

const propTypes = {
    api: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

const ApiForm = (props) => {
    // console.error('THIS.PROPS: ', props);
    const { initialValues, handleSubmit } = props;
    const parse = value => (value === undefined ? undefined : parseInt(value));

    const optionsTransformer = config => {
        return config.map(item => ({
            label: item,
            value: item,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Section>
                <Row>
                    <Title>Edit API</Title>
                    <div>
                        <Link
                            to={'/'}
                            onClick={() => {
                                props.handleDelete(props.api.name);
                            }}
                        >
                            <Button
                                type="button"
                                mod="danger"
                            >
                                <Icon type="delete-white" />
                                Delete
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            mod="primary"
                        >
                            Save
                        </Button>
                    </div>
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
                                disabled
                            />
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
                                name="proxy.methods"
                                type="text"
                                placeholder="Choose one or more methods"
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
            </div>


            <Section>
                <Subtitle>{props.api.name}</Subtitle>
                <Link
                    to={'/'}
                    onClick={() => {
                        props.handleDelete(props.api.name);
                    }}
                >
                    <Button
                        type="button"
                        mod="danger"
                    >
                        <Icon type="delete-white" />
                        Delete
                    </Button>
                </Link>
                <Button
                    type="submit"
                    mod="primary"
                >
                    Save
                </Button>
            </Section>
            <Section>
                <FormRow>
                    <FormInput component="input" label="Listen Path" attachTo="proxy.listen_path" type="text" tooltip="some another tooltip about something usefull" />
                    <FormInput component="input" label="Upstream URL" attachTo="proxy.upstream_url" type="text" />
                    <FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox" tooltip="some another tooltip about something usefull" />
                    <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox" />
                    <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox" />
                </FormRow>
                <Section>
                    <FormRow>
                        <FormLabel text="Health check" />
                    </FormRow>
                    <FormRow>
                        <FormInput component="input" label="url" attachTo="health_check.url" type="text" />
                        <FormInput component="input" label="timeout" attachTo="health_check.timeout" type="text" parse={parse} />
                    </FormRow>
                </Section>
            </Section>

            {/*{
                !!props.initialValues.plugins &&
                    <RenderPlugins plugins={props.initialValues.plugins} />
            }*/}

            <FormRow centered>
                <Button
                    type="submit"
                    mod="primary"
                >
                    Save
                </Button>
            </FormRow>
        </form>
    );
};

ApiForm.propTypes = propTypes;

const form = reduxForm({
    form: 'apiForm',
    enableReinitialize: true, // this is needed!!
})(ApiForm);

export default connect(
    state => ({
        initialValues: transformFormValues(state.apiReducer.api),
    }),
    null,
)(form);
