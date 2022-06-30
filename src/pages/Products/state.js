import { observable, action, toJS } from 'mobx';
// 接口服务
import service from './service';

// 一页展示多少条数据
const SIZE = 10;

class State {

    // 关键字
    @observable kw = '';
    @action setKw = (data = '') => {
        this.kw = data;
    }

    // 当前页
    @observable current = 1;
    @action setCurrent = (data = 1) => {
        this.current = data;
    }

    // 一页多少条数据
    @observable pageSize = SIZE;
    @action setPageSize = (data = SIZE) => {
        this.pageSize = data;
    }

    // 数据总数
    @observable total = SIZE;
    @action setTotal = (data = SIZE) => {
        this.total = data;
    }

    // 产品列表
    @observable productList = [];
    @action setProductList = (data = []) => {
        this.productList = data;
    }

    // 商品筛选所有条件
    @observable filterList = [];
    @action setFilterList = (data = []) => {
        this.filterList = data;
    }

    // 查询全部商品 - 发起请求
    productsData = async (obj = {}) => {
        const res = await service.productsData({
            current: this.current,
            pageSize: this.pageSize,
            onLine: 100,
            filterList: obj
        });
        try{
            if( res.data.code === 200 ){
                let { products, current, pageSize, total } = res.data.data;
                products.map((item, index) => {
                    return item['key'] = index + 1;
                });
                this.setProductList( products );
                this.setCurrent( current );
                this.setPageSize( pageSize );
                this.setTotal( total );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 商品筛选条件
    filterData = async () => {
        const res = await service.filterData();
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setFilterList(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setKw();
        this.setCurrent();
        this.setPageSize();
        this.setTotal();
        this.setProductList();
        this.setFilterList();
    }
}

export default new State();