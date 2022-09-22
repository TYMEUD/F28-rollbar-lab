const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())

app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '4a8853d29fb14a5bbe8b7393a91efd32',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const movies = ['The Mask', 'Parasyte', 'Jimothy saved christmas']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/movies', (req, res) => {
    res.status(200).send(movies)
})

app.post('/api/movies', (req, res) => {
   let {title} = req.body

   const index = movies.findIndex(movie => {
       return movie === title
   })

   try {
       if (index === -1 && title !== '') {
           movies.push(title)
           rollbar.log('Movie was added successfully')
           res.status(200).send(movies)
       } else if (title === ''){
            rollbar.error('No movie was provided')
           res.status(400).send('You must enter a movie.')
       } else {
           rollbar.warning('Movie is already in array')
           res.status(400).send('That movie already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/movies/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    rollbar.info('Movie was deleted')
    res.status(200).send(students)
})

try {
    nonExistentFunction();
  } catch (error) {
    console.error(error)};

const port = process.env.PORT || 6969

app.listen(port, () => console.log(`Server listening on ${port}`))
