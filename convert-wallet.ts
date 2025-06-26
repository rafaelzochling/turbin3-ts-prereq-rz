import bs58 from 'bs58'
import prompt from 'prompt-sync'
import fs from 'fs'
import path from 'path'

const promptSync = prompt()

function readJsonFile(filename: string): any {
  try {
    const filePath = path.resolve(filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error: any) {
    throw new Error(`Failed to read JSON file: ${error.message}`)
  }
}

function base58_to_wallet_from_file() {
  while (true) {
    try {
      const filename = promptSync(
        'Enter JSON file name (with .json extension): '
      )
      if (!filename || filename.trim() === '') {
        throw new Error('Filename cannot be empty')
      }

      const base58String = readJsonFile(filename.trim())

      if (typeof base58String !== 'string') {
        throw new Error('JSON file must contain a base58 string')
      }

      const wallet = bs58.decode(base58String)
      console.log(`Your wallet is: [${wallet.toString()}]`)
      break
    } catch (error: any) {
      console.error(`Error: ${error.message}`)
      console.log('Expected JSON format: "your_base58_string_here"')

      const retry = promptSync('Do you want to try again? (y/n): ')
      if (retry.toLowerCase() !== 'y' && retry.toLowerCase() !== 'yes') {
        console.log('Conversion cancelled.')
        break
      }
    }
  }
}

function wallet_to_base58_from_file() {
  while (true) {
    try {
      const filename = promptSync(
        'Enter JSON file name (with .json extension): '
      )
      if (!filename || filename.trim() === '') {
        throw new Error('Filename cannot be empty')
      }

      const walletArray = readJsonFile(filename.trim())

      if (!Array.isArray(walletArray)) {
        throw new Error('JSON file must contain an array of numbers')
      }

      if (
        walletArray.some(
          (num) => typeof num !== 'number' || num < 0 || num > 255
        )
      ) {
        throw new Error('Wallet must contain only numbers between 0-255')
      }

      const base58 = bs58.encode(walletArray)
      console.log(`Your base58 wallet is: ${base58}`)
      break
    } catch (error: any) {
      console.error(`Error: ${error.message}`)
      console.log('Expected JSON format: [1, 2, 3, 4, 5, ...]')

      const retry = promptSync('Do you want to try again? (y/n): ')
      if (retry.toLowerCase() !== 'y' && retry.toLowerCase() !== 'yes') {
        console.log('Conversion cancelled.')
        break
      }
    }
  }
}

console.log('Choose an option:')
console.log('1. Convert base58 to wallet (from JSON file)')
console.log('2. Convert wallet to base58 (from JSON file)')

const choice = promptSync('Enter your choice (1 or 2): ')

if (choice === '1') {
  base58_to_wallet_from_file()
} else if (choice === '2') {
  wallet_to_base58_from_file()
} else {
  console.log('Invalid choice')
}
