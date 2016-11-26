/**
 * Created by qudrat on 05/10/16.
 */
'use-strict';

var users = [
    {
        "id": 1,
        "name": "Eshmat",
        "age": 25
    },
    {
        "id": 2,
        "name": "Toshmat",
        "age": 27
    },
    {
        "id": 3,
        "name": "Hasan",
        "age": 29
    }
];

module.exports = {

    // <editor-fold desc="GET all users">
    getAll: function (req, res) {
        console.log("Current worker PID: %d", process.pid);
        res.json(users);
        res.end();
    }
    // </editor-fold>
};