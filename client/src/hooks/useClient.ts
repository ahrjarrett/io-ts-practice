import { useState, useEffect } from 'react'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { persistCache } from "apollo-cache-persist";
import { PersistedData, PersistentStorage } from "apollo-cache-persist/types";

const GRAPHQL_ENDPOINT = 'http://localhost:7777'

export async function createClient() {
  const cache = new InMemoryCache()
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
    //storage: window.localStorage as PersistedData<PersistentStorage<NormalizedCacheObject>>
  })

  const http = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  })
  const link = ApolloLink.from([http])

  // Add this if you decide to use Apollo for local state, for now stick
  // with React local state
  //cache.writeData({ data: { /* add any data you want initialized here */ } })

  const client = new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
  })

  return client
}

export function useClient() {
  const [client, setClient] = useState(null)
  // Our implementation persists the Apollo cache to localStorage to prevent calling the GitHub API too often.
  // Because where the client serves data from depends on whether we have data in localStorage, createClient
  // returns a Promise that resolves as soon as the store has finished persisting.
  useEffect(() => {
    createClient().then((client: any) => setClient(client))
  }, [])
  return client
}
