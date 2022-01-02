/* SimpleCSS Compiler
 * Version: 1.0.0
 * License: MIT
 * Description: Compiles SimpleCSS into CSS
 * 
 * =============================================================================
 * @function compileCSS
 * @param {string} input - The input file path
 * @param {callback} callback - The callback function
 * @returns {string} - The compiled CSS
 * 
 * @function RegMatch
 * @param {string} str - The line to match
 * @param {RegExp} regexp - The regexp to match
 * @param {callback} callback - The callback function
 * @returns {string} - The matched string
 * 
 * @function substituteMatch
 * @param {string} line - The line to match
 * @param {array} subs - The array of substitutions
 * @returns {array} - The array of substitutions
 * =============================================================================
 * 
 * Included in SimpleCSS version 1.0.0 (2022-01-02) and later.
 */

import * as fs from 'fs'
import * as path from 'path'

// regex
export const RegMatch = (str: string, regex: RegExp, callback: Function | null) => { // exported from BoundAuthors/BoundDevelopment
    // regex exec function
    let m
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) { regex.lastIndex++ }
        m.forEach((match, groupIndex) => {
            if (groupIndex !== 0) { // if groupIndex is not 0, then it is a match (groupIndex 0 is the entire match)
                callback(groupIndex - 1, match)
                /* execute the callback function; groupIndex is the index of the match, match is the match
                 * groupIndex is subtracted by 1 because arrays start at 0, and the first match you'll get of groupIndex is 1
                 */
            }
        })
    }
}

const regexp = {
    normal: /^\s*(?<node>.*)\s*\-\>\s*(?<styles>.*?)$/gim, // node -> styles
    class: /^\s*(?<node>.*)\s*\.\s*(?<class>.*)\s*\-\>\s*(?<styles>.*?)$/gim, // node.class -> styles
    id: /^\s*(?<node>.*)\s*\#\s*(?<id>.*)\s*\-\>\s*(?<styles>.*?)$/gim, // node#id -> styles
    style: /^(?<style>.*?):\s*(?<value>.*)$/gim, // style: value
    subsitute: /^\@sub\s*(?<substitute>.*?)\s*\-\>\s*(?<style>.*)$/gim, // @sub style -> substitute
    includesub: /^\@includesub\s*(?<filepath>.*)$/gim, // @includesub filepath
}

// substitute match
const substituteMatch = (line, subs) => {
    // substitute
    (() => {
        // tests for substitute and returns if it finds one

        const _sub = {
            style: '',
            substitute: '',
        }

        RegMatch(line, regexp.subsitute, (groupIndex, match) => {
            switch (groupIndex) {
                case 0:
                    // style
                    _sub.substitute = match
                    break
                case 1:
                    // substitute
                    _sub.style = match
                    break
                default:
                    break
            }
        })

        if (_sub.style && _sub.substitute) {
            subs.push({ origin: _sub.style.replaceAll(/;/g, ""), substitute: _sub.substitute.replaceAll(/;/g, "") })
            return
        }
    })()

    return subs
}

// export
export const compileCSS = (input: string, callback: (err: Error, res: string) => void) => {
    // create variables
    const lines = input.split('\n')
    const states = [
        "hover",
        "focus",
        "active",
        "visited",
        "disabled",
    ]

    let output = '/* https://github.com/0aoq/SimpleCSS - Compiled at: ' + new Date().toLocaleString() + ' */\n'
    let stateOutput = '\n/* =========================== STATES =========================== */\n'

    let subs = []

    // function to compile a line
    const compileLine = async (fullTag: string, styles: string[]) => {
        let _return = ''
        setTimeout(() => {
            fullTag = fullTag.replaceAll(" ", "")

            let newStyles = []

            // loop through styles and use RegMatch to find matches for regexp.style, then add them to newStyles as { selector: case 0, value: case 1 }
            styles.forEach((style) => {
                const _state = {
                    selector: "",
                    tag: "",
                    value: "",
                }

                RegMatch(style, regexp.style, (groupIndex, match) => {
                    switch (groupIndex) {
                        case 0:
                            match.replaceAll(/,/g, "")

                            // finish match
                            let _match = match

                            // if the match is on the subs list, then replace the match with the substitute
                            for (let state of states) {
                                for (let i of subs) {
                                    if (i.substitute === match.replaceAll(`.${state}`, "")) {
                                        _match = i.origin
                                        break
                                    }
                                }
                            }

                            // add state styles
                            let hasState = false
                            for (let state of states) {
                                if (match.includes("." + state)) {
                                    _state.selector = fullTag + ":" + state
                                    _state.tag = _match.replace("." + state, "")
                                    hasState = true
                                }
                            }

                            if (!hasState) {
                                // push to newStyles
                                newStyles.push({ selector: _match, value: '' })
                            }

                            break
                        case 1:
                            if (_state.tag !== "") {
                                _state.value = match
                            } else {
                                newStyles[newStyles.length - 1].value = match
                            }

                            break
                        default:
                            break
                    }
                })

                if (_state.selector !== "") {
                    stateOutput += `\n${_state.selector} {\n    ${_state.tag}:${_state.value}\n}\n`
                }
            })

            // remove ;\n from the end of the value
            for (let i in newStyles) {
                newStyles[i].value = newStyles[i].value.replaceAll(/;\n/g, '')
            }

            // turn newStyles into an array of strings
            let newStylesStr = ''
            newStyles.forEach((style) => {
                // if style.value[0] if a space, remove it
                if (style.value[0] === ' ') {
                    style.value = style.value.substring(1)
                }

                // if the style index is not the last, add \n, otherwise don't
                if (newStyles.indexOf(style) !== newStyles.length - 1) {
                    newStylesStr += `   ${style.selector}: ${style.value};\n`
                } else {
                    newStylesStr += `   ${style.selector}: ${style.value};`
                }
            })

            // add to output
            _return = `\n${fullTag} {\n${newStylesStr}\n}\n`
        }, 5);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(_return)
            }, 6);
        })
    }

    // loop through lines
    lines.forEach((line) => {
        if (!line.startsWith('//')) {
            // class
            (async () => {
                // tests for class and compiles if it finds one

                const _class = {
                    node: '',
                    class: '',
                    styles: [],
                }

                RegMatch(line, regexp.class, (groupIndex, match) => {
                    switch (groupIndex) {
                        case 0:
                            // node
                            _class.node = match
                            break
                        case 1:
                            // class
                            _class.class = match
                            break
                        case 2:
                            // styles
                            _class.styles = match.split(/\s*,\s*/gim) // split on commas
                            break
                        default:
                            break
                    }
                })

                if (_class.node && _class.class && _class.styles.length > 0) {
                    compileLine(`${_class.node}.${_class.class}`, _class.styles)
                        .then((res) => {
                            output += res
                        })
                }
            })();

            // id
            (async () => {
                // tests for id and compiles if it finds one

                const id = {
                    node: '',
                    id: '',
                    styles: [],
                }

                RegMatch(line, regexp.id, (groupIndex, match) => {
                    switch (groupIndex) {
                        case 0:
                            // node
                            id.node = match
                            break
                        case 1:
                            // class
                            id.id = match
                            break
                        case 2:
                            // styles
                            id.styles = match.split(/\s*,\s*/gim) // split on commas
                            break
                        default:
                            break
                    }
                })

                if (id.node && id.id && id.styles.length > 0) {
                    compileLine(`${id.node}#${id.id}`, id.styles)
                        .then((res) => {
                            output += res
                        })
                }
            })();

            // normal
            (async () => {
                // tests for normal and compiles if it finds one

                const normal = {
                    node: '',
                    styles: [],
                }

                RegMatch(line, regexp.normal, (groupIndex, match) => {
                    switch (groupIndex) {
                        case 0:
                            // node
                            normal.node = match
                            break
                        case 1:
                            // styles
                            normal.styles = match.split(/\s*,\s*/gim) // split on commas
                            break
                        default:
                            break
                    }
                })

                if (normal.node && normal.styles.length > 0) {
                    compileLine(normal.node, normal.styles)
                        .then((res) => {
                            output += res
                        })
                }
            })();

            // substitute
            subs = substituteMatch(line, subs);

            // includesub
            (() => {
                // includes subsitutions from a file

                const _includesub = {
                    file: '',
                }

                RegMatch(line, regexp.includesub, (groupIndex, match) => {
                    switch (groupIndex) {
                        case 0:
                            // file
                            _includesub.file = match.replaceAll(/\;/g, '')
                            break
                        default:
                            break
                    }
                })

                if (_includesub.file === "properties") {
                    _includesub.file = path.resolve(__filename, "../../includes/properties.css")
                }

                if (_includesub.file) {
                    return fs.readFile(path.resolve(_includesub.file), 'utf8', (err, data) => {
                        if (err) {
                            return callback(err, '')
                        }

                        data.split("\n").forEach((line) => {
                            if (!line.startsWith('//')) {
                                subs = substituteMatch(line, subs)
                            }
                        })

                        return
                    })
                }
            })()
        }
    })

    // return output
    setTimeout(() => {
        output += stateOutput
        return callback(null, output)
    }, 8);
}

export default {
    compileCSS,
    RegMatch
}