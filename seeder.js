const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv').config();
const Bootcamp = require('./models/Bootcamp')

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

//   Read Json files

const bootCamp = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8')
)


const importData = async()=>{
    try {
        await Bootcamp.create(bootCamp);
        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async ()=>{
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed'.red.inverse);
    } catch (error) {
        console.log(error);
    }
}


if(process.argv[2]==='-i'){
    importData();
}else if(process.argv[2]==='-d'){
    deleteData();
}