# SimpleCSS 🍊

A fast, simple, and powerful CSS compiler to generate CSS from very simple, single line CSS rules.

## Usage

After installing the package, you can just use node.js to compile CSS.

```powershell
node simplecss.js -i <input_file> -o <output_file>
```

To display the help page, use `node simplecss.js -h`.

## Syntax

The syntax is very simple. Just write normal CSS rules in the input file, and then compile.

```css
div.h1 -> color: black
```

Rules can be separated by commas.

```css
div#h1 -> color: black, font-size: 20px
```

You can also define "substitutions" for the property names.

```css
@sub clr -> color

div.h1 -> clr: black
div.h2 -> clr: red
```

```css
/* (compiled) */

div.h1 {
    color: black;
}

div.h2 {
    color: red;
}
```

By using the `@includesub` directive, you can include a file with substitutions.

```css
@includesub ./substitutions.css

div.h1 -> custom-sub: 0
```

The default substitution file can be imported with the `@includesub` directive with the name properties.

```css
@includesub properties

div.h1 -> ml: 20px, mr: 20px
```

It includes substitutions based on abbreviated versions of the default properties names, so something like `margin-left` will be replaced with `ml`.