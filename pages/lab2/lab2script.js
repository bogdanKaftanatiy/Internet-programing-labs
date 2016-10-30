function Twitt(id, author, text, likesCount, date, url) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.likesCount = likesCount;
    this.date = date;
    this.url = url;
}

var searchArray = [
    new Twitt(1, "Den", "text from twitt 1", 28, new Date(2015, 0, 13), "example.com/twitt1"),
    new Twitt(2, "Mike", "another text from second twitt", 9, new Date(2016, 4, 30), "example.com/twitt2"),
    new Twitt(3, "Tom", "test1", 5, new Date(2015, 2, 18), "example.com/twitt3"),
    new Twitt(4, "Braun", "some test text", 1, new Date(2014, 9, 28), "example.com/twitt4"),
    new Twitt(5, "Mike", "test2", 51, new Date(2016, 11, 23), "example.com/twitt5"),
    new Twitt(6, "Max", "some text", 19, new Date(2013, 2, 14), "example.com/twitt6"),
    new Twitt(7, "Jame", "test3", 7, new Date(2011, 8, 29), "example.com/twitt7"),
    new Twitt(8, "Loren", "some test search data", 117, new Date(2012, 6, 15), "example.com/twitt8"),
    new Twitt(9, "Roma", "some text", 12, new Date(2014, 6, 3), "example.com/twitt9"),
    new Twitt(10, "Frank", "some text", 53, new Date(2016, 4, 9), "example.com/twitt10")
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
        var dateStr = '';
        dateStr += array[i].date.getDate() + '.';
        dateStr += array[i].date.getMonth() + '.';
        dateStr += array[i].date.getFullYear();
        date.innerHTML = dateStr;
        tr.appendChild(date);
        var url = document.createElement('td');
        url.innerHTML = array[i].url;
        tr.appendChild(url);
        fragment.appendChild(tr);
    }

    table.appendChild(fragment);
}

function formHandler(event) {
    function searchByString(string) {
        string = string.trim();
        var concatHash = {
            'OR': function (arr1, arr2) {
                for(var i = 0; i < arr2.length; i++) {
                    if(arr1.indexOf(arr2[i]) == -1) {
                        arr1.push(arr2[i]);
                    }
                }

                arr1.sort(function (a, b) {
                    return a - b;
                });
                return arr1;
          },
            'AND': function (arr1, arr2) {
                var result = [];
                for(var i = 0; i < arr2.length; i++) {
                    if(arr1.indexOf(arr2[i]) != -1) {
                        result.push(arr2[i]);
                    }
                }
                result.sort(function (a, b) {
                    return a - b;
                });
                return result;
            }
        };
        var searchHash = {
            'id' : function (conditionStr) {
                conditionStr = conditionStr.trim();
                var result = [];
                for(var i = 0; i < searchArray.length; i++) {
                    if(searchArray[i].id == +conditionStr) {
                        result.push(searchArray[i]);
                    }
                }
                return result;
            },
            'author' : function (conditionStr) {
                conditionStr = conditionStr.trim();
                // alert('***' + conditionStr + '***');
                var result = [];
                for(var i = 0; i < searchArray.length; i++) {
                    if(searchArray[i].author == conditionStr) {
                        result.push(searchArray[i]);
                    }
                }
                return result;
            },
            'text' : function (conditionStr) {
                conditionStr = conditionStr.trim();
                // alert('***' + conditionStr + '***');
                var result = [];
                for(var i = 0; i < searchArray.length; i++) {
                    if(searchArray[i].text.indexOf(conditionStr) != -1) {
                        result.push(searchArray[i]);
                    }
                }
                return result;
            },
            'like' : function (conditionStr) {
                conditionStr = conditionStr.trim();
                var result = [];
                for(var i = 0; i < searchArray.length; i++) {
                    if(searchArray[i].likesCount == +conditionStr) {
                        result.push(searchArray[i]);
                    }
                }
                return result;
            },
            'date' : function (conditionStr) {
                function equalsDate(date1, date2) {
                    if(date1.getFullYear() != date2.getFullYear())
                        return false;
                    if(date1.getMonth() != date2.getMonth())
                        return false;
                    if(date1.getDate() != date2.getDate())
                        return false;
                    return true;
                }
                conditionStr = conditionStr.trim();
                var dateArr = conditionStr.split('.');
                if(dateArr.length != 3)
                    return [];
                var result = [];
                var conditionDate = new Date(+dateArr[2], +dateArr[1], +dateArr[0]);
                // alert(conditionDate);
                for(var i = 0; i < searchArray.length; i++) {
                    if(equalsDate(searchArray[i].date, conditionDate)) {
                        result.push(searchArray[i]);
                    }
                }
                return result;
            },
            'url' : function (conditionStr) {
                conditionStr = conditionStr.trim();
                // alert('***' + conditionStr + '***');
                var result = [];
                for(var i = 0; i < searchArray.length; i++) {
                    if(searchArray[i].url.indexOf(conditionStr) != -1) {
                        result.push(searchArray[i]);
                    }
                }
                return result;
            }
        };
        var resultArray = [];
        var condition = string;
        var rightCondition = '';
        var operation = '';

        if(string == '') {
            return searchArray;
        }

        if(string.indexOf('&AND&') != -1) {
            operation = 'AND';
            condition = string.split('&AND&')[0].trim();
            rightCondition = string.substring(string.indexOf('&AND&') + 5).trim();
            // alert('AND\nString: ' + string + '\nLeft: ' + condition + '\nRight: ' + rightCondition);
        } else if (string.indexOf('|OR|') != -1) {
            operation = 'OR';
            condition = string.split('|OR|')[0].trim();
            rightCondition = string.substring(string.indexOf('|OR|') + 4).trim();
            // alert('OR\nString: ' + string + '\nLeft: ' + condition + '\nRight: ' + rightCondition);
        }

        if(condition.indexOf('id:') != -1) {
            // alert(condition.substring(3));
            resultArray = searchHash.id(condition.substring(3));
        } else if (condition.indexOf('author:') != -1) {
            resultArray = searchHash.author(condition.substring(7));
        } else if (condition.indexOf('text:') != -1) {
            resultArray = searchHash.text(condition.substring(5));
        } else if (condition.indexOf('like:') != -1) {
            resultArray = searchHash.like(condition.substring(5));
        } else if (condition.indexOf('date:') != -1) {
            resultArray = searchHash.date(condition.substring(5));
        } else if (condition.indexOf('url:') != -1) {
            resultArray = searchHash.url(condition.substring(4));
        }

        if(rightCondition != '') {
            resultArray = concatHash[operation](resultArray, searchByString(rightCondition));
        }

        return resultArray;
    }

    displayToResultTable(searchByString(this.elements.search.value));
    event.preventDefault();
}

var searchForm = document.forms.search_form;
searchForm.addEventListener('submit', formHandler);

var help = document.querySelector('.help');
help.addEventListener('click', function (event) {
    document.querySelector('.paranga').classList.remove('closedHelp');
});

var closeHelp = document.querySelector('.closeHelp');
closeHelp.addEventListener('click', function (event) {
    document.querySelector('.paranga').classList.add('closedHelp');
});

displayToResultTable(searchArray);