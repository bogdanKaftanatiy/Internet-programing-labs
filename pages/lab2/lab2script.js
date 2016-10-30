function Twitt(id, author, text, likesCount, date, url) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.likesCount = likesCount;
    this.date = date;
    this.url = url;
}

var searchArray = [
    new Twitt(1, "Den", "text from twitt 1", 28, new Date(), "example.com/twitt1"),
    new Twitt(2, "Den", "another text from second twitt", 9, new Date(), "example.com/twitt2"),
    new Twitt(3, "Den", "some text", 5, new Date(), "example.com/twitt3"),
    new Twitt(4, "Den", "some test text", 1, new Date(), "example.com/twitt4"),
    new Twitt(5, "Den", "some text", 51, new Date(), "example.com/twitt5"),
    new Twitt(6, "Den", "some text", 19, new Date(), "example.com/twitt6"),
    new Twitt(7, "Den", "some text", 7, new Date(), "example.com/twitt7"),
    new Twitt(8, "Den", "some test search data", 117, new Date(), "example.com/twitt8"),
    new Twitt(9, "Den", "some text", 12, new Date(), "example.com/twitt9"),
    new Twitt(10, "Den", "some text", 53, new Date(), "example.com/twitt10"),
];

function displayToResultTable(array) {
    var table = document.getElementById('displayTable');

    var elementsArray = table.children;
    for(var i = elementsArray.length - 1; i >= 1; i--) {
        table.removeChild(elementsArray[i]);
    }

    var fragment = document.createDocumentFragment();
    for(var i = 0; i < array.length; i++) {
        var tr = document.createElement('tr');
        var id = document.createElement('td');
        id.innerHTML = array[i].id;
        tr.appendChild(id);
        var author = document.createElement('td');
        author.innerHTML = array[i].author;
        tr.appendChild(author);
        var text = document.createElement('td');
        text.innerHTML = array[i].text;
        tr.appendChild(text);
        var likesCount = document.createElement('td');
        likesCount.innerHTML = array[i].likesCount;
        tr.appendChild(likesCount);
        var date = document.createElement('td');
        date.innerHTML = array[i].date;
        tr.appendChild(date);
        var url = document.createElement('td');
        url.innerHTML = array[i].url;
        tr.appendChild(url);
        fragment.appendChild(tr);
    }

    table.appendChild(fragment);
}

function formHandler(event) {
    var searchString = this.elements.search.value;
    var resultArray = [];

    for(var i = 0; i < searchArray.length; i++) {
        if(searchArray[i].text.indexOf(searchString) != -1) {
            resultArray.push(searchArray[i]);
        }
    }

    displayToResultTable(resultArray);
    event.preventDefault();
}

var searchForm = document.forms.search_form;
searchForm.addEventListener('submit', formHandler);

displayToResultTable(searchArray);