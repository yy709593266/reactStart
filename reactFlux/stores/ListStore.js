let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')

// store 保存整个应用的状态,所有数据都放在这里
let ListStore = assign({}, EventEmitter.prototype, {
  items: ['默认的Item'],
  getAll: function() {
    return this.items
  },
  addNewItemHandle: function(text) {
    this.items.push(text)
  },
  emitChange: function(){
    this.emit('change')
  },
  addChangeListener: function(callback){
    this.on('change', callback)
  },
  removeChangeListener: function(callback){
    this.removeListener('change', callback)
  }
})

module.exports = ListStore
