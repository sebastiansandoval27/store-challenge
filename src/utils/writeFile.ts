import fs from 'fs'
import path from 'path'

interface readFileType {
  data: any
  file: any
}

export const readFileSync = async (pathRoute: string): Promise<readFileType> => {
  try {
    const file = fs.readFileSync(path.join(__dirname, pathRoute), 'utf8')
    if (!file) {
      // Create file
      const fileCreated = fs.writeFileSync(path.join(__dirname, pathRoute), JSON.stringify([]), 'utf8')
      const returnObject = {
        data: [],
        file: fileCreated,
      }
      return new Promise((resolve) => {
        resolve(returnObject)
      })
    } else {
      return new Promise((resolve) => {
        resolve({
          data: JSON.parse(file),
          file: file,
        })
      })
    }
  } catch (error) {
    console.log(error)

    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}

export const writeFileSync = (pathRoute: string, data: any): Promise<boolean> => {
  try {
    const file = fs.readFileSync(path.join(__dirname, pathRoute), 'utf8')

    if (!file) {
      fs.writeFileSync(path.join(__dirname, pathRoute), JSON.stringify(data), 'utf8')
      return new Promise((resolve) => {
        resolve(true)
      })
    }

    fs.writeFileSync(path.join(__dirname, pathRoute), JSON.stringify(data), 'utf8')

    return new Promise((resolve) => {
      resolve(true)
    })
  } catch (error) {
    console.log(error)
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}
