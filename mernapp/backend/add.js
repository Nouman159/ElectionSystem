// admin513@gmail.com
// admin@admin513
const Admin = require('./models/Voter');
const mongoDB = require('./managedb');
const bcrypt = require("bcryptjs");

const conn = async () => {
    try {
        const connection = await mongoDB();
        console.log('Connected to MongoDB');
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash('admin@admin513', salt);
        const admin = new Admin({

            email: 'admin513@gmail.com',
            password: secPassword
        });


        admin.save()
            .then(() => {
                console.log('Admin registered successful');
            })
            .catch((error) => {
                console.error('Error registering admin : ', error);
            });
    } catch (error) {
        console.error('Error connecting to MongoDB : ', error);
    }
};

conn();
