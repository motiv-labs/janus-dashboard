import { connect } from 'react-redux'

import {
  closeToaster
} from '../../store/actions'

import Toaster from '../../components/Toaster/Toaster'

export default connect(
  state => ({
    toaster: state.confirmationReducer.toaster
  }),
  {
    closeToaster: closeToaster
  }
)(Toaster)
