import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select'
import Sticky from 'react-sticky-el'

import PLACEHOLDER from '../../../configurations/placeholders.config'
import WARNINGS from '../../../configurations/warning-messages.config'

import block from '../../../helpers/bem-cn'
import optionsTransformer from '../../../helpers/optionsTransformer'
import getValues from '../../../helpers/getValues'
import parse from '../../../helpers/parse-value'

import Section from '../../Layout/Section/Section'
import Row from '../../Layout/Row/Row'
import Title from '../../Layout/Title/Title'
import Input from '../../inputs/Input'
import Radio from '../../../components/Radio/Radio'
import Label from '../../../components/Label/Label'
import Hint from '../../../components/Hint/Hint'
import SimpleSelect from '../../selects/SimpleSelect/SimpleSelect'
import MultiSelect from '../../selects/MultiSelect/MultiSelect'
import TagSelect from '../../selects/TagSelect/TagSelect'
import OAuthEndpoints from './partials/OAuthEndpoints/OAuthEndpoints'
import OAuthClientEndpoints from './partials/OAuthClientEndpoints/OAuthClientEndpoints'
import KeyValueOptions from './partials/KeyValueOptions/KeyValueOptions'

import ButtonsGroup from '../../../components/ButtonsGroup/ButtonsGroup'
import Button from '../../../components/Button/Button'

const b = block('j-api-form')
const row = block('j-row')
const col = block('j-col')
const grid = block('j-grid')

const propTypes = {
  schema: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  editing: PropTypes.bool
}

class OAuthServerForm extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      tabs: [
        'OAuth Endpoints',
        'OAuth Client Endpoints'
      ],
      activeTab: 0,
      strategy: {
        name: this.props.initialValues.token_strategy.name || '',
        settings: []
      }
    }
  };

    handleTabSwitch = idx => this.setState(prevState => ({ activeTab: idx }));

    handleChangeStrategy = value => {
      this.setState(() => ({
        strategy: value.settings
      }), () => this.props.change('token_strategy', value.settings))
    };

    isActiveTab = tabIndex => this.state.activeTab === tabIndex;

    renderTabs = () => (
      <div className={b('tabs')()}>
        <ButtonsGroup className='tabs-nav'>
          {
            this.state.tabs.map((item, idx) =>
              <Button
                key={item}
                mod={`${this.isActiveTab(idx) ? 'primary' : 'white'}`}
                onClick={() => this.handleTabSwitch(idx)}
                type='button'
              >
                {item}
              </Button>
            )
          }
        </ButtonsGroup>

        <div className={b('tab', { hidden: !this.isActiveTab(0) })()}>
          <div className={b('section')()}>
            <OAuthEndpoints
              editing={this.props.editing}
              endpoints={this.props.initialValues.oauth_endpoints}
              schema={this.props.schema}
              change={this.props.change}
              category={'oauth_endpoints'}
              initialValues={this.props.initialValues}
              strategyName={this.state.strategy.name}
            />
          </div>
        </div>
        <div className={b('tab', { hidden: !this.isActiveTab(1) })()}>
          <div className={b('section')()}>
            <OAuthClientEndpoints
              editing={this.props.editing}
              endpoints={this.props.initialValues.oauth_client_endpoints}
              schema={this.props.schema}
              change={this.props.change}
              category={'oauth_client_endpoints'}
              initialValues={this.props.initialValues}
            />
          </div>
        </div>
      </div>
    );

    renderSaveButton = () => <Button
      type='submit'
      mod='primary'
    >
        Save
    </Button>

    renderJWTStrategy = () => (
      <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
        <Row className={b('row')()} fullwidth>
          <KeyValueOptions
            name='token_strategy.settings'
            title='JWT settings'
            k='alg'
            val='key'
            placeholder={{
              key: 'Alg',
              value: 'Key'
            }}
          />
        </Row>
      </div>
    );

    renderLeewayField = () => (
      <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
        <Row classname={b('row')()} fullwidth>
          <div className={col()}>
            <Label>Leeway</Label>
            <Field
              name='token_strategy.leeway'
              type='number'
              component={Input}
              required
              parse={parse}
            />
            <Hint>Helps solve clock skew problem. The value is in seconds unit.</Hint>
          </div>
        </Row>
      </div>
    )

    renderSecretsOptions = () => (
      <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
        <Row className={b('row')()} fullwidth>
          <KeyValueOptions
            name='secrets'
            title='Secrets'
            k='key'
            val='value'
            placeholder={{
              key: 'Key',
              value: 'Value'
            }}
          />
        </Row>
      </div>
    );

    renderIntrospectionStrategy = () => (
      <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
        <div className={row('item')()}>
          <Row col>
            <div className={col()}>
              <Label>Auth Header Type</Label>
              <Field
                type='text'
                name='token_strategy.settings.auth_header_type'
                placeholder=''
                component={Input}
              />
            </div>
            <div className={col()} />
          </Row>
        </div>
        <div className={row('item')()}>
          <Row col>
            <Label>Use OAuth Header?</Label>
            <Row className={b('radio-wrap')()}>
              <Row className={b('radio')()}>
                <Field
                  name='token_strategy.settings.use_auth_header'
                  component={Radio}
                  value={'true'}
                  type='radio'
                  id='use-aouth-header-is-active'
                />
                <Label htmlFor='use-aouth-header-is-active'>Yes</Label>
              </Row>
              <Row className={b('radio')()}>
                <Field
                  name='token_strategy.settings.use_auth_header'
                  component={Radio}
                  value={'false'}
                  type='radio'
                  id='use-aouth-header-is-not-active'
                />
                <Label htmlFor='use-aouth-header-is-not-active'>No</Label>
              </Row>
            </Row>
          </Row>
        </div>
      </div>
    );

    renderStrategy = (name) => {
      switch (name) {
        case 'jwt': {
          return this.renderJWTStrategy()
        }
        case 'introspection': {
          return this.renderIntrospectionStrategy()
        }
        default:
          return null
      }
    }

    render () {
      const {
        editing,
        handleSubmit,
        schema,
        initialValues
      } = this.props

      const createOptions = (list1, list2) => {
        const combinedListOfUnitsAndLabels = R.zip(list1, list2)

        return combinedListOfUnitsAndLabels.map(item => ({
          label: item[1],
          value: item[0]
        }))
      }
      const createStrategyOptions = (list) => {
        const names = list.map(item => item.name)
        const combinedListOfUnitsAndLabels = R.zip(list, names)

        return combinedListOfUnitsAndLabels.map(item => ({
          label: item[1],
          value: item[1],
          settings: item[0]
        }))
      }
      const ifEditing = (yes, no) => R.ifElse(
        () => editing,
        (yes, no) => yes,
        (yes, no) => no
      )

      return (
        <form className={b()} onSubmit={handleSubmit}>
          <Section>
            <Sticky stickyClassName={b('sticky')()}>
              <Row>
                <Title>
                  {
                    ifEditing()(
                      `Edit ${initialValues.name}`,
                      'Create New OAuth Server')
                  }
                </Title>
                { this.renderSaveButton() }
              </Row>
            </Sticky>
          </Section>
          <div className={b('inner')()}>
            <div className={b('section')()}>
              <div className={b('section-title')()}>1. General</div>
              <Row className={b('row')()} fullwidth>
                <div className={col()}>
                  <div className={col('item')()}>
                    <Label>OAuth Server Name</Label>
                  </div>
                  <Field
                    name='name'
                    type='text'
                    component={Input}
                    disabled={editing}
                    required
                  />
                  <span className='j-input__warning'>{WARNINGS.NAMES}</span>
                  <Hint>Must be unique.</Hint>
                </div>
              </Row>
            </div>
            <div className={b('section')()}>
              <div className={b('section-title')()}>2. Cors meta</div>
              <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
                <div className={row('item')()}>
                  <Row col>
                    <Label>Is Enabled?</Label>
                    <Row className={b('radio-wrap')()}>
                      <Row className={b('radio')()}>
                        <Field
                          name='cors_meta.enabled'
                          component={Radio}
                          value={'true'}
                          type='radio'
                          id='cors-meta-is-active'
                        />
                        <Label htmlFor='cors-meta-is-active'>Yes</Label>
                      </Row>
                      <Row className={b('radio')()}>
                        <Field
                          name='cors_meta.enabled'
                          component={Radio}
                          value={'false'}
                          type='radio'
                          id='cors-meta-is-not-active'
                        />
                        <Label htmlFor='cors-meta-is-not-active'>No</Label>
                      </Row>
                    </Row>
                  </Row>
                </div>
              </div>
              <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
                <div className={row('item')()}>
                  <div className={col()}>
                    <Label>Domains</Label>
                    <Field
                      name='cors_meta.domains'
                      type='text'
                      edit={editing}
                      value={() => getValues(['cors_meta', 'domains'])(initialValues)}
                      options={optionsTransformer(schema.cors_meta.domains)}
                      component={TagSelect}
                    />
                    <Hint>A list of all domains from which the endpoint will accept requests.</Hint>
                  </div>
                </div>
                <div className={row('item')()}>
                  <div className={col()}>
                    <Label>Methods</Label>
                    <Field
                      name='cors_meta.methods'
                      type='text'
                      edit={editing}
                      value={() => getValues(['cors_meta', 'methods'])(initialValues)}
                      options={optionsTransformer(schema.cors_meta.all_methods)}
                      component={MultiSelect}
                    />
                    <Hint>HTTP methods that are supported for the endpoint.</Hint>
                  </div>
                </div>
              </div>
              <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
                <div className={row('item')()}>
                  <div className={col()}>
                    <Label>Request Headers</Label>
                    <Field
                      name='cors_meta.request_headers'
                      type='text'
                      edit={editing}
                      value={() => getValues(['cors_meta', 'request_headers'])(initialValues)}
                      placeholder={PLACEHOLDER.REQUEST_HEADERS}
                      options={optionsTransformer(schema.cors_meta.request_headers)}
                      component={TagSelect}
                    />
                    <Hint>Value(s) for the Access-Control-Allow-Headers header.</Hint>
                  </div>
                </div>
                <div className={row('item')()}>
                  <div className={col()}>
                    <Label>Exposed Headers</Label>
                    <Field
                      name='cors_meta.exposed_headers'
                      type='text'
                      edit={editing}
                      value={() => getValues(['cors_meta', 'exposed_headers'])(initialValues)}
                      placeholder={PLACEHOLDER.EXPOSED_HEADERS}
                      options={optionsTransformer(schema.cors_meta.exposed_headers)}
                      component={TagSelect}
                    />
                    <Hint>Value for the Access-Control-Expose-Headers header.</Hint>
                  </div>
                </div>
              </div>
            </div>
            <div className={b('section')()}>
              <div className={b('section-title')()}>3. Rate limit</div>
              <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
                <div className={row('item').mix(grid('row', { 2: true }))()}>
                  <div className={col()}>
                    <Label>Limit Value</Label>
                    <Field
                      type='number'
                      name='rate_limit.limit.value'
                      placeholder=''
                      component={Input}
                    />
                  </div>
                  <div className={col()}>
                    <Label>Limit Unit</Label>
                    <Field
                      name='rate_limit.limit.unit'
                      type='text'
                      searchable={false}
                      clearable={false}
                      options={createOptions(schema.rate_limit.limit.units, schema.rate_limit.limit.labels)}
                      component={SimpleSelect}
                    />
                  </div>
                </div>
                <div className={row('item')()}>
                  <Label>Is Enabled?</Label>
                  <Row className={b('radio-wrap')()}>
                    <Row className={b('radio')()}>
                      <Field
                        name='rate_limit.enabled'
                        component={Radio}
                        value={'true'}
                        type='radio'
                        id='rate-limit-is-active'
                      />
                      <Label htmlFor='rate-limit-is-active'>Yes</Label>
                    </Row>
                    <Row className={b('radio')()}>
                      <Field
                        name='rate_limit.enabled'
                        component={Radio}
                        value={'false'}
                        type='radio'
                        id='rate-limit-is-not-active'
                      />
                      <Label htmlFor='rate-limit-is-not-active'>No</Label>
                    </Row>
                  </Row>
                </div>
              </div>
            </div>
            <div className={b('section')()}>
              <div className={b('section-title')()}>4. Token strategy</div>
              <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
                <div className={row('item')()}>
                  <Select
                    className='j-select'
                    name='token_strategy.name'
                    options={createStrategyOptions(schema.token_strategy.strategies)}
                    onChange={this.handleChangeStrategy}
                    value={this.state.strategy.name}
                    searchable={false}
                    clearable={false}
                  />
                </div>
              </div>
              { this.renderStrategy(this.state.strategy.name) }
              { this.renderLeewayField() }
              { this.renderSecretsOptions() }
            </div>
          </div>

          <div className={b('inner', {overflowed: true})()}>
            <div className={b('section')()}>
              { this.renderTabs() }
            </div>
          </div>

          <Row className={b('row', { 'button-row': true })()}>
            { this.renderSaveButton() }
          </Row>
        </form>
      )
    }
};

OAuthServerForm.propTypes = propTypes

const form = reduxForm({
  form: 'oAuthServerForm',
  enableReinitialize: true // this is needed!!
})(OAuthServerForm)

export default connect(
  state => {
    return {
      keepDirtyOnReinitialize: false
    }
  },
  // { clearOAuthServer },
  null
)(form)
