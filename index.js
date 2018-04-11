const nunjucks = require('nunjucks');

/**
 * nunjucks 中间件
 * 
 * @param {any} path 模板根目录路径
 * @param {string} [ext='.html'] 模板扩展名
 * @param {any} [config={}] nunjucks 配置
 * @returns {Function}
 */
module.exports = (path, ext = '.html', config = {}) => {
    const env = nunjucks.configure(path, config);
    return async (ctx, next) => {
        ctx.render = async (view, context) => {
            const data = Object.assign({}, ctx.state, context);
            return new Promise((resolve, reject) => {
                env.render(view + ext, data, (err, content) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    ctx.type = 'text/html';
                    ctx.body = content;
                    resolve(content);
                });
            });
        };
        await next();
    };
};
