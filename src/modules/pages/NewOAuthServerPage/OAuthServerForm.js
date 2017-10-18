import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Select from 'react-select';

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
import SimpleSelect from '../../selects/SimpleSelect/SimpleSelect';
import MultiSelect from '../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../selects/TagSelect/TagSelect';
import OAuthEndpoints from './partials/OAuthEndpoints/OAuthEndpoints';
import OAuthClientEndpoints from './partials/OAuthClientEndpoints/OAuthClientEndpoints';
import JWTStrategyOptions from './partials/JWTStrategyOptions/JWTStrategyOptions';

import HeadersSection from '../../forms/plugins/RequestTransformer/HeadersSection/HeadersSection';
import QueryStringSection from '../../forms/plugins/RequestTransformer/QueryStringSection/QueryStringSection';

import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/plugins/RenderPlugins';

// import './NewApiForm.css';

const b = block('j-api-form');
const row = block('j-row');
const col = block('j-col');
const grid = block('j-grid');

const propTypes = {
    // formValues: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

const styles = {
    tab: {
        zIndex: 0,
        opacity: 0,
    },
    visible: {
        zIndex: 1,
        opacity: 1,
    }
};

class OAuthServerForm extends PureComponent {
    state = {
        tabs: [
            'oAuth Endpoints',
            'oAuth Client Endpoints',
        ],
        activeTab: 0,
        strategy: {},
    };

    handleTabSwitch = idx => this.setState(prevState => ({ activeTab: idx }));

    render() {
        const {
            handleSubmit,
            schema,
            initialValues,
        } = this.props;
        const parse = value => value && parseInt(value);
        const optionsTransformer = config => config.map(item => ({
            label: item,
            value: item,
        }));
        const createOptions = (list1, list2) => {
            const combinedListOfUnitsAndLabels = R.zip(list1, list2);

            return combinedListOfUnitsAndLabels.map(item => ({
                label: item[1],
                value: item[0],
            }));
        };
        const createStrategyOptions = (list) => {
            const names = list.map(item => item.name);
            const combinedListOfUnitsAndLabels = R.zip(list, names);

            return combinedListOfUnitsAndLabels.map(item => ({
                label: item[1],
                value: item[1],
                settings: item[0],
            }));
        };

        const renderTabs = () => {
            const first = 'oAuth Endpoints';
            const second = 'oAuth Client Endpoints';

            return (
                <div className={b('tabs')}>
                    <div className="j-buttons__wrapper tabs-nav">
                        {
                            this.state.tabs.map((item, idx) =>
                                <Button
                                    key={item}
                                    mod={`${this.state.activeTab === idx ? 'primary' : 'white'}`}
                                    onClick={() => this.handleTabSwitch(idx)}
                                    type="button"
                                >
                                    {item}
                                </Button>
                            )
                        }
                    </div>

                    <div className={b('tab', { hidden: this.state.activeTab !== 0 })}>
                        <div className={b('section')}>
                            <OAuthEndpoints
                                endpoints={schema.oauth_endpoints}
                                schema={schema}
                            />
                        </div>
                    </div>
                    <div className={b('tab', {hidden: this.state.activeTab !== 1})}>
                        <div className={b('section')}>
                            <OAuthClientEndpoints
                                endpoints={schema.oauth_client_endpoints}
                                schema={schema}
                            />
                        </div>
                    </div>
                </div>
            );
        };

        const renderJWTStrategy = () => (
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <Row className={b('row')()} fullwidth>
                    <JWTStrategyOptions
                        name="token_strategy.settings"
                        title="JWT settings"
                    />
                </Row>
            </div>
        );

        const renderIntrospectionStrategy = () => (
            <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                <div className={row('item')}>
                    <Row col>
                        <div className={col()}>
                            <Label>Auth Header Type</Label>
                            <Field
                                type="number"
                                name="token_strategy.settings.auth_header_type"
                                placeholder=""
                                component={Input}
                            />
                        </div>
                        <div className={col()}>
                        </div>
                    </Row>
                </div>
                <div className={row('item')}>
                    <Row col>
                        <Label>Use OAuth Header?</Label>
                        <Row className={b('radio-wrap')()}>
                            <Row className={b('radio')()}>
                                <Field
                                    name="token_strategy.settings.use_oauth_header"
                                    component={Radio}
                                    value={'true'}
                                    type="radio"
                                    id="use-aouth-header-is-active"
                                />
                                <Label htmlFor="use-aouth-header-is-active">Yes</Label>
                            </Row>
                            <Row className={b('radio')()}>
                                <Field
                                    name="token_strategy.settings.use_oauth_header"
                                    component={Radio}
                                    value={'false'}
                                    type="radio"
                                    id="use-aouth-header-is-not-active"
                                />
                                <Label htmlFor="use-aouth-header-is-not-active">No</Label>
                            </Row>
                        </Row>
                    </Row>
                </div>
            </div>
        );

        const renderStrategy = (name) => {
            switch (name) {
                case 'jwt': {
                    return renderJWTStrategy();
                }
                case 'introspection': {
                    return renderIntrospectionStrategy();
                }
                default:
                    return null;
            }
        };

        const handleChangeStrategy = value => {
            this.setState(() => ({
                strategy: {
                    name: value.value,
                    settings: value.settings,
                }
            }), () => this.props.change('token_strategy.name', value.value));
        };

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
                        <div className={b('section-title')}>2. Cors meta</div>
                        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                            <div className={row('item')}>
                                <Row col>
                                    <Label>Is Enabled?</Label>
                                    <Row className={b('radio-wrap')()}>
                                        <Row className={b('radio')()}>
                                            <Field
                                                name="cors_meta.enabled"
                                                component={Radio}
                                                value={'true'}
                                                type="radio"
                                                id="cors-meta-is-active"
                                            />
                                            <Label htmlFor="cors-meta-is-active">Yes</Label>
                                        </Row>
                                        <Row className={b('radio')()}>
                                            <Field
                                                name="cors_meta.enabled"
                                                component={Radio}
                                                value={'false'}
                                                type="radio"
                                                id="cors-meta-is-not-active"
                                            />
                                            <Label htmlFor="cors-meta-is-not-active">No</Label>
                                        </Row>
                                    </Row>
                                </Row>
                            </div>
                        </div>
                        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                            <div className={row('item')}>
                                <div className={col()}>
                                    <Label>Domains</Label>
                                    <Field
                                        name="cors_meta.domains"
                                        type="text"
                                        placeholder={PLACEHOLDER.DOMAINS}
                                        component={Input}
                                    />
                                    <Hint>A list of all domains from which the endpoint will accept requests</Hint>
                                </div>
                            </div>
                            <div className={row('item')}>
                                <div className={col()}>
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
                                </div>
                            </div>
                        </div>
                        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                            <div className={row('item')}>
                                <div className={col()}>
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
                                </div>
                            </div>
                            <div className={row('item')}>
                                <div className={col()}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={b('section')}>
                        <div className={b('section-title')}>3. Rate limit</div>
                        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                            <div className={row('item').mix(grid('row', { 2: true }))}>
                                <div className={col()}>
                                    <Label>Limit Value</Label>
                                    <Field
                                        type="number"
                                        name="rate_limit.limit.value"
                                        placeholder=""
                                        component={Input}
                                    />
                                </div>
                                <div className={col()}>
                                    <Label>Limit Unit</Label>
                                    <Field
                                        name="rate_limit.limit.unit"
                                        type="text"
                                        searchable={false}
                                        clearable={false}
                                        options={createOptions(schema.rate_limit.limit.units, schema.rate_limit.limit.labels)}
                                        component={SimpleSelect}
                                    />
                                </div>
                            </div>
                            <div className={row('item')}>
                                <Label>Is Enabled?</Label>
                                <Row className={b('radio-wrap')()}>
                                    <Row className={b('radio')()}>
                                        <Field
                                            name="rate_limit.enabled"
                                            component={Radio}
                                            value={'true'}
                                            type="radio"
                                            id="rate-limit-is-active"
                                        />
                                        <Label htmlFor="rate-limit-is-active">Yes</Label>
                                    </Row>
                                    <Row className={b('radio')()}>
                                        <Field
                                            name="rate_limit.enabled"
                                            component={Radio}
                                            value={'false'}
                                            type="radio"
                                            id="rate-limit-is-not-active"
                                        />
                                        <Label htmlFor="rate-limit-is-not-active">No</Label>
                                    </Row>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className={b('section')}>
                        <div className={b('section-title')}>4. Token strategy</div>
                        <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                            <div className={row('item')}>
                                <Select
                                    className="j-select"
                                    name="token_strategy.name"
                                    options={createStrategyOptions(schema.token_strategy.strategies)}
                                    onChange={handleChangeStrategy}
                                    value={this.state.strategy.name}
                                    searchable={false}
                                    clearable={false}
                                />
                            </div>
                        </div>
                        { renderStrategy(this.state.strategy.name) }
                    </div>
                </div>

                <div className={b('inner', {overflowed: true})}>
                    <div className={b('section')}>
                        { renderTabs() }
                    </div>
                </div>

                <Row className={b('row',{ 'button-row': true })()}>
                    <Button
                        type="submit"
                        mod="primary"
                    >
                        Create oAuth Server
                    </Button>
                </Row>
            </form>
        );
    }
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
