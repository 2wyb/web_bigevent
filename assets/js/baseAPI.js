// 每次调用$.get/post/ajax函数前都会先调用ajaxPrefilter函数
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
})