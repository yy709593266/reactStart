### React 开发实战--Notes

[整本书的实例代码](https://github.com/pro-react)

#### React中的事件

使用HTML标签提供的事件处理API：`onclick`，`onfocus`充满了令人讨厌的副作用：
* `onclick`添加的事件处理函数是全局环境下执行的，污染了全局变量
* 给很多DOM元素添加onclick事件可能会影响网页的性能，毕竟网页需要的事件处理函数越多性能越低
* 对于使用onclick的DOM元素，如果要动态从DOM树中删除的话，需要把相应的事件处理器也注销，否则可能造成内存泄漏

react的JSX使用了相似的API，一样的好使和好理解，但却没有了那些副作用.通过自动使用事件委托来实现高性能，它不会将事件处理程序附加到节点自身，它会将一个单独事件监听器附加到文档的根节点，当事件触发后将事件映射到相应的组件元素，这样，当组件被卸载时，react还会自动移除相应的事件监听器。

#### React中插入markdown
使用marked模块`npm install --save marked`
引入marked模块后对需要转成markdown的文档进行处理：

```jsx
{marked([github](https://github.com/pro-react))}
```

我们知道，在markdown语法中，这句话应该显示的是一个指向相应网址的github文字，但是，由于React默认不允许JSX内部渲染HTML标签，所以输出后是一个字符串：`<a href="https://github.com/pro-react">github</a>`

所以，这里使用`dangerouslySetInnerHTML`来实现期望的最终结果：

```jsx
<span dangerouslySetInnerHTML={{__html:marked([github](https://github.com/pro-react))}}></span>
```

#### 脱离JSX的React

##### 普通js中的React元素

```jsx
let child1 = React.createElement('li', null, 'First text content')
let child2 = React.createElement('li', null, 'Second text content')
let root = React.createElement('ul', {className: 'my-list'}, child1, child2)
React.render(root, document.getElementById('example'))
```

##### 工厂方法

使用两个小例子形象生动解释什么叫**工厂方法**：

案例1：

```jsx
//普通创建
var li1 = React.createElement('li', null, 'First');  
var li2 = React.createElement('li', null, 'Second');  
var li3 = React.createElement('li', null, 'Third');  
var ul = React.createElement('ul', {className: 'list'}, li1, li2, li3);  
ReactDOM.render(  
    ul,  
    document.getElementById('timeBox')  
);

//工厂方法创建
var factory = React.createFactory("li");
var li1 = factory(null, 'First');
var li2 = factory(null, 'Second');  
var li3 = factory(null, 'Third');  
var ul = React.createElement('ul', {className: 'list'}, li1, li2, li3);  
ReactDOM.render(ul,document.getElementById('timeBox'));
```

案例2：

```jsx
const foodList = ({list})=>{
    React.createElement('ul', null, 
         list.map((item, i)=>{React.createElement('li', {key:i},item)}))
}
const listFactory = React.createFactory(foodList)
const list = [
        "1 apple",
        "1 banana",
        "2 oranges",
        "2 tomatos"
    ]
ReactDOM(
        listFactory({list}),
        document.getElementById('react-container')
    )
```

#### 受控和非受控组件

在React中，每当表单的状态发生变化时，都会被写入到组件的state中，这种组件在React被称为**受控组件**，只能使用`setState()`更新进行组件更新，受控组件更新state流程如下：

* 可以通过在初始state中设置表单的默认值
* 每当表单的值发生变化时，调用onChange事件处理器
* 事件处理器通过合成事件对象e拿到改变后的状态，并更新state
* setState触发视图的重新渲染，完成表单组件值得更新

如果一个表单组件没有value，props就可以称为**非受控组件**，可以使用`defaultValue`和`defaultChecked`来表示组件的默认状态。非受控组件不为任何输入域提供值，渲染后的元素的值将直接反映用户的输入，例如：

```jsx
return (
    <form>
    	<div className="formGroup">
        	Name: <input name="name" type="text" />
        </div>
    </form>
)
```

以上代码将渲染一个初始值为空的输入域，任何用户输入都会立即反映到渲染后的元素上，如果想要为非受控表单元素设置初始值，应使用`defaultValue`属性而非`value`属性

#### What is `React-fetch`

`fetch`在React中相当于`XMLHttpRequest`，它提供了许多与`XMLHttpRequest`相同的功能，但被设计成更具可拓展性和高效性。

`XMLHttpRequest`是一个设计粗糙的API，不符合关注分离原则，配置和调用方式非常混乱，`fetch`的出现就是为了解决XHR的问题，例子说话：

使用XHR发送一个json请求一般是这样：

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';

xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log("Oops, error");
};

xhr.send();
```

使用`fetch`后：

```jsx
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
```

总结来说`fetch`的好处就是：

* 语法简洁，更加语义化
* 基于标准`Promise`实现，支持`async/await`

#### What is `react-addon-update`
`react-addon-update`主要是用于在react中进行对数据的处理，容易忘记的几种方法如下：

```js
//首先是引入文件
import update from 'react-addons-update'; // ES6
var update = require('react-addons-update'); // ES5 with npm

//$splice
//可以解释为：从第2个下标开始，删除一个元素，然后再插入3和4这两个元素到后面
let initialArray=[1,2,'a'];
let newArray=update(initialArray,{$splice:[[2,1,3,4]});//[1,2,3,4]
```

```js
//$apply
//官方解释:passes in the current value to the function and updates it with the new returned value
//在下解释:就是更新传进去的值
{$apply: function}

```

#### 拖放`react-dnd`

核心API

- **DragSource** 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）
- **DropTarget** 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）
- **DragDropContex** 用于包装拖拽根组件，`DragSource` 和 `DropTarget` 都需要包裹在`DragDropContex`内
- **DragDropContextProvider** 与 `DragDropContex` 类似，用 `DragDropContextProvider` 元素包裹拖拽根组件。

使用`DragSource`和`DragTarget`来创建高阶组件需要提供三个参数：`type`、`spec`、`collect`函数：

1、`type`

​	指定组件的名称

2、`spec`对象

​	描述增强组件是如何响应拖拽和放置事件，它是包含了若干会在拖拽交互发生时被调用的函数

3、`collect`函数：

​	`React DnD`并非直接在你的组件中注入所有的`props`属性，通过`collect`函数让你来控制哪些属性需要进行注入以及如何进行注入。这种方式提供了强大能力，包括在注入前对属性进行预处理和改变名称等。当拖放交互发生时，`React DnD`库会调用你的组件中定义的`collect`函数并传入两个参数`connector`和`monitor`，返回一个对象，这个对象会注入到组件的`props`中。

​	`connector`会在你的组件渲染时用于界定组件DOM的范围，对于`dragSource`这部分DOM用来在拖拽过程中对组件进行呈现，对于`dropTarget`这个DOM作为可放置范围；

​	`monitor`用于查看当前的拖拽情况，可以创建诸如`isDragging`或者`canDrop`的属性，如果需要根据不同值来渲染不用内容就很有用了。

[详解参考](https://segmentfault.com/a/1190000014723549)

在`Container.js`文件中

```js
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

...

export default DragDropContext(HTML5Backend)(Container)
```

这里导入了`React DnD`的`HTML5`后端（不同的设备导入不同的`backend`）