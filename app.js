var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie.js');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc');


app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('imooc started on port ' + port);

//index page
app.get('/', function (req, res) {
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    });
});

//detail page
app.get('/movie/:id', function (req, res) {
    var id=req.params.id;
    Movie.findById(id,function(err,movie){
        if(err){
            console.log(err)
        }
        res.render('detail', {
            title: 'imooc '+movie.title,
            movie: movie
        })
    });
});

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            title: '',
            _id: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    })
});

//admin post movie
app.post('/admin/movie/new',function(req,res){
   var id = req.body.movie._id ;
   var movieObj = req.body.movie;
   var _movie;

   if(id!=='undefined'){
       Movie.findbyId(id,function(err,movie){
           if(err){
               console.log(err)
           }

           _movie =
       })
   }
});



//list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: 'imooc 列表页',
        movies:[
            {
                title: '机械战警',
                _id: 1,
                doctor: '何塞·帕蒂利亚',
                country: '美国',
                year: 2014,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
                language: '英语',
                flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
                summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。 '
            }
        ]
    })
});