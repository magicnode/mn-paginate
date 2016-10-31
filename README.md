# mn-paginate
for common paginate use at back-end

根据page，rows对数据进行分页处理,简化除分页外的逻辑处理

安装
```

npm i mn-paginate

or

yarn add mn-paginate

```
使用

```

const Paginate = require ('mn-paginate');

Paginate.getPaginate(option, arr, function (rs) {
  res.render('table', {
      arr: data.result,
      isFirstPage: data.isFirstPage,
      isLastPage: data.isLastPage,
      total: data.paginateCount,
      page: data.currentPage,
      totaldata: data.total,
      rows: data.rows
  });
})

```



