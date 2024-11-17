const { compare } = require('bcrypt')
const mongooose = require('mongoose')


const connectDB =  async()=>{
        try {
            await mongooose.connect(process.env.MONGO_URI)

            console.log("Database Connected Sucessfully")
        } catch (error) {
            console.log("ERROR", error)
        }
}

module.exports =  connectDB;