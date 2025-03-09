const si = require('systeminformation');

exports.get_current_ip = async () => {
    var networkinterfaces = await si.networkInterfaces();

    var default_ip;
    networkinterfaces.forEach((nif) => {
        if (nif.default === true) {
            default_ip = nif.ip4;
        }
    });

    return default_ip;
};