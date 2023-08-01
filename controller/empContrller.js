const empSchema = require('../model/empSchema')

const sinupEmployee = async (req,res) => {
    try{

    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
}

module.exports = sinupEmployee