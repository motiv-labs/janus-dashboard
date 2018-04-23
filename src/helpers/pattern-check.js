import validation from './validation'

const checkOnPattern = pattern => value => {
  console.error('>>>>>>', pattern, value)
  if (value && !validation(pattern)(value)) {
    return true
  }

  return undefined
}

export default checkOnPattern
