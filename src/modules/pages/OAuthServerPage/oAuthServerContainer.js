import { connect } from 'react-redux'

import {
  clearOAuthServer,
  fetchOAuthServer,
  fetchOAuthServerSchema,
  updateOAuthServer
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
    updateOAuthServer
  }
)(OAuthServerItem)
