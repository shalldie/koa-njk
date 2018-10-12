const nunjucks = require('nunjucks');

/**
 * nunjucks 中间件
 *
 * @param {string} path 模板根目录路径
 * @param {string} [ext='.html'] 模板扩展名
 * @param {any} [config={}] nunjucks 配置
 * @param {Function} [fn=env => {}] 对于 Environment 的自定义扩展回调
 * @returns {Function}
 */
module.exports = (path, ext = '.html', config = {}, fn = env => {}) => {
    const env = nunjucks.configure(path, config);
    fn(env);
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
