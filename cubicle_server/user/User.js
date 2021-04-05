var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  datenaissance: String,
  profileimage: String,
  coverimage: String,
  CV:
    { 
      experiences:[
        {
          experience:{
            title: String,
            description: String,
            date: String}
          }
        ],
      AboutMe : {
          description : String,
          adresse : String ,
          phone: String
      }
    },
});
mongoose.model('User2', UserSchema);

module.exports = mongoose.model('User2');