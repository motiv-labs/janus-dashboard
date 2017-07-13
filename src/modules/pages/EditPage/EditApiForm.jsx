import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormField from '../../forms/FormField';
import FormInput from '../../forms/FormInput';
import FormLabel from '../../forms/FormLabel';

import RenderPlugins from '../../forms/RenderPlugins';

// const renderField = ({ input, label, type, disabled, meta:{ touched, error, warning } }) => {
//   console.error('ssss', disabled, input);
//   return (
//     <div className="j-form-field">
//       <label className="label" htmlFor={input.name}>{label}</label>
//       <input className="input" {...input}  type={type} value={input.name} disabled={disabled} />
//     </div>
//   );
// };

let ApiForm = props => {
  // console.warn('Props pf API form', props.initialValues.plugins);
  const { 
    handleSubmit, 
    // pristine,
    // reset,
    // submitting,
  } = props;

  const renderPlugin = plugins => {
    return plugins.map((plugin, index) => {
      return (
        <Section key={plugin.name}>
          <FormRow key={plugin.name}>
            <FormInput component="input" label="Plugin" attachTo={`plugins[${index}].name`} type="text" disabled />
            <FormInput component="input" label="Enabled" attachTo={`plugins[${index}].enabled`} type="checkbox" normalize={v => !!v} />
            
            {/*<div className="j-form-field">
              <label className="label" htmlFor={`plugins[${index}].enabled`}>Enabled</label>
              <Field name={`plugins[${index}].enabled`} component="input" type="checkbox" normalize={v => !!v} />
            </div>*/}

            <FormField>
              <FormLabel className="label" text="Config" />
                {
                  plugin.config && Object.keys(plugin.config).map(item => {
                    return (
                      <FormInput key={item} component="input" label={item} attachTo={`plugins[${index}].config[${item}]`} type="text"/>
                    );
                  })
                }
            </FormField>
          </FormRow>
        </Section>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <FormRow>
          <FormInput component="input" label="Listen Path" attachTo="proxy.listen_path" type="text"/>
          <FormInput component="input" label="Upstream URL" attachTo="proxy.upstream_url" type="text"/>
          <FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox"/>
          <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox"/>
          <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox"/>
        </FormRow>
      </Section>

      { 
        !!props.initialValues.plugins &&
          <RenderPlugins plugins={props.initialValues.plugins} />
          //renderPlugin(props.initialValues.plugins) 
      }

      <FormRow centered>
        <button className="save-btn" type="submit">Submit</button>
      </FormRow>
    </form>
  );
};

ApiForm = reduxForm({
  form: 'apiForm',
  enableReinitialize: true, // this is needed!!
})(ApiForm);

ApiForm = connect(
  state => {
    return ({
      initialValues: state.apiReducer.api,
    });
  },
  null
)(ApiForm);

export default ApiForm;
