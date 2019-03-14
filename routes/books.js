const express = require('express');
let router = express.Router();

router.get('/',  async (req, res) => {
    let books = [
        {
            id: 1,
            name: 'abc',
            author: 'xyz'
        },
        {
            id: 2,
            name: 'xyz',
            author: 'abc'
        }
    ];

    res.json(books);
});

module.exports = router;