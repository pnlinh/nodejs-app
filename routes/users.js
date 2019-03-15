const express = require('express');
let router = express.Router();

router.get('/bmi', async (req, res) => {
    let {name = '', weight = 0, height = 0} = req.query;

    try {
        weight = parseFloat(weight);
        height = parseFloat(height);

        if (isNaN(weight) || isNaN(height)) {
            return res.json({
                status: 'fail',
                msg: 'You must enter weight and height !'
            });
        }

        if (name === '') {
            return res.json({
                status: 'fail',
                msg: 'You must enter name of user !'
            });
        }

        let bmi = Math.round(weight / (height * height), 2);
        let message = '';
        if (bmi < 15) {
            message = 'Qua gay';
        } else if (bmi >= 15 && bmi <= 18.5) {
            message = 'Hoi gay';
        } else if (bmi >= 18.5 && bmi < 25) {
            message = 'Binh thuong';
        } else if (bmi >= 25 && bmi < 30) {
            message = 'Hoi map';
        } else if (bmi >= 30 && bmi < 40) {
            message = 'Map';
        } else {
            message = 'Beo phi';
        }

        return res.json({
            'status': 'OK',
            'data': bmi,
            'msg': `Your BMI of name: ${name} is ${bmi} => ${message}`
        });
    } catch (e) {
        res.send(`Error: ${e}`);
    }
});

module.exports = router;