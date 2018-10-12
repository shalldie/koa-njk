# koa-njk

[![NPM version](https://img.shields.io/npm/v/koa-njk.svg)](https://www.npmjs.com/package/koa-njk)

A Koa middleware for Nunjucks.
Koa2 的一个 Nunjucks 的中间件。

# Installation

    npm install koa-njk

# Usage

```js
const koaNjk = require('koa-njk');

app.use(
    /**
     * nunjucks 中间件
     *
     * @param {string} path 模板根目录路径。root directory of views.
     * @param {string} [ext='.html'] 模板扩展名。extension of views'.
     * @param {any} [config={}] nunjucks 配置. Nunjucks' config.
     * @param {Function} [fn=env => {}] 对于 Environment 的自定义扩展回调。extension callback to Environment instance.
     * @returns {Function}
     */
    koaNjk(path.join(__dirname, 'views'), '.html', {
        autoescape: true,
        ...
    }, env => {
        // add filters and extensions here
    })
);

app.use(async (ctx) => {
    /**
     * Renders the template with the optional context hash.
     * 使用数据渲染模板。
     *
     * @param {string} view name of a template. 模板的名称。
     * @param {any} [context] data in tpl. 模板使用的数据。
     */
    await ctx.render('index', {title: 'koa-njk'});
});
```

# Nunjucks' config

http://mozilla.github.io/nunjucks/api.html#configure
