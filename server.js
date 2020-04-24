const express = require('express')
var bodyParser = require('body-parser'); 
const app =new express()
const db=require('./conn')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static("./"))
// express已经把需要对服务器的操作封装好了
// get、post、put、delete
/* app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();  
}); */

app.post('/login',(req,res)=>res.send("OK"))
app.get('/list',(req, res) => {    
    db.query('select username,phone from login',[],function(result,fields){
        res.send(result)
    })
})

app.get('/show', (req, res) => {    
    db.query('select * from fruits',[],function(result,fields){
        res.send(result)
    })
})
app.post('/insert',(req,res)=>{
    if(req.query.name&&req.query.quanlity!=0&&req.query.price!=0){
        var sql=`insert into fruits(水果名,水果数量,水果单价)
          values ('${req.query.name}',${req.query.quanlity},${req.query.price}) `
        db.query(sql,[],function(result,fields){
            if(result)
            res.send('提交成功！')
            else{
                res.send('s2d')
            }
        })        
    }
})
app.delete('/delete',(req,res)=>{
    if(req.query.id!==0){
    var sql=`delete  from fruits where id=${req.query.id}`
    db.query(sql,[],function(result,fields){
        if(result){
            res.send('删除成功！')
        }
    })
    }
})
app.put('/update',(req,res)=>{
    if(req.query.id!==0){
        var sql=`update fruits set 水果名='${req.query.name}',
        水果数量='${req.query.quanlity}',水果单价='${req.query.price}'
        where id=${req.query.id}`
        db.query(sql,[],function(result,fields){
            if(result){
                res.send('修改成功！')
            }
        })
    }
})
app.listen(7000)
