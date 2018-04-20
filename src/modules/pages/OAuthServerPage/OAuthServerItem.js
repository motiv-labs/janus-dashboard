import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import isAnyEmpty from '../../../helpers/isAnyEmpty'
import transformFormValues from '../../../helpers/transformFormValues'

import Preloader from '../../../components/Preloader/Preloader'
import Section from '../../Layout/Section/Section'
import OAuthServerForm from '../NewOAuthServerPage/OAuthServerForm'

const propTypes = {
  clearOAuthServer: PropTypes.func.isRequired,
  fetchOAuthServer: PropTypes.func.isRequired,
  fetchOAuthServerSchema: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  oAuthServer: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  confirmAction: PropTypes.func.isRequired
}

class OAuthServerItem extends PureComponent {
  componentDidMount () {
    this.props.fetchOAuthServerSchema()
    this.props.fetchOAuthServer(this.props.location.pathname)
  }

  componentWillUnmount () {
    this.props.clearOAuthServer()
  }

  submit = values => {
    const transformedValues = transformFormValues(values, true)

    this.props.confirmAction('update', 'OAuthServer', transformedValues)
  }

  renderForm = () => (
    <OAuthServerForm
      schema={this.props.schema}
      onSubmit={this.submit}
      initialValues={transformFormValues(this.props.oAuthServer)}
      editing
    />
  )

  render () {
    if (isAnyEmpty([
      this.props.oAuthServer,
      this.props.schema
    ])) return <Preloader />

    return (
      <Section outer>
        { this.renderForm() }
      </Section>
    )
  }
}

OAuthServerItem.propTypes = propTypes

export default OAuthServerItem
