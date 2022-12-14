import { Pop } from "./Pop.js"
import {logger} from "./Logger"

export function saveState(key, value) {
  try {
    let data = value
    if (typeof value != 'string') {
      data = JSON.stringify(data)
    }
    window.localStorage.setItem(key, data)
  } catch (error) {
    logger.error('[SAVING_STATE]', { key, value })
    Pop.error(error)
  }
}

export function loadState(key, instanceType) {
  try {
    let data = JSON.parse(window.localStorage.getItem(key) || '[]')
    if (Array.isArray(data) && instanceType) {
      return data.map(i => new instanceType(i))
    }
    return data
  } catch (error) {
    logger.error('[ATTEMPTING_TO_LOAD_STATE]', { key, instanceType })
    Pop.error(error)
  }
}