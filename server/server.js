import * as Path from 'node:path'
import * as URL from 'node:url'
import * as fsPromises from 'node:fs/promises'
import express from 'express'
import hbs from 'express-handlebars'


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

  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  let viewData = notes

  let notesArray = viewData.FridgeData

  const row1 = []
  const row2 = []
  const row3 = []

  notesArray.map((object) => {
    if (object['id'] === 1 || object['id'] === 2 || object['id'] === 3) {
      row1.push(object)
    } else if (object['id'] === 4 || object['id'] === 5 || object['id'] === 6) {
      row2.push(object)
    } else if (object['id'] === 7 || object['id'] === 8 || object['id'] === 9) {
      row3.push(object)
    }
  })
  viewData = { row1, row2, row3 }

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




// //adding = add new object(id) with two key/values(name/note) at the end of the JSON file

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


//deleting = matching the place in the JSON file and removing/deleting it.
//if id = id then delete

server.post('/fridge/:id/edit', async(req, res) => {

  const id = req.params.id
  const filePath = Path.join(__dirname, 'data', 'data.json')
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)

  const note = notes.fridgeData.find((obj) => obj.id == id) 
  const body = req.body
  for (const key in body) {
    note[key] = ""
  }}
)
  
  
  ////////////////// delete a specific object in the array ///////////////////
  // const removeById = (notes, id) => {
    //    const requiredIndex = notes.findIndex(el => {
      //       return el.id === String(id)
      //    });
      //    if(requiredIndex === -1){
        //       return false;
        //    }
        //    return !!notes.splice(requiredIndex, 1)
        // }
        
//old detele function 
        //   for (let [i, note] of note.entries()) {
        //     if (id === id) {
        //       notes.splice(i, [note])
        //     }}
        //  })
        
        
// onclick function to redirect to the main page from the editing page
server.get('/fridge/:id/edit'),
  async (req, res) => {
    const id = res.params.id
    const filePath = Path.join(__dirname, 'data', 'data.json')
    const data = await fsPromises.readFile(filePath, 'utf-8')

    let object = document.getElementByType()
    object.onclick = function click() {
      return res.redirect('/fridge/:id/edit')
    }
  }


////////////////////////////////////////////////////////////////////////////////////////////////////

// const stringified = JSON.stringify(notes, null, 2)

// await fsPromises.writeFile(filePath, stringified, { encoding: 'utf-8' })

// res.redirect(`/fridgeData/${id}`)

export default server
