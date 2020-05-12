import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as t from 'io-ts'
import { Either, fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

import { Loading } from './Loading'
import './App.css'

const query = gql`
  query Songs {
    lookup {
      artist(mbid: "5b11f4ce-a62d-471e-81fc-a69a8278c7da") {
        name
        works {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
`

const Data = t.type({
  lookup: t.type({
    artist: t.type({
      name: t.string,
      works: t.type({
        edges: t.array(
          t.type({
            node: t.type({
              title: t.string,
            }),
          }),
        ),
      }),
    }),
  }),
})

type Data = t.TypeOf<typeof Data>

const onLeft = () => <p>Sorry, that data is malformed.</p>

const onRight = (data: Data) => (
  <header className='App-header'>
    <h1>Find music: </h1>
    <p>{data.lookup.artist.name}</p>
  </header>
)

export function App() {
  const { loading, error, data } = useQuery(query)
  const decodedData: Either<t.Errors, Data> = Data.decode(data)

  return (
    <div className='App'>{loading ? <Loading /> : pipe(decodedData, fold(onLeft, onRight))}</div>
  )
}
