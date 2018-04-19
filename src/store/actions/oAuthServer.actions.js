import R from 'ramda'

import client from '../api'
import {
  FETCH_OAUTH_SERVER_START,
  FETCH_OAUTH_SERVER_SUCCESS,
  FETCH_OAUTH_SERVER_SCHEMA_START,
  FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
  SAVE_OAUTH_SERVER_START,
  SAVE_OAUTH_SERVER_SUCCESS,
  UPDATE_OAUTH_SERVER_START,
  UPDATE_OAUTH_SERVER_SUCCESS,
  DELETE_OAUTH_SERVER_START,
  DELETE_OAUTH_SERVER_SUCCESS,
  CLEAR_OAUTH_SERVER,

  ___SAVE_OAUTH_SERVER_START,
  ___SAVE_OAUTH_SERVER_SUCCESS,
  ___SAVE_OAUTH_SERVER_FAILURE,
  ___DELETE_OAUTH_SERVER_START,
  ___DELETE_OAUTH_SERVER_SUCCESS,
  ___DELETE_OAUTH_SERVER_FAILURE
} from '../constants'
import {
  fetchOAuthServers,
  ___closeConfirmation
} from './index'
import history from '../configuration/history'
import oAuthServerSchema from '../../configurations/oAuthServerSchema.config'
import errorHandler from '../../helpers/errorHandler'

const getOAuthServerRequest = () => ({
  type: FETCH_OAUTH_SERVER_START
})

const getOAuthServerSuccess = data => ({
  type: FETCH_OAUTH_SERVER_SUCCESS,
  payload: data
})

export const getOAuthSchemaRequest = () => ({
  type: FETCH_OAUTH_SERVER_SCHEMA_START
})

export const getOAuthSchemaSuccess = api => ({
  type: FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
  payload: api
})

export const saveOAuthServerRequest = api => ({
  type: SAVE_OAUTH_SERVER_START,
  payload: api
})

export const saveOAuthServerSuccess = () => ({
  type: SAVE_OAUTH_SERVER_SUCCESS
})

export const updateOAuthServerRequest = api => ({
  type: UPDATE_OAUTH_SERVER_START,
  payload: api
})

export const updateOAuthServerSuccess = () => ({
  type: UPDATE_OAUTH_SERVER_SUCCESS
})

export const deleteOAuthServerRequest = () => ({
  type: DELETE_OAUTH_SERVER_START
})

export const deleteOAuthServerSuccess = () => ({
  type: DELETE_OAUTH_SERVER_SUCCESS
})

export const redirectToServersList = () => history.push('/oauth/servers')

export const fetchOAuthServer = path => async dispatch => {
  dispatch(getOAuthServerRequest())

  try {
    const response = await client.get(`${path}`)
    const oAuthServer = response.data
    const rateLimit = oAuthServer.rate_limit.limit.split('-')
    const rateLimitValues = {
      value: rateLimit[0] * 1,
      unit: rateLimit[1]
    }
    const lens = R.lensPath(['rate_limit', 'limit'])
    const updatedOAuthServer = R.set(lens, rateLimitValues, oAuthServer)

    dispatch(getOAuthServerSuccess(updatedOAuthServer))
  } catch (error) {
    errorHandler(dispatch)(error)
  }
}

export const fetchOAuthServerSchema = () => async dispatch => {
  dispatch(getOAuthSchemaRequest)

  try {
    dispatch(getOAuthSchemaSuccess(oAuthServerSchema))
  } catch (error) {
    errorHandler(dispatch)(error)
  }
}

export const ___saveOAuthServerRequest = () => ({
  type: ___SAVE_OAUTH_SERVER_START
})

export const ___saveOAuthServerSuccess = data => ({
  type: ___SAVE_OAUTH_SERVER_SUCCESS,
  payload: data
})

export const ___saveOAuthServerFailure = () => ({
  type: ___SAVE_OAUTH_SERVER_FAILURE
})

export const ___saveOAuthServer = ({ isEditing }) => server => async (dispatch, wtf) => {
  dispatch(___saveOAuthServerRequest())
  dispatch(___closeConfirmation())

  const composeRateLimit = server => {
    const { value, unit } = server.rate_limit.limit
    const concatenation = `${value}-${unit}`
    const lens = R.lensPath(['rate_limit', 'limit'])

    return R.set(lens, concatenation, server)
  }

  try {
    await saveEntity(isEditing)

    dispatch(___saveOAuthServerSuccess(server))
    redirectToServersList()
  } catch (error) {
    dispatch(___closeConfirmation())
    errorHandler(dispatch)(error)
  }

  async function saveEntity (isEditing) {
    isEditing
      ? await client.put(`oauth/servers/${server.name}`, composeRateLimit(server))
      : await client.post('oauth/servers', composeRateLimit(server))
  }
}

export const ___deleteOAuthServerRequest = () => ({
  type: ___DELETE_OAUTH_SERVER_START
})

export const ___deleteOAuthServerSuccess = serverName => ({
  type: ___DELETE_OAUTH_SERVER_SUCCESS,
  payload: serverName
})

export const ___deleteOAuthServerFailure = () => ({
  type: ___DELETE_OAUTH_SERVER_FAILURE
})

export const ___deleteOAuthServer = serverName => async dispatch => {
  dispatch(___deleteOAuthServerRequest())
  dispatch(___closeConfirmation())

  try {
    await client.delete(`oauth/servers/${serverName}`)

    dispatch(___deleteOAuthServerSuccess(serverName))
    dispatch(fetchOAuthServers())
    redirectToServersList()
  } catch (error) {
    dispatch(___deleteOAuthServerFailure())
    errorHandler(dispatch)(error)
  }
}

export const clearOAuthServer = () => ({
  type: CLEAR_OAUTH_SERVER
})
