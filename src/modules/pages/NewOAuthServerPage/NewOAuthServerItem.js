import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import transformFormValues from '../../../helpers/transformFormValues'

import Section from '../../Layout/Section/Section'
import OAuthServerForm from './OAuthServerForm'
import Preloader from '../../../components/Preloader/Preloader'

const propTypes = {
  schema: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  confirmAction: PropTypes.func.isRequired
}

class NewOAuthServerItem extends PureComponent {
  componentDidMount () {
    this.props.fetchOAuthServerSchema()
  }

  submit = values => {
    const transformedValues = transformFormValues(values, true)

    this.props.confirmAction('save', 'OAuthServer', transformedValues)
  }

  renderForm = () => {
    return (
      <OAuthServerForm
        schema={this.props.schema}
        onSubmit={this.submit}
        initialValues={transformFormValues(this.props.schema)}
      />
    )
  }

  render () {
    if (R.isEmpty(this.props.schema)) return <Preloader />

    return (
      <Section outer>
        { this.renderForm() }
      </Section>
    )
  }
}

NewOAuthServerItem.propTypes = propTypes

export default NewOAuthServerItem
