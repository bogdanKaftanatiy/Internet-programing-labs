var $search = $('#search');
var $frame = $('#frame-content');
var $google = $('#google');
var $caption = $('#caption');

function updateMeasures() {
    var a = Number($('#a').val());
    var b = Number($('#b').val());
    var c = Number($('#c').val());
    var d = 0;

    var r = a / (a + c);
    var p = a / (a + b);
    var acc = (a + d) / (a + b + c + d);
    var error = (b + c) / (a + b + c + d);
    var f = 2 / (1/p + 1/r);
    var avg = (r + p) / 2;

    $('#recall').html(r.toFixed(2));
    $('#precision').html(p.toFixed(2));
    $('#accuracy').html(acc.toFixed(2));
    $('#error').html(error.toFixed(2));
    $('#f-measure').html(f.toFixed(2));
    $('#avg-precision').html(avg.toFixed(2));
}
function searchGoogle(e) {  
    var q = $search.val();
    var url = 'http://google.com/search?q=';
    url += encodeURIComponent(q);    
    $google.attr('src', url);
    $caption.text("Google.com")
}

function searchYahoo(e) {
    searchGoogle();

    var q = $search.val()
    var url = 'https://search.yahoo.com/yhs/search?p=';
    url += encodeURIComponent(q);    
    $frame.attr('src', url);
    $caption.text("Yahoo.com")
}

function searchYandex(e) {
    searchGoogle();

    var q = $search.val()
    var url = 'https://yandex.ua/search/?text=';
    url += encodeURIComponent(q);    
    $frame.attr('src', url);
    $caption.text("Yandex.ua")
}

function searchDuckDuckGo(e) {
    searchGoogle();

    var q = $search.val()
    var url = 'https://duckduckgo.com/?q=';
    url += encodeURIComponent(q);    
    $frame.attr('src', url);
    $caption.text("DuckDuckGo.com")
}

function searchMeta() {
    searchGoogle();

    var q = $search.val()
    var url = 'http://search.meta.ua/search.asp?q=';
    url += encodeURIComponent(q);    
    $frame.attr('src', url);
    $caption.text("Meta.ua")
}

$(function() {
   $('#searchGoogle').click(searchGoogle); 
   ['searchGoogle', 'searchYahoo', 'searchMeta', 'searchYandex', 'searchDuckDuckGo']
   .forEach(function(el) {
       $('#' + el).click(window[el]);
   });

   ['a', 'b', 'c'].forEach(function(el) {
       console.log($('#' + el));
       $('#' + el).keypress(updateMeasures);
   });
});