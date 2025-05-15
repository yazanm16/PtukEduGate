var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var cors=require('cors')

const studentRouter=require('./modules/student/routes/student.router');
const AuthenticationRouter =require('./modules/main/routes/auth.routes');
const courseRouter=require('./modules/courses/routes/course.router');
const adminRouter=require('./modules/admin/routes/admin.routes');
const uploadRouter=require('./modules/uploads/routes/upload.routes');
const departmentRouter=require('./modules/departments/routes/department.router');
const departmentCourseRouter=require('./modules/departments_courses/routes/dc.router')
const collegeRouter=require('./modules/colleges/routes/college.router');
const bookRouter=require('./modules/books/routes/book.router');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.resolve(__dirname, 'public', 'uploads')));


app.use('',studentRouter);
app.use('',AuthenticationRouter );
app.use('',courseRouter);
app.use('',adminRouter);
app.use('',uploadRouter);
app.use('',departmentRouter);
app.use('',departmentCourseRouter);
app.use('',collegeRouter);
app.use('',bookRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
