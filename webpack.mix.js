const mix = require('laravel-mix');
require('laravel-mix-handlebars');
require('laravel-mix-purgecss');

mix
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/home-page.js', 'public/js')
    .sass("resources/css/app.scss", "public/css")
    .version()
    .options({
        postCss: [
            require("postcss-sorting")
        ],
    })
    .purgeCss({
        safelist: {
            standard: ['active', 'deactivated', 'selected', /^splide*/, 'is-active', /splide*/, 'is-visible', 'fixed', 'invalid', 'form-result-error', 'form-result-success']
        }
    })


