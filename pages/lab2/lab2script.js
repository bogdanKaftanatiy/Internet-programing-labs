function Twitt(id, author, text, likesCount, date, url) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.likesCount = likesCount;
    this.data = date;
    this.url = url;
}

var searchArray = [
    new Twitt(1, "Den", "some text", 5, new Date(), "example.com")
];