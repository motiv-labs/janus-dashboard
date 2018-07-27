import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import block from '../../../helpers/bem-cn'

import Row from '../../Layout/Row/Row'
import Section from '../../Layout/Section/Section'
import Input from '../../../modules/inputs/Input'
import Button from '../../../components/Button/Button'
import Label from '../../../components/Label/Label'
import Logo from '../../../components/Logo/Logo'
import Icon from '../../../components/Icon/Icon'
import Preloader from '../../../components/Preloader/Preloader'
import history from '../../../store/configuration/history'

import './LoginForm.css'

const b = block('login-form')

const propTypes = {
  authenticateWithUsernamePassword: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  getGithubAuthorizationCode: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

const LoginForm = ({
  authenticateWithUsernamePassword,
  getGithubAuthorizationCode,
  errorMsg,
  isFetching,
  user,
  handleSubmit,
  config
}) => {
  const DISABLE_BASIC_AUTH_FORM = (config.ui.disable_basic_auth === 'true')
  const DISABLE_GITHUB_AUTH = (config.ui.disable_github_auth === 'true')

  if (user) {
    history.push('/')
    return null
  }

  if (isFetching) {
    return <Preloader />
  }

  return (
    <div className={b({error: !!errorMsg})()}>
      <Logo className={b('logo')()} />
      <Section className={b('login-section')()}>
        <form onSubmit={handleSubmit(authenticateWithUsernamePassword)}>
          <Row className={b('janus-admin-url')()} col>
            <Label>Janus Admin URL</Label>
            <Field
              name='admin_url'
              type='text'
              component={Input}
              placeholder='http://localhost:8081'
            />
          </Row>
          {
            (!DISABLE_BASIC_AUTH_FORM || DISABLE_GITHUB_AUTH) &&
              <React.Fragment>
                <Row className={b('username')()} col>
                  <Label>Username</Label>
                  <Field
                    name='username'
                    type='text'
                    component={Input}
                  />
                </Row>
                <Row className={b('password')()} col>
                  <Label htmlFor='password'>Password</Label>
                  <Field
                    name='password'
                    type='password'
                    component={Input}
                  />
                </Row>
                {
                  errorMsg &&
                  <Row className={b('error')()} col>
                    <small className={b('error-message')()}>
                      { errorMsg }
                    </small>
                  </Row>
                }
                <Row className={b('button-section')()} col>
                  <Button className={b('button')()} mod='primary' type='submit'>
                    Sign In
                  </Button>
                </Row>
              </React.Fragment>
          }
        </form>
      </Section>
      {
        !DISABLE_GITHUB_AUTH &&
          <Section className={b('oauth-section')()} small>
            <Row className={b('button-section')()} col>
              <Button className={b('button')()} mod='primary' type='button' onClick={handleSubmit(getGithubAuthorizationCode)}>
                <Icon type='github' />
                Login with GitHub
              </Button>
            </Row>
          </Section>
      }
    </div>
  )
}

LoginForm.propTypes = propTypes

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
