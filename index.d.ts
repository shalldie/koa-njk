import Koa, { BaseContext } from 'koa';
import { ComposedMiddleware } from 'koa-compose';
import { Environment } from 'nunjucks';

declare module 'koa' {
    interface BaseContext {
        /**
         * Renders the template with the optional context hash.
         * 使用数据渲染模板。
         *
         * @param {string} view name of a template. 模板的名称。
         * @param {any} [context] data in tpl. 模板使用的数据。
         *
         * @memberof BaseContext
         */
        render: (view: string, context?: any) => Promise<string>
    }
}

/**
 * nunjucks 中间件
 *
 * @param {string} path 模板根目录路径
 * @param {string} [ext='.html'] 模板扩展名。 default: `.html`
 * @param {any} [config={}] nunjucks 的配置。default: `{}`
 * @param {Environment:void} [fn=env => {}] 对于 Environment 的自定义扩展回调。default: `void`
 * @returns {Function}
 */
declare function koaNjk(path: string, ext?: string, config?: {}, fn?: (env: Environment) => void): ComposedMiddleware<Koa.Context>;

export = koaNjk;
