const md5 = require('blueimp-md5')
// 1. 连接数据库
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin_test2')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
    console.log('数据库连接成功')
})

const userSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
});

const UserModel = mongoose.model('user', userSchema); // 集合名: users

function testSave() {
    // user 数据对象
    const user = {
    username: 'jiaming',
    password: md5('0987'),
    type: 'dashen',
    }
    const userModel = new UserModel(user)
    // 保存到数据库
    userModel.save(function (err, user) {
    console.log('save', err, user)
    })
}

// testSave();
function testFind() {
    //查多个
    UserModel.find(function (error, users){
        console.log('find()', error, users)
    })
    //查一个
    UserModel.findOne({_id:'5cc87ad10ad7dd5054ab4de4'}, function(error, user){
        console.log('findOne()', error,user)
    })
}

// testFind();

// 3.3. 通过Model 的findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndUpdate({_id: '5cc87ad10ad7dd5054ab4de4'}, {username: 'yyy'},
    function (err, user) {
    console.log('findByIdAndUpdate()', err, user)
    })
}
// testUpdate()

function testDelete() {
    UserModel.remove({_id: '5ae1241cf2dd541a8c59a981'}, function (err, result) {
    console.log('remove()', err, result)
    })
    }
// testDelete()