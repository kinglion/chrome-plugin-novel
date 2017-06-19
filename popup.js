var host = 'http://127.0.0.1:7001';
var popInit = true;

function request(url, callback, errorCallback) {
  if (localStorage.getItem(url)) {
    callback(localStorage.getItem(url));
  } else {
    var x = new XMLHttpRequest();

    x.open('GET', url);

    x.onload = function() {
      var response = x.response;

      localStorage.setItem(url, response);
      callback(response);
    };
    x.onerror = function() {
      errorCallback && errorCallback('Network error.');
    };
    x.send();
  }
}

// 获取目录
function getCategory() {
  var categoryApi = host +'/2/2007/';
  request(categoryApi, function(resp) {
    var $list = selectorCategory(resp);
    var list = [];
    
    $list.each(function(index, item) {
      list.push(categoryApi + formatUrl(item.href));
    });
    localStorage.setItem('category', list)
  });
}

function formatUrl(url){
  return url.replace(/[^0-9]/g, '') + '.html';
}


function selectorCategory(resp){
  var el = $( '<div></div>' );

  el.html(resp);

  return $('#list a', el);
}

function selectorContent(resp){
  var el = $( '<div></div>' );

  el.html(resp);

  return $('#content', el).html();
}

function selectorTitle(resp){
  var el = $( '<div></div>' );

  el.html(resp);

  return $('.bookname h1', el).html();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function initRead() {
  if(!localStorage.getItem('current')){
    localStorage.setItem('current', 0);
  }
}

function initEvent() {
  var prev = document.querySelectorAll('.prev'),
      next = document.querySelectorAll('.next');

  Array.prototype.forEach.call(prev, function(element) {
    element.addEventListener('click', prevLevel);
  });
  Array.prototype.forEach.call(next, function(element) {
    element.addEventListener('click', nextLevel);
  });

  // 记录滚动
  setTimeout(function () {
    $(window).scroll(function() {
        localStorage.setItem('position', document.body.scrollTop);
    });
  }, 2000);
}

function prevLevel() {
  var current = parseInt(localStorage.getItem('current'));

  if (current == 0) return;
  localStorage.setItem('current', current - 1);
  update();
}

function nextLevel() {
  var current = parseInt(localStorage.getItem('current'));
  var categorys = localStorage.getItem('category').split(',');

  if (current == categorys.length - 1) return;

  localStorage.setItem('current', current + 1);
  update();
}

function update() {

  var categorys = localStorage.getItem('category').split(',');
  var current = parseInt(localStorage.getItem('current'));

  request(categorys[current], function(resp) {
    $('#content').html(selectorContent(resp));
    $('#title').html(selectorTitle(resp));
    if (popInit) {
      setTimeout(function() {
        window.scrollTo(0, localStorage.getItem('position'));
      }, 1000);
    }
    else window.scrollTo(0, 0);
    popInit = false;
  })
}

document.addEventListener('DOMContentLoaded', function() {
  // 设置当前阅读的顺序
  initRead();

  // 侦听事件
  initEvent();

  if(!localStorage.getItem('category')){
    getCategory()
  } else {
    update();
  }
});


