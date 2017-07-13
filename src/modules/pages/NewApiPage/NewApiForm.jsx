import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { typeOf } from '../../../helpers';

import plugins from '../../../configurations/pluginsSchema.json';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormField from '../../forms/FormField';
import FormInput from '../../forms/FormInput';
import FormLabel from '../../forms/FormLabel';
import RenderPlugins from '../../forms/RenderPlugins';

let ApiForm = props => {
  // console.warn('Props pf API form', props);
  const { 
    handleSubmit, 
    // pristine,
    // reset,
    // submitting,
  } = props;

  const renderPlugin = plugins => {
    return plugins.map((plugin, index) => {
      console.log('PLUGIN: ', plugin);
      return (
        <div className="j-form-field j-form-row BORDER" key={plugin.name}>
          <FormInput component="input" label="Plugin" attachTo={`plugins[${index}].name`} type="text" disabled/>
          <FormInput component="input" label="Enabled" attachTo={`plugins[${index}].enabled`} type="checkbox" normalize={v => !!v} />
          

          <FormField>
            <FormLabel text="Config" />
              {
                plugin.config && Object.keys(plugin.config).map(item => {
                  const config = plugins[index].config[item];
                  
                  if (typeOf(config, 'Object')) {
                    return (
                      <FormField key={item}>
                        <FormLabel text={item} />
                          {
                            Object.keys(config).map(el => {
                              if (typeOf(config[el], 'Object')) {
                                return (
                                  <FormField key={item}>
                                    <FormLabel text={item} />
                                      {
                                        Object.keys(config[el]).map(e => {
                                          return (
                                            <FormInput key={e} component="input" label={e} attachTo={`plugins[${index}].config[${item}][${el}][${e}]`} type="text" />
                                          );
                                        })
                                      }
                                  </FormField>
                                );
                              }

                              return (
                                <FormInput key={el} component="input" label={el} attachTo={`plugins[${index}].config[${item}][${el}]`} type="text" />
                              );
                            })
                          }
                      </FormField>
                    );
                  }
                  
                  return (
                    <FormInput key={item} component="input" label={item} attachTo={`plugins[${index}].config[${item}]`} type="text" />
                  );
                })
              }
          </FormField>
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <FormRow>
          <FormInput component="input" label="Name" attachTo="name" type="text"/>
        </FormRow>
      </Section>
      <Section>
        <FormRow>
          <FormInput component="input" label="Listen Path" attachTo="proxy.listen_path" type="text"/>
          <FormInput component="input" label="Upstream URL" attachTo="proxy.upstream_url" type="text"/>
          <FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox" normalize={v => !!v}/>
          <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox" normalize={v => !!v}/>
          <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox" normalize={v => !!v}/>
        </FormRow>
      </Section>

      {
        !!props.initialValues.plugins &&
          <RenderPlugins plugins={props.initialValues.plugins} />
      }

      <FormRow alignX>
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
