
/**
 * 地址信息
 */
export interface IAddressInfo {
    /** 地址id */
    id: number;
    /** 收货人 */
    name: string;
    /** 收货地址 */
    address: string;
    /** 联系电话 */
    phone: string;
    /** 是否为默认地址 */
    isDefault: number;
};
