var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/list', {
                    title: 'User List', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/list', {
                    title: 'User List', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/add', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/add', {
        title: 'Add New User',
        surname:'',
        name: '',
        gender:'',
        maritalstatus: '',
        age: '',
        DOB: '',
        tribe:'',
        religion:'',
        email: '',
        phoneNo: '',
        address: '',
        natoinality: '',
        state: '',
        lga:'',
        occupation:'',
        kinName:'',
        kinRelationship:'',
        kinPhone:'',
        kinEmail:'',
        kinAddress:'',
    })
})
 
// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){    
    req.assert('surname', 'surname is required').notEmpty()
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('gender', 'gender is required').notEmpty()
    req.assert('maritalstatus', 'maritalstatus is required').notEmpty()
    req.assert('DOB', 'DOB is required').notEmpty()             //Validate age
    req.assert('tribe', 'tribe is required').notEmpty()
    req.assert('religion', 'religion is required').notEmpty()
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    req.assert('phoneNo', 'phoneNo is required').notEmpty()
    req.assert('address', 'address is required').notEmpty()
    req.assert('natoinality', 'natoinality is required').notEmpty()
    req.assert('state', 'state is required').notEmpty()
    req.assert('lga', 'lga is required').notEmpty()
    req.assert('occupation', 'occupation is required').notEmpty()
    req.assert('kinName', 'kinName is required').notEmpty()
    req.assert('kinRelationship', 'kinRelationship is required').notEmpty()
    req.assert('kinPhone', 'kinPhone is required').notEmpty()
    req.assert('kinEmail', 'kinEmail is required').notEmpty()
    req.assert('kinAddress', 'kinAddress is required').notEmpty()
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var user = {
            surname: req.sanitize('surname').escape().trim(),
            name: req.sanitize('name').escape().trim(),
           gender: req.sanitize('gender').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            maritalstatus: req.sanitize('maritalstatus').escape().trim(),
            DOB: req.sanitize('DOB').escape().trim(),
           tribe: req.sanitize('tribe').escape().trim(),
           religion: req.sanitize('religion').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            phoneNo: req.sanitize('phoneNo').escape().trim(),
            address: req.sanitize('address').escape().trim(), 
            natoinality: req.sanitize('natoinality').escape().trim(),
            state: req.sanitize('state').escape().trim(), 
            lga: req.sanitize('lga').escape().trim(),
            occupation: req.sanitize('occupation').escape().trim(), 
            kinName: req.sanitize('kinName').escape().trim(),
            kinRelationship: req.sanitize('kinRelationship').escape().trim(),
            kinPhone: req.sanitize('kinPhone').escape().trim(),
            kinEmail: req.sanitize('kinEmail').escape().trim(),
            kinEmail: req.sanitize('kinAddress').escape().trim(),
            
            
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO users SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        surname: user.surname,
                        name: user.name,
                        gender: user.gender,
                      maritalstatus: user.maritalstatus,
                        age: user.age,
                        DOB: user.DOB,
                        tribe: user.tribe,
                        religion: user.religion,
                        email: user.email,
                        phoneNo: user.phoneNo,
                        address: user.address,
                        natoinality: user.natoinality, 
                        state: user.state,
                        lga: user.lga,
                        occupation: user.occupation,   
                        kinName: user.kinName,
                        kinRelationship: user.kinRelationship,
                        kinPhone: user.kinPhone,
                        kinEmail: user.kinEmail,   
                        kinAddress: user.kinAddress         
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        surname: '', 
                        name: '',
                        gender: '',
                        maritalstatus:'',
                        age: '',
                        DOB: '',
                        tribe:'',
                        religion: '',
                        email: '',
                        phoneNo: '',
                        address: '', 
                        natoinality: '',
                        state: '', 
                        lga: '', 
                        occupation: '',
                        kinName:'',         
                        kinRelationship:'',  
                        kinPhone:'',
                        kinEmail:'',
                        kinAddress:'',     
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/add', { 
            title: 'Add New User',
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            maritalstatus: req.body.maritalstatus,
            DOB: req.body.DOB,
            tribe: req.body.tribe,
            religion: req.body.religion,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            surname: req.body.surname,
            natoinality: req.body.natoinality, 
            state: req.body.state,
            lga: req.body.lga,
            occupation: req.body.occupation, 
            kinName: req.body.kinName,
            kinRelationship: req.body.kinRelationship,
            kinEmail: req.body.kinEmail,
            kinAddress: req.body.kinAddress
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with id = ' + req.params.id)
                res.redirect('/users')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/edit', {
                    title: 'Edit User', 
                    //data: rows[0],
                    id: rows[0].id,
                    surname: rows[0].surname, 
                    name: rows[0].name,
                    age: rows[0].age,
                    gender: rows[0].gender,
                    maritalstatus:rows[0].maritalstatus,
                    DOB: rows[0].DOB,
                    tribe: rows[0].tribe,
                    religion:rows[0].religion,
                    email: rows[0].email,
                    phoneNo: rows[0].phoneNo,
                    address: rows[0].address,
                    natoinality: rows[0].natoinality, 
                    state: rows[0].state,
                    lga: rows[0].lga,
                    occupation: rows[0].occupation,
                    kinName: rows[0].kinName,
                    kinRelationship: rows[0].kinRelationship,
                    kinPhone: rows[0].kinPhone,
                    kinEmail: rows[0].kinEmail,
                    kinAddress:rows[0].kinAddress


                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('surname', 'surname is required').notEmpty()  
    req.assert('name', 'Name is required').notEmpty()   //Validate name
    req.assert('gender', 'gender is required').notEmpty()  
    req.assert('maritalstatus', 'maritalstatus is required').notEmpty()       
    req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('DOB', 'DOB is required').notEmpty() 
    req.assert('tribe', 'tribe is required').notEmpty() 
    req.assert('religion', 'religion is required').notEmpty()
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    req.assert('phoneNo', 'phoneNo is required').notEmpty()
    req.assert('address', 'address is required').notEmpty() 
    req.assert('natoinality', 'natoinality is required').notEmpty()
    req.assert('state', 'state is required').notEmpty()
    req.assert('lga', 'lga is required').notEmpty() 
    req.assert('occupation', 'occupation is required').notEmpty() 
    req.assert('kinName', 'kinName is required').notEmpty() 
    req.assert('kinRelationship', 'kinRelationship is required').notEmpty()
    req.assert('kinPhone', 'kinPhone is required').notEmpty() 
    req.assert('kinEmail', 'kinEmail is required').notEmpty() 
    req.assert('kinAddress', 'kinAddress is required').notEmpty()     
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var user = {
            address: req.sanitize('surname').escape().trim(),
            name: req.sanitize('name').escape().trim(),
            gender: req.sanitize('gender').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            maritalstatus: req.sanitize('maritalstatus').escape().trim(),
            DOB: req.sanitize('DOB').escape().trim(),
            tribe: req.sanitize('tribe').escape().trim(),
            religion:req.sanitize('religion').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            phoneNo: req.sanitize('phoneNo').escape().trim(),
            address: req.sanitize('address').escape().trim(),
            natoinality: req.sanitize('natoinality').escape().trim(),
            state: req.sanitize('state').escape().trim(),
            lga: req.sanitize('lga').escape().trim(),
            occupation: req.sanitize('occupation').escape().trim(),
            kinName: req.sanitize('kinName').escape().trim(),
            kinRelationship: req.sanitize('kinRelationship').escape().trim(),
            kinPhone: req.sanitize('kinPhone').escape().trim(),
            kinEmail: req.sanitize('kinEmail').escape().trim(),
            kinAddress: req.sanitize('kinAddress').escape().trim(),

        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        surname: req.body.surname, 
                        name: req.body.name, 
                        gender: req.body.gender,                      
                        age: req.body.age,
                        maritalstatus: req.body.maritalstatus,
                        DOB: req.body.DOB,
                        tribe: req.body.tribe,
                        religion:req.body.religion,
                        email: req.body.email,
                        phoneNo: req.body.phoneNo,
                        address: req.body.address,
                        natoinality: req.body.natoinality,
                        state: req.body.state,
                        lga: req.body.lga,
                        occupation: req.body.occupation,
                        kinName: req.body.kinName,
                        kinRelationship: req.body.kinRelationship,
                        kinPhone:req.body.kinPhone,
                        kinEmail:req.body.kinEmail,
                        kinAddress:req.body.kinAddress
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        surname: req.body.surname,
                        name: req.body.name,
                        gender: req.body.gender,
                        age: req.body.age,
                        maritalstatus: req.body.maritalstatus,
                        DOB: req.body.DOB,
                        tribe:req.body.tribe,
                        religion: req.body.religion,
                        email: req.body.email,
                        phoneNo: req.body.phoneNo,
                        address: req.body.address,
                        natoinality: req.body.natoinality,
                        state: req.body.state,
                        lga: req.body.lga,
                        occupation: req.body.occupation,
                        kinName: req.body.kinName,
                        kinRelationship: req.body.kinRelationship,
                        kinPhone:req.body.kinPhone,
                        kinEmail:req.body.kinEmail,
                        kinAddress:req.body.kinAddress

                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/edit', { 
            title: 'Edit User',            
            id: req.params.id, 
            surname: req.body.surname,
            name: req.body.name,
           gender: req.body.gender,
            age: req.body.age,
            maritalstatus: req.body.maritalstatus,
            DOB: req.body.DOB,
            tribe:req.body.tribe,
            religion: req.body.religion,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            natoinality: req.body.natoinality,
            state: req.body.state,
            lga: req.body.lga,
            occupation: req.body.occupation,
            kinName: req.body.kinName,
            kinRelationship: req.body.kinRelationship,
            kinPhone:req.body.kinPhone,
            kinEmail:req.body.kinEmail,
            kinAddress:req.body.kinAddress
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
    
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/users')
            } else {
                req.flash('success', 'User deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/users')
            }
        })
    })
})

//Search for individual patients
app.get('/(:id)', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM users WHERE id = ' + req.params.id,function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/list', {
                    title: 'User List', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/list', {
                    title: 'User List', 
                    data: rows
                })
            }
        })
    })
})
 
module.exports = app