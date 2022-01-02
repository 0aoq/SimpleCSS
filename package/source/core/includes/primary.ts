/* ===================================== PRIMARY INCLUDER =====================================
 * Includes CSS files into the includes folder.
 * Required for @includesub and @include.
 * ============================================================================================
 */

import * as fs from 'fs'
import * as path from 'path'

import * as PROPERTIES_FILE from './properties.js'

export default () => {
    // if path.resolve(__filename, "../../../includes") doesn't exist, create it
    if (!fs.existsSync(path.resolve(__filename, "../../../includes"))) {
        fs.mkdirSync(path.resolve(__filename, "../../../includes"))
    }

    // write the properties file
    fs.writeFileSync(path.resolve(__filename, "../../../includes/properties.css"), PROPERTIES_FILE.default)
}