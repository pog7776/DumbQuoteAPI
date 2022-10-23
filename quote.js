import fetch from 'node-fetch';
import express from 'express';
//const express = require('express');
const app = express();
// const path = require('path');

app.get('/api/quote', async (req, res) => {
    console.log('GET /api/quote');

    var quote1;
    await getQuoteAsync().then((data) => quote1 = data);
    console.log(quote1.content, true + " - " + quote1.author);

    var quote2;
    await getQuoteAsync().then((data) => quote2 = data);
    console.log(quote2.content, false + " - " + quote2.author);

    var outquote = splitAtRandom(quote1.content, true) + " " + splitAtRandom(quote2.content, false) + "\n - " + quote1.author + " & " + quote2.author;
    console.log(outquote);
    res.header("Access-Control-Allow-Origin", '*'); 
    res.send(outquote);
});

app.get('/api/quote/json', async (req, res) => {
    console.log('GET /api/quote');

    var quote1;
    await getQuoteAsync().then((data) => quote1 = data);
    console.log(quote1.content, true + " - " + quote1.author);

    var quote2;
    await getQuoteAsync().then((data) => quote2 = data);
    console.log(quote2.content, false + " - " + quote2.author);

    var jsonOut = {
        "quote": splitAtRandom(quote1.content, true) + " " + splitAtRandom(quote2.content, false),
        "author1": quote1.author,
        "author2": quote2.author
    }

    console.log(jsonOut);
    res.header("Access-Control-Allow-Origin", '*'); 
    res.json(JSON.stringify(jsonOut));
});

function getQuoteAsync() {
    return fetch("https://api.quotable.io/random")
        .then((response) => response.json())
        .then((responseJson) => { return responseJson });
}

function splitAtRandom(quote, first) {
    // Split into array of words
    var words = quote.split(" ");
    
    if(first) {
        // Split somwehere between word 0 and half way through
        var max = words.length / 2;
        var min = 1;
        var index = Math.random() * (max - min) + min;
        // Join back together and return
        return words.slice(0, index).join(" ");
    } else {
        // Split somewhere between half way through and the end
        var max = words.length-1;
        var min = words.length / 2;
        var index = Math.random() * (max - min) + min;
        // Join back together and return
        return words.slice(index, words.length).join(" ");
    }
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})