/*
 * Author: Magic·Zhang <magic@foowala.com>
 * Module description: 根据page，rows对数据进行分页处理,简化除分页外的逻辑处理
 */

var paginate = {
    isArrayfunc: function (o) {
        if(typeof Array.isArray === 'function'){
            return Array.isArray(o);
        }else{
            return Object.prototype.toString.call(o) === '[object Array]';
        }
    },
    getPaginate: function(option, arr, callback) {
        var page = option.page ? option.page : 1;
        var rows = option.rows ? option.rows : 10;
        var pageArr = [];

        if ( !this.isArrayfunc(arr) && page < 1 && rows < 0) {
            return callback(null);
        }

        var count = arr.length ? arr.length : 0;

        var lastpage = Math.ceil(count / rows);

        if (page >= lastpage && lastpage !== 0) {
            page = lastpage;
        }

        var begin = (page - 1) * rows ? (page - 1)*rows : 0;
        var end = page * rows;
        if ((page * rows) >= count) {
            end = count
        }

        pageArr = arr.slice(begin, end) ? arr.slice(begin, end) : [];

        console.log(pageArr);

        var data = {};


        data.result = pageArr;
        data.isFirstPage = page === 1;
        data.isLastPage = (begin + pageArr.length) === count;
        data.paginateCount = count / rows;
        data.currentPage = page;
        data.total = count;
        data.rows = rows;

        return callback(data);
    },
    renderResult: function (data, callback) {

    },
}


module.exports = paginate;
