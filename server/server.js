import * as Path from 'node:path'
import * as URL from 'node:url'
import * as fsPromises from 'node:fs/promises'
import express from 'express'
import hbs from 'express-handlebars'


const server = express()

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

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

//get the root page
server.get('/', async (req, res) => {
    const filePath = Path.join(__dirname, 'data', 'data.json')
    const data = await fsPromises.readFile(filePath, 'utf-8')
    const notes = JSON.parse(data)
    const viewData = notes
    res.render('home', viewData)
    
    })
    

//get the individual note from the root page OR setup for the popup
server.get('/', async (req, res) => {
    const filePath = Path.join(__dirname,  'data', 'data.json')
    const data = await fsPromises.readFile(filePath, 'utf-8')
    const notes = JSON.parse(data)
    const viewData = notes
    res.render('home', viewData)
    })

 //For the GET /fridge/:id/edit route: EDITING THE NOTE
 server.get('/fridge/:id/edit', async(req, res) => {
    const id = req.params.id
    const filePath = Path.join(__dirname,  'data', 'data.json')
    const data = await fsPromises.readFile(filePath, 'utf-8')
    const parsedData = JSON.parse(data)
    const viewData = parsedData.fridgeData.find((note) => note.id == id)
    res.render('edit', viewData)
  })

//For the POST /fridge/:id/edit route: EDITING THE NOTE
server.post('/fridge/:id/edit', async(req, res) => {
  const id = req.params.id
  const filePath = Path.join(__dirname,  'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  const note = notes.fridgeData.find((obj) => obj.id == id) 
  const body = req.body
  for (const key in body) {
    note[key] = body[key]
  }}
)

//adding = add new object at the end of the JSON file

server.post('/fridge/:id/edit', async(req, res) => {
  const id = req.params.id
  const filePath = Path.join(__dirname,  'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.stringify(data)
  const note = notes.fridgeData.find((obj) => obj.id == id) 
  const body = req.body
   
  Object.keys(data).map(
    function(id){
      data[id]["name"]=[body]
      data[id]["note"]=[body]
  })
 })




//

//deleting = matching the place in the JSON file and removing/deleting it. 
//if id = id then delete

server.post('/fridge/:id/edit', async(req, res) => { 
  const id = req.params.id
  const filePath = Path.join(__dirname,  'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.stringify(data)
  const note = notes.fridgeData.find((obj) => obj.id == id) 
  
  for (let [i, note] of note.entries()) {
    if (id === id) {
      notes.splice(i, [i])
    }
  }
  
 })




////////////////////////////////////////////////////////////////////////////////////////////////////


  // const stringified = JSON.stringify(notes, null, 2)

//   await fsPromises.writeFile(filePath, stringified, { encoding: 'utf-8' })

//   res.redirect(`/fridgeData/${id}`)



export default server
