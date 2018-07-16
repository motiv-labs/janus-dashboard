import { connect } from 'react-redux'

import {
  authenticateWithUsernamePassword,
  getGithubAuthorizationCode
} from '../../../store/actions'

import FormWrapper from './LoginForm'

const initialValues = {
  admin_url: window.MAIN_CONFIG.gateway.admin_url
}

const mapStateToProps = state => ({
  errorMsg: state.userSessionReducer.errorMsg,
  isFetching: state.requestReducer.isFetching,
  user: state.userSessionReducer.user,
  config: window.MAIN_CONFIG,
  initialValues
})

export default connect(
  mapStateToProps,
  { authenticateWithUsernamePassword, getGithubAuthorizationCode }
)(FormWrapper)
