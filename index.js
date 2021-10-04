const passport = require("passport");

express = require("express")
// const cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require("cookie-session")
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    console.log(req.user);
    res.render('./index.ejs')
})
passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((id,done)=>{
        done(null,user);
})


passport.use(new GoogleStrategy({
    clientID: "886985145325-49gggtki945iqkr6ds9dsdfrd6aqu04i.apps.googleusercontent.com",
    clientSecret: "OaU7wMiGLmvg1mF13FjaZ0j4",
    callbackURL: "http://localhost:5000"
  },(accessToken, refreshToken, profile, done) => {
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
      console.log(profile);
      return done(null, profile)
  }
))


app.use(cookieSession({
    maxAge : 100000000000000 ,
    keys : ["rahul"]
}))
app.use(passport.initialize())
app.use(passport.session())

console.log("hello");
app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))

app.listen((5000),()=>{
    console.log("app running on port 5000")
});