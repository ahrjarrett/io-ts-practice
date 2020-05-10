const express = require('express')
const graphbrainz = require('graphbrainz').default

const app = express()

app.use(
  '/graph',
  graphbrainz({
    graphiql: true,
  }),
)

app.listen(7777)
