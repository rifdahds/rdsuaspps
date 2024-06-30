import {Sequelize} from "sequelize";

//membuat variabel
const db = new Sequelize('crud_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;