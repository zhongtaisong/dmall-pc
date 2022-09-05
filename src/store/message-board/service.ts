import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询用户留言
 * @returns 
 */
export const messageBoardSelectService = (): Promise<IResponse> => {
    return axios.get("/message-board/public/select");
};

/**
 * 发表留言
 * @returns 
 */
export const messageBoardAddService = (params): Promise<IResponse> => {
    return axios.post("/message-board/add", params);
};
