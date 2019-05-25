import browserSync from 'browser-sync';
import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-csso';
import noop from 'gulp-noop';
import rename from 'gulp-rename';
import compileSass from 'gulp-sass';
import compass from 'compass-importer';
import uglify from 'gulp-uglify-es';
import {argv} from 'yargs';


/*
 * Misc
 */
const prod = Boolean(argv.prod);

const paths = {
    html: './**/*.html',

    scripts: {
        src: {
            ours: ['src/scripts/*.js'],
            vendors: [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/popper.js/dist/umd/popper.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js'
            ]
        },
        dest: 'dist/scripts/'
    },

    styles: {
        src: {
            main: ['src/styles/main.scss'],
            ours: ['src/styles/**/*.scss']
        },
        dest: 'dist/styles/'
    },


    fonts: {
        src: {
            ours: ['src/fonts/**/*']
        },
        dest: 'dist/fonts/'
    },


    images: {
        src: {
            ours: ['src/img/**/*']
        },
        dest: 'dist/img/'
    },

};


/*
 *  Build-related tasks
 */
const clean = () => del(['dist']);

const html = (done) => {
    // TODO:
    // Allow for partials?
    // Also leaving this function here for now to allow for more verbose logging
    done();
};

const scripts = () => {
    return gulp.src(paths.scripts.src.vendors.concat(paths.scripts.src.ours), {sourcemaps: true})
        .pipe(babel())
        .pipe(prod ? concat('index.min.js') : concat('index.js'))
        .pipe(prod ? uglify() : noop())
        .pipe(gulp.dest(paths.scripts.dest));
};

const styles = () => {
    return gulp.src(paths.styles.src.main, {sourcemaps: true})
        .pipe(compileSass({
			importer: compass,
            outputStyle: 'expanded'
        })
            .on('error', compileSass.logError))
        .pipe(prod ? rename('main.min.css') : rename('main.css'))
        .pipe(prod ? minifyCSS() : noop())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(prod ? noop() : stream());
};

const images = () => {
    return gulp.src(paths.images.src.ours, {sourcemaps: true})
        .pipe(gulp.dest(paths.images.dest));
};

const fonts = () => {
    return gulp.src(paths.fonts.src.ours, {sourcemaps: true})
        .pipe(gulp.dest(paths.fonts.dest));
};


/*
 * Server related
 */
const server = browserSync.create();

const reload = (done) => {
    server.reload();
    done();
};

const stream = () => server.reload({stream: true});

const serve = (done) => {
    server.init({
        // host: "192.168.42.243",
        server: {
            baseDir: './'
        }
    });
    done();
};


/*
 * Watch tasks
 */
const watchStyles = () => gulp.watch(paths.styles.src.ours, styles);
const watchScripts = () => gulp.watch(paths.scripts.src.ours, gulp.series(scripts, reload));
const watchHTML = () => gulp.watch(paths.html).on('change', gulp.series(html, reload));

/*
 * Expose tasks
 */
export const _serve = gulp.series(
	serve
);
export const dev = gulp.series(
	clean,
	styles,
	fonts,
	images,
	scripts,
	serve,
	gulp.parallel(watchStyles, watchScripts, watchHTML)
);

export const build = gulp.series(
	clean,
	styles,
	fonts,
	images,
	scripts
);

export default prod ? build : dev;


// TODO:
// 1. Add gulp-sass-lint & gulp-es-lint ?
// 2. Allow for HTML partials ?
