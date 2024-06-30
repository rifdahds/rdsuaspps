import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

//membuat struktur tabel
const User = db.define('users', { //nama tabel=users
    //field
    name: DataTypes.STRING,
    nip: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
},{
    
    freezeTableName:true
});

export default User;

//function untuk mengenerate tabel, jika tabel user tidak terdapat di database
(async()=>{
    await db.sync();
}) ();