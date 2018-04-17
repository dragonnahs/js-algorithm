### 常见的一些算数方法


1. 字符串中各个字符串出现的次数
```
var arr = 'abcdaabc';

var info = arr
    .split('')
    .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(info); //{ a: 3, b: 2, c: 2, d: 1 }

```
reduce 对于低版本兼容性不是很好，
可以用下面的方法

```
var temp = {};
'abcdaabc'.replace(/(\w{1})/g,function($1){
    temp[$1] ? temp[$1]+=1 : temp[$1] = 1;
})
console.log(temp) // {a: 3, b: 2, c: 2, d: 1}

// 或者
function getTimesO(str){
  var obj = {}
  str.split('').map(function(val,index){
    if(!obj[val]){
      obj[val] = 1 
    }else{
      obj[val] += 1
    }
  })
  return obj
}

```

2. 阻止事件冒泡
```
function stopBubble(e)
{
    if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true
}

```

3. 判断数据类型，
- typeof 
> `typeof 变量`  返回的是变量的数据类型，但是不能区分数组和对象
- instanceof 
> `变量 instanceof Object||Array` 判断变量是数组还是对象，返回true和false
- Array.isArray()
> `Array.isArray(变量)`  判断变量是不是数组，返回true和false

4. 在console.log（）中加上前缀，‘iphone’

封装log函数
- 初步封装
```
function log(){
  console.log.apply(console,arguments)
}

```
- 第二次封装，怎么才能在参数前面加前缀

```
function log(){
  var newArguments = []
  if(arguments.length > 0){
    for(var i = 0; i < arguments.length; i++){
      newArguments.push('iphone',arguments[i])
    }
  }
  console.log.apply(console,newArguments)
}

```
> 也可以下面的写法

```
function getLog(){
  var args = Array.prototype.slice.call(arguments) // 把arguments伪数组转化为真数组
  args.unshift('(app)') // 调用数组的方法
  console.log.apply(console,args)
}
getLog('df') // (app) df



```

4. 数组排序

- 第一种 (二分法排序)
```
function sortMany(arr){
  if(arr.length <= 1){
    return arr
  }
  var left = [], right = []
  var middleIndex = Math.floor(arr.length/2)
  var middleValue = arr.splice(middleIndex,1)[0]
  for(var i = 0; i < arr.length; i++){
    if(arr[i] < middleValue){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return sortMany(left).concat(middleValue,sortMany(right))

}

```

> 二分法的搜索(需要先对数组进行排序)


```
var arr = [1,2,3,4,5,6,7]

function searchBinary(arr, target){
    let s = 0
    let e = arr.length-1
    let m = Math.floor((s + e)/2)
    let sortTag = arr[s] <= arr[e]

    while(s < e && arr[m] !== target){
        if(arr[m] > target){
            sortTag && (e = m - 1)
            !sortTag && (s = m + 1)
        }else{
            sortTag && (s = m + 1)
            !sortTag && (e = m -1)
        }
        m = Math.floor((s + e)/2)
    }
    if(arr[m] === target){
        return m
    }else{
        return -1
    }
}

searchBinary(arr, 3) // 2

```

- 第二种冒泡排序

```
function sortTwo(arr){
  for(var i=0;i<arr.length-1;i++){
    for(var j=i+1;j<arr.length;j++){
      if(arr[i]>arr[j]){
        var temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}

```
- 第三种数组内置的排序
```
Array.prototype.innerSort = function(){
    this.sort(function (a,b){
        return a - b;
    })
    return this
}

```

5. 数组的去重

```
function deletMany(arr){
  var obj = {}
  var newArr = []
  for(var i=0; i<arr.length-1;i++){
    if(!obj[arr[i]]){
      newArr.push(arr[i])
      obj[arr[i]] = 1
    }
  }
  return newArr
}

```


6. 对象的深拷贝问题
> 代码如下，实现对象的深拷贝

```
function deepCopy(p, c){
      var c = c || {}
      for(var i in p){
        if(typeof p[i] === 'object'){
          c[i] = (p[i].constructor === Array) ? [] : {}
          deepCopy(p[i], c[i])
        }else{
          c[i] = p[i]
        }
      }
      return c
    }

```
 >拷贝分为深拷贝和浅拷贝，拷贝就是把父对象的属性全部拷贝给子对象。
- 浅拷贝只是把对象的第一层属性拷贝下来，如果第一层中有复杂数据类型，只是拷贝的指针，如果父属性的属性变化也会导致拷贝的子对象的属性变化，这有时是不需要的。
- 上面的代码实现的是使用递归实现的深拷贝，也可以使用`JSON.stringfy`先转成简单类型，再使用`JSON.parse`转换成复杂类型。
> 另外一种对象深拷贝

```
function copyObject(orig){
  var copy = Object.create(Object.getPrototypeOf(orig))
  copyOwnPropertiesFrom(copy, orig)
  return copy
}

function copyOwnPropertiesFrom(target, source){
  Object
    .getOwnPropertyNames(source)
    .forEach(function(val){
      var desc = Object.getOwnPropertyDescriptor(source, val)
      if(typeof desc.value === 'object'){
        target[val] = copyObject(source[val])
      }else{
        Object.defineProperty(target, val, desc)
      }
    })
    return target
}

```


7. 判断类型的封装
```
let type = (o) => {
    const s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

[
    "Undefiend",
    'Null',
    'Object',
    'Array',
    "String",
    "Boolean",
    'RegExp',
    'Function'
].forEach(t => {
    type['is'+ t] = (o) => {
        return type(o) === t.toLowerCase()
    }
});
type.isArray([]) //true

```

8. 金额格式化

```

function toThousands(num) {
    var potStr = '.00'
    num = (num||0).toString()
    if(num.indexOf('.') !== -1){
       potStr = num.substr(num.indexOf('.'),3)
    }
    
    var result = [ ], counter = 0;
    num = num.substring(0,num.indexOf('.')).split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('')+potStr;
}

```

9. lazyMan
```

function _LazyMan(name){
    this.name = name
    this.quene = []
    
    console.log('Hi This is ' + this.name)
    setTimeout(() => {
        this.next()
    }, 0);
    
}

_LazyMan.prototype.next = function (){
    if(this.quene.length){
        
        const fn = this.quene.shift()
        if((typeof fn).toLowerCase() === 'function'){
            fn()
            return this
        }
    }else{
        return this
    }
}

_LazyMan.prototype.sleep = function(time){
    
    const fn1 = () => {
        
        setTimeout(() => {
            console.log('Wake up after ' + time)
            this.next()
        }, time);
    }
    this.quene.push(fn1)   
    return this
}
_LazyMan.prototype.dinner = function (){
    const fn = () => {
        console.log('Eat dinner')
        this.next()
    }
    this.quene.push(fn)
    return this
}

function LazyMan(name){
    return new _LazyMan(name)
}

LazyMan('Hank').sleep(2000).dinner()


```

10. 防抖节流

在项目中一般会遇到防止多次点击的情况，这种情况以前处理的时候是使用一个开关，后来研究了下防抖这种方法，在这里记录下
```
function debounce(fn, delay, immidate){
    var timer;
    return function (){
        var that = this;
        var args = arguments;
        clearTimeout(timer)
        if(immidate){
            // 立即执行的走这里
            var doNow = !timer;
            timer = setTimeout(function(){
                timer = null
            }, delay)
            if(doNow){
                fn.apply(that, args)
            }
        }else{
            timer = setTimeout(function(){
                fn.apply(that, args)
            }, delay)
        }
        
    }
}
function foo(){
    console.log('scroll timer is running')
}

document.getElementById('box').addEventListener('mousemove', debounce(foo, 2000, true))

```

