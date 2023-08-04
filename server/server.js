import * as Path from 'node:path'
import * as URL from 'node:url'
import * as fsPromises from 'node:fs/promises'
import express from 'express'
import hbs from 'express-handlebars'
import { organiseDataRows } from './index.js'

const server = express()

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const filePath = Path.join(__dirname, 'data', 'data.json')

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here
//////////////////////////////////////////////////////////////////// route ///////////////////////////////////////////////////////////////////////////

// Route handler for the root page ("/")
server.get('/', async (req, res) => {
  const filePath = Path.join(__dirname, 'data', 'data.json')
  const notesData = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.parse(notesData)
  const rows = await organiseDataRows(notes.fridgeData)

  const viewData = {
    FridgeData: rows,
  }

  res.render('home', viewData)
})

//For the GET /fridge/:id/edit route: EDITING THE NOTE
server.get('/fridge/:id/edit', async (req, res) => {
  const id = req.params.id
  const filePath = Path.join(__dirname, 'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const parsedData = JSON.parse(data)
  const viewData = parsedData.fridgeData.find((note) => note.id == id)
  res.render('edit', viewData)
})

server.get('/', async (req, res) => {
  const rows = await organiseDataRows(filePath)
  res.render('home', { rows })
})

//For the POST /fridge/:id/edit route: EDITING THE NOTE
server.post('/fridge/:id/edit', async (req, res) => {
  const id = req.params.id
  const filePath = Path.join(__dirname, 'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  const note = notes.fridgeData.find((obj) => obj.id == id)
  const body = req.body
  for (const key in body) {
    note[key] = body[key]
  }
})

// //adding = add new object at the end of the JSON file

// server.post('/fridge/:id/edit', async(req, res) => {
//   const id = req.params.id
//   const filePath = Path.join(__dirname,  'data', 'data.json')
//   const data = await fsPromises.readFile(filePath, 'utf-8')
//   const notes = JSON.stringify(data)
//   const note = notes.fridgeData.find((obj) => obj.id == id)
//   const body = req.body

//   Object.keys(data).map(
//     function(id){
//       data[id]["name"]=[body]
//       data[id]["note"]=[body]
//   })
//  })

//

//deleting = matching the place in the JSON file and removing/deleting it.
//if id = id then delete

server.post('/fridge/:id/edit', async (req, res) => {
  const id = req.params.id
  const filePath = Path.join(__dirname, 'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  const noteIndex = notes.fridgeData.findIndex((obj) => obj.id == id)

  if (noteIndex !== -1) {
    notes.fridgeData.splice(noteIndex, 1)

    await fsPromises.writeFile(filePath, JSON.stringify(notes, null, 2))

    res.redirect('/')
  } else {
    // Handle note not found case
    res.status(404).send('Note not found')
  }
})

// onclick function to redirect to the main page from the editing page
server.get('/fridge/:id/edit', async (req, res) => {
  const id = req.params.id
  res.redirect(`/fridge/${id}/edit`)
})

////////////////////////////////////////////////////////////////////////////////////////////////////

// const stringified = JSON.stringify(notes, null, 2)

// await fsPromises.writeFile(filePath, stringified, { encoding: 'utf-8' })

// res.redirect(`/fridgeData/${id}`)

export default server
