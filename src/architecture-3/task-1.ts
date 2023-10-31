function extend(classExtend, extender) {
  Object.setPrototypeOf(extender, Object.getPrototypeOf(classExtend.prototype)); // work 'super'
  Object.defineProperties(classExtend.prototype, Object.getOwnPropertyDescriptors(extender)); // work accessors
}


class Foo {
    get42() {
      return 42;
    }
  }
  
  class Bar extends Foo {
    
  }
  
  extend(Bar, {
    get overloaded42() {
      return this.get42();
    },
    
    get42() {
      return super.get42() * 10;
    }
  });

  console.log(new Bar());