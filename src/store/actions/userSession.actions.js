import axios from 'axios'
import jwt from 'jsonwebtoken'
import history from '../configuration/history'
import {
  clearLocalStorage,
  getAccessToken,
  getUserName,
  removeCSRFToken,
  setAccessToken,
  setCSRFToken,
  setGatewayAdminURL,
  setUserName
} from '../api'
import {
  CHECK_LOGGED_STATUS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants'
import { requestStart, requestComplete, requestFailure } from './request.actions'
import { openResponseModal } from './apiResponse.actions'
import getRandomString from '../../helpers/getRandomString'

/* eslint-disable */
const config = window.MAIN_CONFIG
/* eslint-enable */

export const checkLoggedStatus = () => ({
  type: CHECK_LOGGED_STATUS
})

export const loginRequest = () => ({
  type: LOGIN_START
})

export const loginSuccess = (userName, isAdmin) => ({
  type: LOGIN_SUCCESS,
  payload: {
    userName,
    isAdmin
  }
})

export const loginFailure = message => ({
  type: LOGIN_FAILURE,
  payload: message
})

export const getGitHubAccessToken = (authorizationCode, csrfToken) => async dispatch => {
  // Perform CSRF token check
  if (window.localStorage.csrf_token !== csrfToken) {
    throw new Error('Invalid or missing CSRF token.')
  } else {
    removeCSRFToken()
  }

  dispatch(requestStart())

  try {
    const params = createParams({
      client_id: config.oauth.github.client_id,
      code: authorizationCode
    })
    const response = await axios.post(`${config.oauth.github.token_url}?${params}`)
    const token = getParam('access_token', response.data)

    dispatch(requestComplete())

    return token
  } catch (error) {
    dispatch(requestFailure())
    dispatch(openResponseModal({
      message: error.message
    }))
  }
}

export const getGithubAuthorizationCode = payload => async dispatch => {
  dispatch(requestStart())
  setGatewayAdminURL(stripTrailingSlash(payload.admin_url))

  // Direct user to GitHub Authorization Page
  const csrfToken = getRandomString()
  const params = createParams({
    client_id: config.oauth.github.client_id,
    response_type: 'code',
    scope: config.oauth.github.scope,
    state: csrfToken
  })

  setCSRFToken(csrfToken)
  window.location.href = `${config.oauth.github.authorize_url}?${params.toString()}`
}

export const authenticateWithGitHubAuthorizationCode = (authorizationCode, state) => async dispatch => {
  try {
    const githubToken = await dispatch(getGitHubAccessToken(authorizationCode, state))

    dispatch(authenticateWithGitHubToken(githubToken))
  } catch (error) {
    dispatch(openResponseModal({
      message: error.message
    }))
    clearLocalStorage()
  }
}

export const authenticateWithUsernamePassword = payload => async dispatch => {
  dispatch(requestStart())
  dispatch(loginRequest())

  const gatewayAdminURL = stripTrailingSlash(payload.admin_url)

  try {
    const url = `${gatewayAdminURL}/login`
    const response = await axios.post(url, {
      username: payload.username,
      password: payload.password
    })

    setAccessToken(response.data.access_token)
    setGatewayAdminURL(gatewayAdminURL)
    setUserName(payload.username)
    history.push('/')
    dispatch(getUserStatus())
    dispatch(requestComplete())
  } catch (error) {
    dispatch(requestFailure())
    dispatch(loginFailure())
    dispatch(openResponseModal({
      message: error.message
    }))
    clearLocalStorage()
  }
}

export const authenticateWithGitHubToken = githubToken => async dispatch => {
  dispatch(requestStart())
  dispatch(loginRequest())

  try {
    const url = `${window.localStorage.admin_url}/login?provider=github`
    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${githubToken}`
      }
    })
    const token = response.data.access_token

    setAccessToken(token)
    dispatch(getUserStatus())
    dispatch(requestComplete())
    history.push('/')
  } catch (error) {
    dispatch(requestFailure())
    dispatch(loginFailure('The login or password you entered is incorrect.'))
    dispatch(openResponseModal({
      message: error.message
    }))
  }
}

export const logout = () => dispatch => {
  clearLocalStorage()
  dispatch(getUserStatus())
  dispatch({
    type: LOGOUT
  })
}

export const getUserStatus = () => dispatch => {
  dispatch(checkLoggedStatus())
  const token = getAccessToken()

  if (token) {
    const userName = getUserNameFromToken(token) || getUserName()
    const userRole = getUserRoleFromToken(token) || true

    dispatch(loginSuccess(
      userName,
      userRole
    ))
  } else {
    history.push('/login')
  }
}

function getUserNameFromToken (token) {
  const payload = jwt.decode(token)

  return payload ? payload.sub : false
}

function getUserRoleFromToken (token) {
  const payload = jwt.decode(token)

  return payload ? payload.is_admin : false
}

function createParams (params) {
  const p = new URLSearchParams()
  for (const key in params) {
    p.append(key, params[key])
  }
  return p.toString()
}

function getParam (param, string) {
  const params = new URLSearchParams(string)
  return params.get(param)
}

function stripTrailingSlash (s) {
  return s.replace(/\/$/, '')
}
