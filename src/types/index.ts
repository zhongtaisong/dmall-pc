/**
 * 响应数据
 */
export interface IResponse<T = any> {
    data: {
        /**
         * 响应code
         */
        code: string;
        /**
         * 主体内容
         */
        content: T;
        /**
         * 操作提示
         */
        msg?: string;
        /**
         * 异常错误
         */
        error?: any;
    };
    [key: string]: any;
};
