import { connect } from 'react-redux'

import { getJWTtoken } from '../../../store/actions'

const AuthorizationCallback = props => {
  props.getJWTtoken(document.location.hash)

  return null
}

export default connect(
  null, // mapStateToProps
  { getJWTtoken }
)(AuthorizationCallback)
