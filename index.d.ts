import { BaseContext } from 'koa';

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
