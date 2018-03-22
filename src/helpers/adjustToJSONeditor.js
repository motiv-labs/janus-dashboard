import R from 'ramda'
import jsBeautify from 'js-beautify'

export default function adjustToJSONeditor (json) {
  return R.compose(
    jsBeautify,
    JSON.stringify
  )(json)
}
