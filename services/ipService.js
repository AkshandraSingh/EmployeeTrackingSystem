const ip = require('ip')

module.exports = {
    addIp: async () => {
        const empIp = await ip.address()
        return empIp;
    }
}