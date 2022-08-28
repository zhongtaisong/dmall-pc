import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 订单详情
     * @param ordernum 
     * @returns 
     */
    detailOrdersData = (ordernum: string): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`order/select/${ ordernum }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    
}

export default new Service();