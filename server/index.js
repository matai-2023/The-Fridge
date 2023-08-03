import server from './server.js'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as fsPromises from 'node:fs/promises'
import express from 'express'
import hbs from 'express-handlebars'

const port = 3000

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const filePath = Path.join(__dirname, 'data', 'data.json')

server.listen(port, function () {
  // eslint-disable-next-line no-console
  //console.log('Server is listening on port', port)
})

//compiling fridge data into table rows

export async function organiseDataRows(filePath) {
  const fridgeData = await fsPromises.readFile(filePath, 'utf-8')
  console.log(fridgeData)
  const notes = JSON.parse(fridgeData)
  const viewData = notes
  await console.log(viewData)

  const eachNote = viewData.data.map((note) => {
    console.log(note)
  })
  console.log(eachNote)

  const rows = []

  const numRows = Math.ceil(viewData.length / 3)
  // console.log(numRows)

  for (let i = 0; i < numRows; i++) {
    const startOfRow = i * 3
    const endOfRow = startOfRow + 3

    const rowData = viewData.slice(startOfRow, endOfRow)

    rows.push(rowData)
  }
  // console.log(rows)
}

console.log(organiseDataRows(filePath))
