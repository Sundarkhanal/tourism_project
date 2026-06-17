const { default: mongoose } = require("mongoose")
const dbConfig = require("../config/db.config")

const mangoInitialize = async() => {
    try {
        await mongoose.connect(dbConfig.mangodb.url, {
            dbName: dbConfig.mangodb.name,
            autoIndex:true,
            autoCreate:true
        })
        console.log("***Mangodb Connected Successfully!***");
        
        
    } catch (exception) {
        console.log(exception);
        
        console.log("****Mangodb Connection Error****");
        process.exit(0)
               
    }
}

module.exports = mangoInitialize