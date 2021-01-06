import ImagesService from './apiService';
import refs from './refs';
// import onMoreSearch from '../index';
//=========================Pagination==============
//исходник https://codepen.io/karpovsystems/pen/fFHxK

var Pagination = {
  code: '',

  // --------------------
  // Utility
  // --------------------

  // converting initialize data
  Extend: function (data) {
    data = data || {};
    Pagination.size = data.size || 0;
    Pagination.page = data.page || 1;
    Pagination.step = data.step || 3;
  },

  // add pages by number (from [s] to [f])
  Add: function (s, f) {
    for (var i = s; i < f; i++) {
      Pagination.code += '<a>' + i + '</a>';
    }
  },

  // add last page with separator
  Last: function () {
    Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
  },

  // add first page with separator
  First: function () {
    Pagination.code += '<a>1</a><i>...</i>';
  },

  // --------------------
  // Handlers
  // --------------------

  // change page
  Click: function () {
    Pagination.page = +this.innerHTML;
    //===============мой код==========//
    ImagesService.initPage(Pagination.page);
    refs.galleryList.innerHTML = '';
    ImagesService.ScrollTo = false;
    ImagesService.fetchImages();
    //============================//
    Pagination.Start();
  },

  // previous page
  Prev: function () {
    Pagination.page--;
    if (Pagination.page < 1) {
      Pagination.page = 1;
      //   ImagesService.btnLoadMoreHide = false;
      return; //===============мой код==========//
    }
    Pagination.Start();
    //===============мой код==========//
    ImagesService.initPage(Pagination.page);
    refs.galleryList.innerHTML = '';
    ImagesService.ScrollTo = false;
    ImagesService.fetchImages();
    //=========================//
  },

  // next page
  Next: function () {
    Pagination.page++;
    if (Pagination.page > Pagination.size) {
      Pagination.page = Pagination.size;
      return; //===============мой код==========//
    }
    Pagination.Start();
    //===============мой код==========//
    ImagesService.initPage(Pagination.page);
    refs.galleryList.innerHTML = '';
    ImagesService.ScrollTo = false;
    ImagesService.fetchImages();
    //=========================//
  },

  // --------------------
  // Script
  // --------------------

  // binding pages
  Bind: function () {
    var a = Pagination.e.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
      a[i].addEventListener('click', Pagination.Click, false);
    }
  },

  // write pagination
  Finish: function () {
    Pagination.e.innerHTML = Pagination.code;
    Pagination.code = '';
    Pagination.Bind();
  },

  // find pagination type
  Start: function () {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.Add(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 4);
      Pagination.Last();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First();
      Pagination.Add(
        Pagination.size - Pagination.step * 2 - 2,
        Pagination.size + 1,
      );
    } else {
      Pagination.First();
      Pagination.Add(
        Pagination.page - Pagination.step,
        Pagination.page + Pagination.step + 1,
      );
      Pagination.Last();
    }
    Pagination.Finish();
  },

  // --------------------
  // Initialization
  // --------------------

  // binding buttons
  Buttons: function (e) {
    var nav = e.getElementsByTagName('a');
    nav[0].addEventListener('click', Pagination.Prev, false);
    nav[1].addEventListener('click', Pagination.Next, false);
  },

  // create skeleton
  Create: function (e) {
    var html = [
      '<a>&#706;</a>', // previous button
      '<span></span>', // pagination container
      '<a>&#707;</a>', // next button
    ];

    e.innerHTML = html.join('');
    Pagination.e = e.getElementsByTagName('span')[0];
    Pagination.Buttons(e);
  },

  // init
  Init: function (e, data) {
    Pagination.Extend(data);
    Pagination.Create(e);
    Pagination.Start();
  },
};

// * Initialization

// var init = function () {
//   Pagination.Init(document.getElementById('pagination'), {
//     size: 42, // pages size
//     page: 5, // selected page
//     step: 3, // pages before and after current
//   });
// };

// document.addEventListener('DOMContentLoaded', init, false);

//===============мой код==========//

function init(size, page = 1) {
  Pagination.Init(document.getElementById('pagination'), {
    size,
    page,
    step: 3,
  });
}
export default init;
