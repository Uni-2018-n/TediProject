const mongoose          = require('mongoose');
const dotenv            = require('dotenv');
dotenv.config();

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        // Create mongo connection
        await mongoose.connect(process.env.DATABASE_ACCESS, connectionParams)
        console.log("Connected to the database!");
    } catch (error) {
        console.log(error);
        console.log("Cannot connect to the database!");
    }
}