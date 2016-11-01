(function(){
    'use strict';
    /*===========================
    Tableajax
    ===========================*/

    var Tableajax = function(event, params) {
        if (!(this instanceof Tableajax)) {
            return new Tableajax(event, params) };

        var defaults = {
            rows: '',
            keyword: '',
            page: '',
            paginate: '',
            paginatetype: 'button',
            table: '#table',
            url: '/categorys',
            ajaxtype: 'put'
        }

        var initialVirtualTranslate = params && params.virtualTranslate;

        params = params || {};
        var originalParams = {};

        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            } else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            } else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }

        var t = this;
        t.params = params;
        var rows = t.params.rows,
            keyword = t.params.keyword,
            currentPage = t.params.page,
            paginate = t.params.paginate,
            paginatetype = t.params.paginatetype,
            table = t.params.table;
        var $search = $(keyword),
            $rows = $(rows),
            url = t.params.url,
            ajaxtype = t.params.ajaxtype;

        /*
         *get fluid data,cause ajax,
         *dom is fluid,
         *the object we get mast be change
         */
        //package jq ajax func
        t.ajaxmore = function(rows, page, keyword) {
          $.ajax({
              url: url,
              type: ajaxtype,
              timeout:5000,
              data: {
                  'rows': rows,
                  'page': page,
                  'keyword': keyword
              },
              success: function(data) {
                  t.changeDOM(data);
              }
          })
        }
        //get fluid data
        t.getData = function() {
            var $rows = $(rows).children('option:selected'),
                $keyword = $(keyword),
                $page = $(currentPage),
                $paginate = $(paginate).find(paginatetype);

            var initJson = {
                rows: parseInt($rows.val()),
                keyword: $keyword.val().trim(),
                page: parseInt($page.val()) ? parseInt($page.val()) : 1,
                paginate: $paginate
            }
            return initJson;
        }
        //change rows func
        t.changeRows = function() {
          $rows.change(function() {
            var fluid = t.getData();
            t.ajaxmore(fluid.rows, fluid.page, fluid.keyword);
          })
        }
        //bind func on each paginate element
        t.paginate = function (val) {
            var pageval = val;
            if (val !== -1 && val !== null) {
                // var initJson = init(rows, keyword, page, paginateBtn);
                var fluid = t.getData();
                t.ajaxmore(fluid.rows, pageval, fluid.keyword)
            }
        }
        //paginate click event change
        t.eachpage = function() {
            var $paginate = $(paginate).find(paginatetype);
            $paginate.each(function() {
                var val = parseInt($(this).val());
                $(this).on('click', function() {
                    t.paginate(val);
                })
            })
        }
        //when ajax success,dom changed
        t.changeDOM = function (data) {
          var $table = $(table);
          $table.empty()
                .html(data);
          // var $paginate = $('.paginate');
          t.eachpage();
        }
        //keysearch function
        t.keySearch = function(code) {
          if (code === 13) {
              var fluid = t.getData();
              t.ajaxmore(fluid.rows, fluid.page, fluid.keyword);
          }
        }

        //
        if (event.trim() === 'ajax') {
            t.eachpage();
            t.changeRows();
            console.log('t is on')
            $search.keydown(function(event){
              var code = event.keyCode;
              t.keySearch(code);
            })
        }else{
          t.eachpage();
          t.changeRows();
          $search.keydown(function(event){
            var code = event.keyCode;
            t.keySearch(code);
          });
        }

        //return Tableajax instance
        console.log('tableajax is ready!')
        return t;
    };

    /*==================================================
        Prototype
    ====================================================*/
    Tableajax.prototype = {

    };

    window.Tableajax = Tableajax;
})();

/*===========================
Tableajax AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Tableajax;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Tableajax;
    });
}