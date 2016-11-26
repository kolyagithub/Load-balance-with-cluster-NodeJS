/**
 * Created by qudrat on 05/10/16.
 */
'use-strict';

module.exports = {

    // <editor-fold desc="GET all users">
    getOther: function (req, res) {
        console.log("Current worker PID: %d", process.pid);
        res.send("Hello World!");
        res.end();
    }
    // </editor-fold>
};