import validation from './validation'

const checkOnPattern = pattern => value => value && !validation(pattern)(value) ? true : undefined

export default checkOnPattern
