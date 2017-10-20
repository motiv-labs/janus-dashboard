import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Select from 'react-select';

import PLACEHOLDER from '../../../configurations/placeholders.config';

import block from '../../../helpers/bem-cn';
import transformFormValues from '../../../helpers/transformFormValues';
import checkOnPattern from '../../../helpers/pattern-check';
import parse from '../../../helpers/parse-value';

import Section from '../../Layout/Section/Section';
import Title from '../../Layout/Title/Title';
import Row from '../../Layout/Row/Row';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';
import MultiSelect from '../../selects/MultiSelect/MultiSelect';
import Button from '../../buttons/Button';
import Icon from '../../Icon/Icon';

import RenderPlugins from '../../forms/plugins/RenderPlugins';

import RoundrobinTargets from '../NewApiPage/partials/RoundrobinTargets/RoundrobinTargets';
import WeightTargets from '../NewApiPage/partials/WeightTargets/WeightTargets';

const b = block('j-api-form');
const col = block('j-col');
const row = block('j-row');

const propTypes = {
    api: PropTypes.object.isRequired,
    apiSchema: PropTypes.object.isRequired,
    excludePlugin: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    selectPlugin: PropTypes.func.isRequired,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class ApiForm extends PureComponent {
    state = {
        upstreams: this.props.initialValues.proxy.upstreams || {}, // fallback for old endpoints (they have `upstreams: null`), probably temporary
    };

    createStrategyOptions = list => {
        const extractNames = list => list.map(item => item.balancing);
        const labelCombiner = item => ({
            label: item[1],
            value: item[1],
            options: item[0],
        });
        const combineListOfUnitsAndLabels = list => list.map(labelCombiner);

        return R.compose(
            combineListOfUnitsAndLabels,
            R.zip(list),
            extractNames,
        )(list);
    };

    handleChangeStrategy = value => {
        this.setState(() => ({
            upstreams: {
                balancing: value.value,
                targets: value.options,
            }
        }), () => this.props.change('proxy.upstreams.balancing', value.value));
    };

    renderStrategy = balancing => {
        switch (balancing) {
            case 'roundrobin': {
                return (
                    <RoundrobinTargets
                        name="proxy.upstreams.targets"
                        title="Roundrobin targets"
                    />
                );
            }
            case 'weight': {
                return (
                    <WeightTargets
                        name="proxy.upstreams.targets"
                        title="Weight targets"
                    />
                );
            }
            default:
                return null;
        }
    };

    render() {
        const {
            api,
            apiSchema,
            disabled,
            editing,
            excludePlugin,
            initialValues,
            handleSubmit,
            handleDelete,
            plugins,
            response,
            selectPlugin,
            selectedPlugins,
        } = this.props;

        const includePlugin = value => {
            apiSchema.plugins
                .filter((plugin, index) =>
                    plugin.name === value.value && !selectedPlugins.includes(plugin.name)
                )
                .map((plugin, index) => selectPlugin(plugin.name));
        };
        const getValues = key => initialValues.proxy[key];
        const optionsTransformer = config => config.map(item => ({
            label: item,
            value: item,
        }));

        return (
            <form className={b} onSubmit={handleSubmit}>
                <Section>
                    <Row>
                        <Title>Edit API</Title>
                        <div className="j-buttons__wrapper">
                            <Link
                                to={{
                                    pathname: '/new',
                                    state: {
                                        clone: api,
                                    },
                                }}
                            >
                                <Button
                                    type="button"
                                    mod="primary"
                                >
                                    <Icon type="copy-white" />
                                    Copy
                                </Button>
                            </Link>
                            <Button
                                type="button"
                                mod="danger"
                                onClick={() => {
                                    handleDelete(api.name);
                                }}
                            >
                                <Icon type="delete-white" />
                                Delete
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
                                    disabled={disabled}
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
                                <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                                    <Row className={b('row')()} fullwidth>
                                        { this.renderStrategy(this.state.upstreams.balancing) }
                                    </Row>
                                </div>
                            </div>
                        </Row>
                        <Row className={b('row')()} fullwidth>
                            <Row col>
                                <Label>Methods</Label>
                                <Field
                                    name="proxy.methods"
                                    type="text"
                                    placeholder="Choose one or more methods"
                                    edit
                                    value={editing ? () => getValues('methods') : []}
                                    options={optionsTransformer(apiSchema.proxy.methods)}
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
                                    handlePluginExclude={excludePlugin}
                                    response={response}
                                    edit={editing}
                                />
                        }
                    </div>
                </div>
                <Row className={b('row',{ 'button-row': true })()}>
                    <Button
                        type="submit"
                        mod="primary"
                    >
                        Save
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
