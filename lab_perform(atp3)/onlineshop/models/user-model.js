var db = require('./db');

module.exports= {
	getById : function(id, callback){
		var sql = "select * from employee where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from employee";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validate: function(employee, callback){
		var sql ="SELECT * FROM employee where uname=? and password=?";
		db.getResults(sql, [employee.uname, employee.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from employee where uname=?";
		db.getResults(sql, [uname], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(employee, callback){
		var sql = "insert into employee values(?,?,?,?)";
		db.execute(sql, [null, employee.uname, employee.password, employee.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(employee, callback){
		var sql = "update employee set ename=?, contno=? ,uname=?,password=? where id=?";
		db.execute(sql, [employee.ename, employee.contno,employee.uname,employee.password,employee.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(employee, callback){
		var sql = "delete from employee where id=?";
		db.execute(sql, [employee.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}