import { Context, createContext, useContext } from 'react'

enum ContextMap {
  Location = 'location',
}

const map = new Map<ContextMap, Context<unknown>>()

const createCustomContext = (key: ContextMap, defaultValue: unknown) => {
  map.set(key, createContext(defaultValue))

  return defaultValue
}

const useCustomContext = (key: ContextMap) => {
  return useContext(map.get(key) as Context<unknown>)
}

export { useContext, ContextMap, useCustomContext, createCustomContext }
