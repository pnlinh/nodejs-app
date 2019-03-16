const express = require('express');
const router = express.Router();

var taskData = require('./taskData');

router.get('/', async (req, res) => {
    return res.json({
        status: 'success',
        tasks: taskData,
        msg: `Get list of tasks successfully`
    });
});

router.get('/:id', async (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    if (isNaN(parseInt(id))) {
        return res.json({
            status: 'fail',
            msg: `You must enter task's id. Id must be a number`
        });
    }

    let foundTask = taskData.find(task => task.id === id);
    if (foundTask) {
        return res.json({
            status: 'success',
            task: foundTask,
            msg: `Get task's detail successfully`
        });
    } else {
        return res.json({
            status: 'fail',
            msg: `Task's detail does not exist`
        })
    }
});

router.post('/', async (req, res) => {
    let {title = '', completed = 0} = req.body;

    if (['0', '1'].indexOf(completed) < 0) {
        return res.json({
            status: 'fail',
            msg: `You must enter task's completed, value must be 0 or 1`
        })
    }

    let taskMaxId = taskData.sort((t1, t2) => t1.id < t2.id)[0];

    taskData.push({
        id: taskMaxId.id + 1,
        title,
        completed: (parseInt(completed) > 0)
    });

    return res.json({
        status: 'success',
        tasks: taskData,
        msg: `Insert new task successfully`
    })
});

router.put('/', async (req, res) => {
    let {id, title, completed} = req.body;
    id = parseInt(id);

    if (isNaN(parseInt(id))) {
        return res.json({
            status: 'fail',
            msg: `You must enter task's id. Id must be a number`
        });
    }

    let foundTask = taskData.find(task => task.id === id);
    if (foundTask) {
        foundTask.title = title !== null ? title : foundTask.title;

        if (['0', '1'].indexOf(completed) >= 0) {
            foundTask.completed = (parseInt(completed) > 0);
        }

        return res.json({
            status: 'success',
            task: foundTask,
            msg: `Update task's detail successfully`
        });
    } else {
        return res.json({
            status: 'fail',
            msg: `Can not find task with id ${id} to update`
        })
    }
});

router.delete('/',  (req, res) => {
    let {id} = req.body;
    id = parseInt(id);

    if (isNaN(id)) {
        return res.json({
            status: 'fail',
            msg: `You must enter task's id. Id must be a number`
        });
    }

    taskData = taskData.filter(task => task.id !== id);

    return res.json({
        status: 'success',
        tasks: taskData,
        msg: `Delete a task successfully`
    });
});

module.exports = router;