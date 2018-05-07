import R from 'ramda'

import client from '../api'
import {
  FETCH_OAUTH_SERVER_START,
  FETCH_OAUTH_SERVER_SUCCESS,
  FETCH_OAUTH_SERVER_SCHEMA_START,
  FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
  UPDATE_OAUTH_SERVER_START,
  UPDATE_OAUTH_SERVER_SUCCESS,
  CLEAR_OAUTH_SERVER,
  SAVE_OAUTH_SERVER_START,
  SAVE_OAUTH_SERVER_SUCCESS,
  SAVE_OAUTH_SERVER_FAILURE,
  DELETE_OAUTH_SERVER_START,
  DELETE_OAUTH_SERVER_SUCCESS,
  DELETE_OAUTH_SERVER_FAILURE
} from '../constants'
import {
  fetchOAuthServers,
  closeConfirmation
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

export const updateOAuthServerRequest = api => ({
  type: UPDATE_OAUTH_SERVER_START,
  payload: api
})

export const updateOAuthServerSuccess = () => ({
  type: UPDATE_OAUTH_SERVER_SUCCESS
})

export const redirectToServersList = () => history.push('/oauth/servers')

export const fetchOAuthServer = path => async dispatch => {
  dispatch(getOAuthServerRequest())

  try {
    const response = await client.get(`${path}`)
    const oAuthServer = response.data
    const rateLimit = oAuthServer.rate_limit.limit.split('-')
    const secretsArr = Object.keys(oAuthServer.secrets)
    const secrets = secretsArr.reduce((memo, item) => {
      memo.push({
        key: item,
        value: oAuthServer.secrets[item]
      })

      return memo
    }, [])
    const rateLimitValues = {
      value: rateLimit[0] * 1,
      unit: rateLimit[1]
    }
    const lens = R.lensPath(['rate_limit', 'limit'])
    const lensSecrets = R.lensPath(['secrets'])
    const updatedOAuthServer = R.set(lens, rateLimitValues, oAuthServer)
    const ss = R.set(lensSecrets, secrets, updatedOAuthServer)

    dispatch(getOAuthServerSuccess(ss))
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

export const saveOAuthServerRequest = () => ({
  type: SAVE_OAUTH_SERVER_START
})

export const saveOAuthServerSuccess = data => ({
  type: SAVE_OAUTH_SERVER_SUCCESS,
  payload: data
})

export const saveOAuthServerFailure = () => ({
  type: SAVE_OAUTH_SERVER_FAILURE
})

export const saveOAuthServer = ({ isEditing }) => server => async (dispatch, wtf) => {
  dispatch(saveOAuthServerRequest())
  dispatch(closeConfirmation())

  const composeRateLimit = server => {
    const { value, unit } = server.rate_limit.limit
    const concatenation = `${value}-${unit}`
    const lens = R.lensPath(['rate_limit', 'limit'])

    return R.set(lens, concatenation, server)
  }

  const transformSecrets = server => {
    const transformedSecrets = server.secrets.reduce((memo, item) => {
      memo[item.key] = item.value

      return memo
    }, {})
    const lens = R.lensPath(['secrets'])

    return R.set(lens, transformedSecrets, server)
  }

  const createFinalServer = R.compose(
    transformSecrets,
    composeRateLimit
  )

  try {
    await saveEntity(isEditing)

    dispatch(saveOAuthServerSuccess(server))
    if (!isEditing) {
      redirectToServersList()
    }
  } catch (error) {
    dispatch(closeConfirmation())
    errorHandler(dispatch)(error)
  }

  async function saveEntity (isEditing) {
    isEditing
      ? await client.put(`oauth/servers/${server.name}`, createFinalServer(server))
      : await client.post('oauth/servers', createFinalServer(server))
  }
}

export const deleteOAuthServerRequest = () => ({
  type: DELETE_OAUTH_SERVER_START
})

export const deleteOAuthServerSuccess = serverName => ({
  type: DELETE_OAUTH_SERVER_SUCCESS,
  payload: serverName
})

export const deleteOAuthServerFailure = () => ({
  type: DELETE_OAUTH_SERVER_FAILURE
})

export const deleteOAuthServer = serverName => async dispatch => {
  dispatch(deleteOAuthServerRequest())
  dispatch(closeConfirmation())

  try {
    await client.delete(`oauth/servers/${serverName}`)

    dispatch(deleteOAuthServerSuccess(serverName))
    dispatch(fetchOAuthServers())
    redirectToServersList()
  } catch (error) {
    dispatch(deleteOAuthServerFailure())
    errorHandler(dispatch)(error)
  }
}

export const clearOAuthServer = () => ({
  type: CLEAR_OAUTH_SERVER
})
