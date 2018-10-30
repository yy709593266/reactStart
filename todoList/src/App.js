import React from 'react'
import ReactDOM from 'react-dom'
import BoardContainer from './BoardContainer'
// import mongoose from 'mongoose'

// mongoose.connect('mongodb://localhost:27017/test')

// let db = mongoose.connection
// db.on('error', ()=>{
//   console.log('数据库连接失败')
// })
// db.on('open', ()=>{
//   console.log('数据库连接成功')
// })
// db.on('close', ()=>{
//   console.log('数据库断开成功')
// })

ReactDOM.render(<BoardContainer />, document.getElementById('root'))

