import R from 'ramda'

const copyToClipboard = objectToCopy => {
  const textarea = R.compose(
    setValue(objectToCopy),
    createElement
  )('textarea')

  executeCopy(textarea)
}

export default copyToClipboard

function executeCopy (textarea) {
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy')
  document.body.removeChild(textarea)
}

function setValue (value) {
  return (element) => {
    element.value = JSON.stringify(value)

    return element
  }
}

function createElement (name) {
  return document.createElement(name)
}
