import { connect } from 'react-redux'

import { authenticateWithGitHubAuthorizationCode } from '../../../store/actions'

const AuthorizationCallback = ({
  authenticateWithGitHubAuthorizationCode
}) => {
  const authorizationCode = getParam('code', window.location.search)
  const csrfToken = getParam('state', window.location.search)

  authenticateWithGitHubAuthorizationCode(authorizationCode, csrfToken)

  return null
}

export default connect(
  null, // mapStateToProps
  { authenticateWithGitHubAuthorizationCode }
)(AuthorizationCallback)

function getParam (param, string) {
  const params = new URLSearchParams(string)

  return params.get(param)
}
