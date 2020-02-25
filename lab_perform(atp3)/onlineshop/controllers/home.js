var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['uname'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/addemployee', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/addemployee', {employeelist: results});
			}else{
				res.redirect('/home');
			}
		});
});
router.get('/view_employee', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_employee', {employeelist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/update/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/update', {employee: result});
	});
});

router.post('/update/:id', function(req, res){
	
		var employee = {
			id: req.params.id,
			ename: req.body.ename,
			contno: req.body.ename,
			uname: req.body.uname,
			password: req.body.password,
			
		};

		userModel.update(employee, function(status){
			if(status){
				res.redirect('/home/view_employee');
			}else{
				res.redirect('/home/update/'+req.params.id);
			}
		});
});

module.exports = router;