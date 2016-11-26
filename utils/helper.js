/**
 * Created by qudrat on 05/10/16.
 */

var exports = module.exports = {};

const unixCPU = require('pidusage');

// <editor-fold desc="get CPU %">
exports.getCPU_Percent = function (data, cb) {
    unixCPU.stat(data.pid, function (err, result) {
        if (err) {
            console.error('Error in getCPU_Percent', err);
            return cb(null, null);
        }
        cb(null, {"idx": data.idx, "cpu": result.cpu, "pid": data.pid});
    });
};
// </editor-fold>
