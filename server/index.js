import server from './server.js'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as fsPromises from 'node:fs/promises'

const port = 3000

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const filePath = Path.join(__dirname, 'data', 'data.json')

server.listen(port, function () {
  // eslint-disable-next-line no-console
  //console.log('Server is listening on port', port)
})

//compiling fridge data into table rows

async function organiseDataRows() {
  const fridgeData = await fsPromises.readFile(filePath, 'utf-8')

  const notes = JSON.parse(fridgeData)

  const viewData = notes

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

  console.log(row1)
  console.log(row2)
  console.log(row3)
}

organiseDataRows()
