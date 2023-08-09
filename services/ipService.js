const ip = require('ip')

module.exports = {
    ipAddress: async () => {
        const empIp = await ip.address()
        return empIp;
    }
}