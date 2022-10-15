import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { async } from '@firebase/util'

const initalState = {
  loading: null,
  error: null
}

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null }
    case 'INSERTED_DOC':
      return { loading: false, error: null }
    case 'ERROR':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const useInsertDocument = docCollection => {
  const [response, dispatch] = useReducer(insertReducer, initalState)

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const checkCancelledBeforeDispatch = action => {
    if (!cancelled) {
      dispatch(action)
    }
  }

  const insertDocument = async document => {
    checkCancelledBeforeDispatch({
      type: 'LOADING'
    })
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }

      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkCancelledBeforeDispatch({
        type: 'INSERTED_DOC',
        payload: insertDocument
      })
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: 'ERROR',
        payload: error.message
      })
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return { insertDocument, response }
}
