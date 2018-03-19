import R from 'ramda'
import transformFormValues from './transformFormValues'

const getUpdatedEndpoint = values => selectedPlugins => {
  const getTransformedValues = values => transformFormValues(values, true)
  const extractPlugins = obj => obj.plugins
  const getAddedPlugins = arr => arr.filter(plugin =>
    selectedPlugins.indexOf(plugin.name) !== -1
  )
  const createUpdatedEndpoint = arr => ({
    ...getTransformedValues(values),
    plugins: arr
  })

  return R.compose(
    createUpdatedEndpoint,
    getAddedPlugins,
    extractPlugins,
    getTransformedValues
  )(values)
}

export default getUpdatedEndpoint
