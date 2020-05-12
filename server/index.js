const express = require('express')
const graphbrainz = require('graphbrainz').default
const cors = require('cors')

const app = express()

app.use(cors())

app.use(
  '/',
  graphbrainz({
    graphiql: true,
  }),
)

app.listen(7777)
