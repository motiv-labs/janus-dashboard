/* eslint-env jest */

import apiResponseReducer, { initialState } from '../../../store/reducers/apiResponse.reducer'
import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL,
  CLOSE_TOASTER
} from '../../../store/constants/apiResponse.constants'
import touchedReducerProps from '../../../helpers/touchedReducerProperties'
import getRandomString from '../../../helpers/getRandomString'

describe('apiResponseReducer', () => {
  describe('Default', () => {
    it('returns the initial state by default', () => {
      const result = apiResponseReducer(initialState, {})

      expect(result).toEqual(initialState)
    })
  })

  describe('Response Modal manipulations', () => {
    describe('OPEN_RESPONSE_MODAL', () => {
      const message = getRandomString()
      const redirectOnClose = getRandomString()
      const status = getRandomString()
      const statusText = getRandomString()
      const payload = {
        message,
        redirectOnClose,
        status,
        statusText
      }
      const result = apiResponseReducer({}, {
        type: OPEN_RESPONSE_MODAL,
        payload
      })

      it('returns a open modal state after user tried to delete or save endpoint', () => {
        expect(result.message).toEqual(message)
        expect(result.redirectOnClose).toEqual(redirectOnClose)
        expect(result.status).toEqual(status)
        expect(result.statusText).toEqual(statusText)
        expect(result.isOpen).toEqual(true)
      })

      it('should handle only change exact amount of reducer properties', () => {
        expect(touchedReducerProps(result)).toBe(5)
      })
    })

    describe('CLOSE_RESPONSE_MODAL', () => {
      const result = apiResponseReducer(Math.random(), { type: CLOSE_RESPONSE_MODAL })

      it('returns the initial state when user closes the modal', () => {
        expect(result).toEqual(initialState)
      })
    })
  })

  describe('Toaster manipulations', () => {
    const toasterState = {
      isOpen: false,
      message: ''
    }

    describe('CLOSE_TOASTER', () => {
      const result = apiResponseReducer({}, {
        type: CLOSE_TOASTER
      })

      it('return initial state of the toaster', () => {
        expect(result.toaster.isOpen).toBe(toasterState.isOpen)
        expect(result.toaster.message).toBe(toasterState.message)
      })

      it('should handle only change exact amount of reducer properties', () => {
        expect(touchedReducerProps(result.toaster)).toBe(2)
      })
    })
  })
})
