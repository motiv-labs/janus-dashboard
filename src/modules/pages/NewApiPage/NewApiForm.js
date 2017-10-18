import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import R from 'ramda';
import Select from 'react-select';

import PLACEHOLDER from '../../../configurations/placeholders.config';

import transformFormValues from '../../../helpers/transformFormValues';
import block from '../../../helpers/bem-cn';
import checkOnPattern from '../../../helpers/pattern-check';
import parse from '../../../helpers/parse-value';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';
import MultiSelect from '../../selects/MultiSelect/MultiSelect';

import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/plugins/RenderPlugins';

import RoundrobinTargets from './partials/RoundrobinTargets/RoundrobinTargets';
import WeightTargets from './partials/WeightTargets/WeightTargets';

import './NewApiForm.css';

const b = block('j-api-form');
const col = block('j-col');
const row = block('j-row');

const propTypes = {
    apiSchema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

class ApiForm extends PureComponent {
    state = {
        upstreams: {
            balancing: '',
            targets: [],
        },
    };

    createStrategyOptions = list => {
        const names = list.map(item => item.balancing);
        const combinedListOfUnitsAndLabels = R.zip(list, names);

        return combinedListOfUnitsAndLabels.map(item => ({
            label: item[1],
            value: item[1],
            options: item[0],
        }));
    };

    handleChangeStrategy = value => {
        this.setState(() => ({
            upstreams: {
                balancing: value.value,
                targets: value.options,
            }
        }), () => this.props.change('proxy.upstreams.balancing', value.value));
    };

    renderRoundrobinTargets = () => (
        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
            <Row className={b('row')()} fullwidth>
                <RoundrobinTargets
                    name="proxy.upstreams.targets"
                    title="Roundrobin targets"
                />
            </Row>
        </div>
    );

    renderWeightTargets = () => (
        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
            <Row className={b('row')()} fullwidth>
                <WeightTargets
                    name="proxy.upstreams.targets"
                    title="Weight targets"
                />
            </Row>
        </div>
    );

    renderStrategy = balancing => {
        switch (balancing) {
            case 'roundrobin': {
                return this.renderRoundrobinTargets();
            }
            case 'weight': {
                return this.renderWeightTargets();
            }
            default:
                return null;
        }
    };

    render() {
        const {
            handleSubmit,
            initialValues,
            apiSchema,
            plugins,
            excludePlugin,
            selectPlugin,
            selectedPlugins,
        } = this.props;
        const includePlugin = value => {
            apiSchema.plugins
                .filter((plugin, index) => {
                    return plugin.name === value.value && !selectedPlugins.includes(plugin.name);
                })
                .map((plugin, index) => {
                    selectPlugin(plugin.name);
                });
        };
        const removePlugin = value => {
            excludePlugin(value);
        };
        const optionsTransformer = config => config.map(item => ({
            label: item,
            value: item,
        }));

        return (
            <form className={b} onSubmit={handleSubmit}>
                <Section>
                    <Row>
                        <Title>Create New API</Title>
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
                            <div className={col()}>
                                <div className={col('item')}>
                                    <Label>Listen Path</Label>
                                </div>
                                <Field
                                    name="proxy.listen_path"
                                    type="text"
                                    placeholder={PLACEHOLDER.LISTEN_PATH}
                                    component={Input}
                                    validate={checkOnPattern('/')}
                                />
                                <span className="j-input__warning">Listen path should start from '/'</span>
                                <Hint>The public url that is exposed by the Gateway</Hint>
                            </div>
                            <div className={col()}>
                                <div className={col('item')}>
                                    <Label>Upstream URL</Label>
                                </div>
                                <Select
                                    className="j-select"
                                    name="token_strategy.name"
                                    options={this.createStrategyOptions(apiSchema.proxy.upstreams.options)}
                                    onChange={this.handleChangeStrategy}
                                    value={this.state.upstreams.balancing}
                                    searchable={false}
                                    clearable={false}
                                />
                                { this.renderStrategy(this.state.upstreams.balancing) }
                            </div>
                        </Row>
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
                                    placeholder={PLACEHOLDER.HEALTH_CHECK_URL}
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
    }
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
            keepDirtyOnReinitialize: false,
            plugins,
        };
    },
    null,
)(form);
