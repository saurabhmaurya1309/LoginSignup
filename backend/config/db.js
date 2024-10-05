const mongoose = require('mongoose');
// Bm52OAN14D5qNAJl
// 90JOANIufyyBZKkY
const mongodbURL="mongodb+srv://saurabhmaurya1309:90JOANIufyyBZKkY@cluster0.dunzn.mongodb.net/"
const connectDB = async () => {
    try {
        await mongoose.connect(mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
