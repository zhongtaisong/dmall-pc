import axios from '@axios';
import { IResponse } from '@types';
// 商品筛选条件
const filterUrl = '/public/select/filter';

class Service {

    /**
     * 查询 - 商品列表
     * @param params 
     * @returns 
     */
    selectGoodsList = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("/goods-list/public/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 查询 - 商品过滤条件
     * @param params 
     * @returns 
     */
    selectGoodsListfilterParams = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("/goods-list/public/select/filter").then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();