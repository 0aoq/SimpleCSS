/* SimpleCSS Compiler
 * Version: 1.0.0
 * License: MIT
 * Description: Compiles SimpleCSS into CSS
 * 
 * Options:
 * -i, --input <path>
 * -o, --output <path>
 * -h, --help
 * 
 * Example:
 * node compilecss.js -i ./input.css -o ./output.css
 */

import * as fs from 'fs'
import * as path from 'path'

import { compileCSS } from './core/compiler'
import * as includer from './core/includes/primary.js'

// handle input
let inputFile = { // our input file object
    hasFlag: false, // index 2
    hasOutputFlag: false, // index 3
    filePath: '', // index 4
    outputFile: '', // index 5
}

let timer = {
    time: 0,
    active: false,
}

const handleInput = () => {
    includer.default()
    if (inputFile.filePath === '') { return }

    if (inputFile.outputFile === '') {
        // create the compiledcss folder is it doesn't already exist
        if (!fs.existsSync(path.join(process.cwd(), 'compiledcss'))) {
            fs.mkdirSync(path.join(process.cwd(), 'compiledcss'))
        }

        // set the output file to the compiledcss folder/input file name.css
        inputFile.outputFile = path.join(process.cwd(), 'compiledcss', path.basename(inputFile.filePath, '.css') + '.css')
    }

    // read the file
    fs.readFile(path.resolve(inputFile.filePath), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        // start timer
        timer.active = true
        setInterval(() => {
            if (timer.active) {
                timer.time++
            }
        }, 1)

        // compile the css
        compileCSS(data, (err, res) => {
            if (err) {
                console.log(err)
                return
            }
            // write the compiled css to a new file
            fs.writeFile(path.resolve(inputFile.outputFile), res, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                timer.active = false
                console.log(`Compiled CSS written to ${inputFile.outputFile}\n${timer.time}ms`)
                process.exit(0)
            })
        })
    })
}

// get input
process.argv.forEach(function (value, index, array) {
    switch (index) {
        case 2:
            if (value === "-i" || value === "--input") {
                inputFile.hasFlag = true
            } else if (value === "-h" || value === "--help") {
                console.log(`
======================== HELP ========================

Usage:
    node compilecss.js [options]

    -i, --input <file>
        The input file to compile.

    -o, --output <file>
        The output file to write to.

    -h, --help 
        Print this help message.

Examples:
    node compilecss.js -i ./input.css -o ./output.css
    node compilecss.js -i ./input.css

======================================================
`)}
            break
        case 3:
            if (inputFile.hasFlag) {
                inputFile.filePath = value
            }

            break
        case 4:
            if (inputFile.hasFlag && value === "-o" || value === "--output") {
                inputFile.hasOutputFlag = true
            }

            break
        case 5:
            if (inputFile.hasOutputFlag) {
                inputFile.outputFile = value
            }
        default:
            break
    }
})

handleInput()

// if no input, exit
if (!inputFile.hasFlag) {
    console.error('No input file specified, please use -i <filepath>')
    process.exit(0)
}