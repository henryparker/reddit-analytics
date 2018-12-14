
const passport = require('passport');

module.exports = app =>{
    app.get('/auth/google',
        passport.authenticate('google',{
            scope: ['profile', 'email']
          })
    ,()=>{console.log("from login")});
    
    app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
        console.log('from auth callback');
        // res.send(req.user);
        res.redirect('/');     
        
    });

    app.get('/auth/logout',(req,res)=>{
        console.log('from logout');
        req.logout();
        res.redirect('/');
    })

    app.get('/auth/current_user', (req, res) => {
        console.log('from current user');
        res.send(req.user);
      });
}


