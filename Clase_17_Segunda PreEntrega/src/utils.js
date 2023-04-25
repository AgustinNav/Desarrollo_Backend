import {fileURLToPath} from 'url'
import {dirname} from 'path'

const _filename = fileURLToPath(import.meta.url)
export const _dirname = dirname(_filename)

export const urlTest = "http://localhost:8080/api"