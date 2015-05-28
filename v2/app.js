var express          = require( 'express' )
  , app              = express()
  , server           = require( 'http' ).createServer( app ) 
  , passport         = require( 'passport' )
  , util             = require( 'util' )
  , bodyParser       = require( 'body-parser' )
  , cookieParser     = require( 'cookie-parser' )
  , session          = require( 'express-session' )
  , RedisStore       = require( 'connect-redis' )( session )
  , GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy;
var key="";
// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID      = ""
  , GOOGLE_CLIENT_SECRET  = "";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
	key=accessToken;
	console.log(accessToken);
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public'));
app.use( cookieParser()); 
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
	extended: true
}));
app.use( session({ 
	secret: 'cookie_secret',
	name:   'kaas',
	store:  new RedisStore({
		host: 'localhost',
		port: 6379
	}),
	proxy:  true,
    resave: true,
    saveUninitialized: true
}));
app.use( passport.initialize());
app.use( passport.session());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account',ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/mail/:input',function(req,res){

console.log("key"+key);
var input=req.params.input;

console.log(input);

var MAX=3;
var Gmail = require('node-gmail-api')
  , gmail = new Gmail(key)
  , s = gmail.messages(input, {max: MAX})
  //, e=gmail.estimatedMessages('from: john AND newer_than:31d', {max: MAX},{max: MAX})

//console.log(s);
var da=[];
var count=0;
//e.on('error', function (e) {
//      console.log("Error "+e);
//    });


s.on('data',function(a){
count++;
console.log("count in"+count);
});

console.log("count"+count);

console.log("lenght"+s['data']);
s.on('data', function (d) {
// console.log(d)
console.log("asd");
da.push(d.snippet);
//console.log(da.sn);
console.log(da.length);
if(da.length==MAX){
res.render('mail',{data:da});}

});

//console.log("Data from snippet");
//console.log(da.length);

//for (var i = 0; i < da.length; i++) {
 //   console.log(da);
//}

//res.render('mail',{data:["abs","asdasd"]});
});


app.get('/voice',function(req,res){

var Annyang = require('annyang');
 
var annyang = new Annyang();

// Let's define a command. 
var commands = {
    'show tps report': function() { 
        console.log("hello");  
    }
};
 
// Initialize our commands with annyang 
annyang.init(commands);
 
// Trigger a command 
annyang.trigger('show tps report');

res.render('voice2', { user: "" });
});

app.get('/login', function(req, res){
console.log("key"+key);  
res.render('login', { user: key });

});

// GET /auth/google


app.get('/auth/google', passport.authenticate('google', { scope: [
	'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
       'https://www.googleapis.com/auth/gmail.readonly'] 
}));

// GET /auth/google/callback

app.get( '/auth/google/callback', 
    	passport.authenticate( 'google', { 
    		successRedirect: '/',
    		failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

server.listen( 3000 );


// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
