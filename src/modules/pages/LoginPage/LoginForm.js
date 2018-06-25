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
  authorizeThroughGithub: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  isFetching: PropTypes.bool.isRequired
}

const LoginForm = ({ authorizeBasic, authorizeThroughGithub, errorMsg, isFetching, user, handleSubmit }) => {
  const DISABLE_BASIC_AUTH_FORM = window.MAIN_CONFIG.ui.disable_basic_auth
  const DISABLE_GITHUB_AUTH = window.MAIN_CONFIG.ui.disable_github_auth

  if (user) {
    history.push('/')
    return
  }

  if (isFetching) {
    return <Preloader />
  }

  return (
    <div className={b({error: !!errorMsg})()}>
      <Logo className={b('logo')()} />
      {
        (!DISABLE_BASIC_AUTH_FORM || DISABLE_GITHUB_AUTH) &&
          <Section className={b('login-section')()}>
            <form onSubmit={handleSubmit(authorizeBasic)}>
              <Row className={b('fields-section')()} col>
                <Label>Username</Label>
                <Field
                  name='username'
                  type='text'
                  component={Input}
                />
                <Label htmlFor='password'>Password</Label>
                <Field
                  name='password'
                  type='password'
                  component={Input}
                />
              </Row>
              {
                errorMsg &&
                  <small className={b('error-message')()}>
                    { errorMsg }
                  </small>
              }
              <Row className={b('button-section')()} col>
                <Button className={b('button')()} mod='primary' type='submit'>
                  Sign In
                </Button>
              </Row>
            </form>
          </Section>
      }
      {
        !DISABLE_GITHUB_AUTH &&
          <Section className={b('oauth-section')()} small>
            <Row className={b('button-section')()} col>
              <Button className={b('button')()} mod='primary' type='button' onClick={authorizeThroughGithub}>
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
