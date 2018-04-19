import { connect } from 'react-redux'

import {
  clearOAuthServer,
  fetchOAuthServer,
  fetchOAuthServerSchema,
  confirmAction
} from '../../../store/actions'

import OAuthServerItem from './OAuthServerItem'

const mapStateToProps = state => ({
  oAuthServer: state.oAuthServerReducer.oAuthServer,
  schema: state.oAuthServerReducer.oAuthServerSchema
})

export default connect(
  mapStateToProps,
  {
    clearOAuthServer,
    fetchOAuthServer,
    fetchOAuthServerSchema,
    confirmAction
  }
)(OAuthServerItem)
