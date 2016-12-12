$(function() {
    $('#go').click(function() {
        var ind = $('#sel').prop('selectedIndex') + 1;
        location.href = 'page' + ind + '.html';
    });
});