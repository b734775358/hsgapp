
/*
*   首先考虑eventBus的工作原理是什么，用法
*   event.bus.emit('name', argument)
*   event.bus.on('name', (argument) => {}) 这个是监听方法
*
*/
class Bus {
  constructor () {
    // 存储一个接收的对象
    this.callback = {}
  }

  // bus总线的方法

  // 实现订阅
  on (name, fn) {
    this.callback[name] = this.callback[name] || []
    this.callback[name].push(fn)
  }

  // 触发事件
  emit (name, argument) {
    const callback = this.callback[name]
    callback && callback.forEach(cb => {
      cb(argument)
    })
  }

  // 取消订阅
  off (name, fn) {
    const callback = this.callback[name]
    callback && callback.forEach(cb => {
      cb = null
    })
  }
}
const bus = new Bus()
export default bus
