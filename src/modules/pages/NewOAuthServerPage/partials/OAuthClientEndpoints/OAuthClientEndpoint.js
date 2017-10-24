import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Field } from 'redux-form';
import Select from 'react-select';

import PLACEHOLDER from '../../../../../configurations/placeholders.config';
import block from '../../../../../helpers/bem-cn';
import checkOnPattern from '../../../../../helpers/pattern-check';
import optionsTransformer from '../../../../../helpers/optionsTransformer';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Radio from '../../../../inputs/Radio/Radio';
import Input from '../../../../inputs/Input';
import Hint from '../../../../labels/Hint/Hint';
import SimpleSelect from '../../../../selects/SimpleSelect/SimpleSelect';
import MultiSelect from '../../../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../../../selects/TagSelect/TagSelect';
import RoundrobinTargets from '../../../../pages/NewApiPage/partials/RoundrobinTargets/RoundrobinTargets';
import WeightTargets from '../../../../pages/NewApiPage/partials/WeightTargets/WeightTargets';

const b = block('j-api-form');
const row = block('j-row');
const col = block('j-col');
const grid = block('j-grid');

const propTypes = {
    category: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    endpoint: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
};

class OAuthClientEndpoint extends PureComponent {
    state = {
        upstreams: this.props.initialValues[this.props.category][this.props.name].upstreams || {}, // fallback for old endpoints (they have `upstreams: null`), probably temporary
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
        }), () => {
            this.props.change(`${this.props.category}.${this.props.name}.upstreams.balancing`, value.value);
        });
    };

    renderStrategy = balancing => {
        switch (balancing) {
            case 'roundrobin': {
                return (
                    <RoundrobinTargets
                        name={`${this.props.category}.${this.props.name}.upstreams.targets`}
                        title="Roundrobin targets"
                    />
                );
            }
            case 'weight': {
                return (
                    <WeightTargets
                        name={`${this.props.category}.${this.props.name}.upstreams.targets`}
                        title="Weight targets"
                    />
                );
            }
            default:
                return null;
        }
    };

    render() {
        const { category, endpoint, name, schema } = this.props;

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
                                name={`${category}.${name}.listen_path`}
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
                            <Select
                                className="j-select"
                                name={`${category}.${name}.upstreams.balancing`}
                                options={this.createStrategyOptions(schema.oauth_client_endpoints[name].upstreams.options)}
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
                    </div>
                </div>
                <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                    <div className={row('item')}>
                        <Label>Insecure skip verify?</Label>
                        <Row className={b('radio-wrap')()}>
                            <Row className={b('radio')()}>
                                <Field
                                    name={`${category}.${name}.insecure_skip_verify`}
                                    component={Radio}
                                    value={'true'}
                                    type="radio"
                                    id="is-active"
                                />
                                <Label htmlFor="is-active">Yes</Label>
                            </Row>
                            <Row className={b('radio')()}>
                                <Field
                                    name={`${category}.${name}.insecure_skip_verify`}
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
                                    name={`${category}.${name}.preserve_host`}
                                    component={Radio}
                                    value={'true'}
                                    type="radio"
                                    id="is-active"
                                />
                                <Label htmlFor="is-active">Yes</Label>
                            </Row>
                            <Row className={b('radio')()}>
                                <Field
                                    name={`${category}.${name}.preserve_host`}
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
                                    name={`${category}.${name}.append_path`}
                                    component={Radio}
                                    value={'true'}
                                    type="radio"
                                    id="is-active"
                                />
                                <Label htmlFor="is-active">Yes</Label>
                            </Row>
                            <Row className={b('radio')()}>
                                <Field
                                    name={`${category}.${name}.append_path`}
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
                                    name={`${category}.${name}.strip_path`}
                                    component={Radio}
                                    value={'true'}
                                    type="radio"
                                    id="is-active"
                                />
                                <Label htmlFor="is-active">Yes</Label>
                            </Row>
                            <Row className={b('radio')()}>
                                <Field
                                    name={`${category}.${name}.strip_path`}
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
                        <div className={col()}>
                            <Label>Hosts</Label>
                            <Field
                                name={`${category}.${name}.hosts`}
                                type="text"
                                edit={false}
                                value={`${category}.${name}.hosts`}
                                options={optionsTransformer(schema.oauth_client_endpoints[name].hosts)}
                                component={TagSelect}
                            />
                            <Hint>HTTP methods that are supported for the endpoint.</Hint>
                        </div>
                    </div>
                    <div className={row('item')}>
                        <div className={col()}>
                            <Label>Methods</Label>
                            <Field
                                name={`${category}.${name}.methods`}
                                type="text"
                                edit={false}
                                value={`${category}.${name}.methods`}
                                options={optionsTransformer(schema.oauth_client_endpoints[name].methods)}
                                component={MultiSelect}
                            />
                            <Hint>HTTP methods that are supported for the endpoint.</Hint>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

OAuthClientEndpoint.propTypes = propTypes;

export default OAuthClientEndpoint;
