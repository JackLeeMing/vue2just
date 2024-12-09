function Person(name, age) {
  this.name = name
  this.age = age
  this.say = function () {
    console.log('say', this.name)
  }
}

const Obj = { Hello: 1 }
Object.defineProperty(Obj, 'TAG', {
  value: 'Person',
  configurable: false,
  writable: false,
  enumerable: false
})
Person.prototype = Obj
// Person.prototype.TAG = 'Person'
Person.prototype.sayHello = function () {
  console.log('say Hello')
}

export default Person
