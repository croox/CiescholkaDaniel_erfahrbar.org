# CiescholkaDaniel_erfahrbar.org

## Layout
https://www.figma.com/file/DABZmJuzP6GKrJszTLqIRSx8/00_00_erFahrbar-Home?node-id=1%3A2

## Farben
linear gradient:
- grün hell #93D981
- grün dunkel #6EB45C

## Typo
- h1 .. montserrat light https://fonts.google.com/specimen/Montserrat
- p open sans https://fonts.google.com/specimen/Open+Sans

## Bilder
liegen hier unter assets

## Development

```
# list gulp tasks
gulp --tasks

# Start localhost server with browser-sync, watches HTML, Sass, JS with hot reloading
gulp

# Start localhost server and serve from dist directory without build
gulp _serve

# minify CSS/JS and builds into the dist directory, ready for production
gulp --prod

# convert all png within a directory to webp
for i in ./src/img/*.png; do cwebp $i -o ${i/png/webp}; done
```

### FAQ

#### Incorrect External Browsersync url

Read the [docs](https://www.browsersync.io/docs#external-url)
and uncomment and set the `host` option in `server.init` in `gulpfile.babel.js`.

## Requirements

- `gulp-cli` globally installed
- `sass` **and `compass`**
- `cwebp` to convert images to webp

## Credits

Based on [MattKohnen/bootstrap-4-gulp-4-sass](https://github.com/MattKohnen/bootstrap-4-gulp-4-sass) commit [426b4d0](https://github.com/MattKohnen/bootstrap-4-gulp-4-sass/commit/426b4d0979070de8c7e3c32d9f732034d1f5e49c).
A fork of [wapbamboogie/bootstrap-4-boilerplate](https://github.com/wapbamboogie/bootstrap-4-boilerplate) with added gulp 4 support and written in ES6.

