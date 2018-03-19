const toValueAndLabel = item => ({
  label: item,
  value: item
})

const optionsTransformer = config => config.map(toValueAndLabel)

export default optionsTransformer
