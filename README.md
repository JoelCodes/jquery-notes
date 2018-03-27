# jQuery

## Why does jQuery exist?

- write less, do more.
- browser compatibility
- popularity

jQuery was first released in August, 2006. There have been two major versions released since then. The popularity of jQuery is on a downward trend. There are enough sites out there that still use it to make it worth learning.

## Library or Framework?

I don't have a single correct answer for this. There are differing opinions.

Today we should consider jQuery to be a library. It provides an API that is intended on making it easier to manipulate the DOM. It doesn't have a strong opinion on how you should use it.

A framework can be composed of many libraries, code generators and domain specific languages. It is generally expected that you use framewoks in a specific way.

## Getting jQuery

There are many ways to get jQuery.

1. CDN
2. Download
3. NPM

### CDN (Content Delivery Network)

We can include a script tag that loads the jQuery library from another site. jQuery is so popular that we have many different CDN options.

- https://code.jquery.com/
- https://cdnjs.com/libraries/jquery/
- https://developers.google.com/speed/libraries/#jquery

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
```

### Download

With a CDN, when you reload the html it will try and download the library. This means that you need an internet connection to devlop your app. To get around that we can download the jQuery library as one file and load it from our own machine.

http://jquery.com/download/

```
<script src="jquery.js"></script>
```

### NPM

Until now we have been using NPM to install all of our *server* libraries. This is possible for jQuery as well. 

`npm install jquery`

I don't recommend doing this unless you are also planning on using a module bundler. This is client side JavaScript and there are some additonal considerations compared to server side JavaScript.

```
<script src="node_modules/jquery/dist/jquery.js"></script>
```

> Just stay away from this for now.

## What is $ or jQuery in code?

If you have included the jQuery library using a script tag, then you can access the module in one of two ways. Using the jQuery variable or the $ variable. In the browser there is no support for require like we have in node. Instead the jQuery script file will load the jQuery module into the global scope.

http://api.jquery.com/jquery/

### Global Scope

The browser and node don't handle global scope in the same way. In the browser there is a global scope called `window`. When variables are declared outside of functions they are added to the `window` object. 

```
var globalVariable = true

function globalFunction() {
  var localVariable = true

  if(globalVariable) {
    console.log('Global Variable Accessible')
  }

  if(localVariable) {
    console.log('Local Variable Accessible')
  }
}

globalFunction()

console.log(window['globalVariable']) // true
console.log(window['globalFunction']) // [function]
console.log(window['localVariable'])  // undefined
```

If the globalVariable isn't found within the scope of the globalFunction, then it will look in the `window` object.

### jQuery Object

The jQuery object contains a collection of dom elements with some helpful functions. Each of these helper functions also return a jQuery object.

Let's say we want to create a new header for our page and append it to the body.

__Browser DOM API__

```
var header = document.createElement('h1')
var content = document.createTextNode('write less, do more.')

header.appendChild(content)

var body = document.getElementsByTagName('body')
body[0].appendChild(header)
```

__jQuery__

```
$('<h1>write less, do more.</h1>').appendTo('body')
```

https://learn.jquery.com/using-jquery-core/jquery-object/

### jQuery API

The jQuery API is well [documented](https://api.jquery.com/).

Notice how [.css()](https://api.jquery.com/css/) can be called a few different ways. When calling [.show()](https://api.jquery.com/show/) or [.hide()](https://api.jquery.com/hide/) you can specify a duration, to turn the action into an animation. Some methods like [.first()](https://api.jquery.com/first/) are simple and accept no parameters. A lot of the methods are getters and setters like [.val()](https://api.jquery.com/val/). 

## What does jQuery add to the browser?

### [Selection](https://learn.jquery.com/using-jquery-core/selecting-elements/)

I want all the 'div' tags.

`$('div')`


### [Traversal](https://api.jquery.com/category/traversing/tree-traversal/)

Tell me about your siblings.

`$('button').siblings('input')`


### [Manipulation](https://api.jquery.com/category/manipulation/)

Your new value is `content`.

`$('input').val('content')`


### [Creation](http://api.jquery.com/jQuery/#jQuery2)

I'd like a new `<li>` tag that I can use for a new todo.

`$('<li>')`

This only creates the element, but it is not yet a part of the DOM.

```
var item = $('<li>').text(content)
$('ul').append(item)
```

In this example the `<ul>` tag is already a part of the document.

If you want to create the element in the append tag, jQuery will let you do that.

```
$('ul').append('<li>' + content + '</li>')
```

If you are already working on the `<li>` tag then you can append it to the `<ul>`.

```
$('<li>').text(content).appendTo('ul')
```


## Event Delegation

> Event delegation allows us to attach a single event listener, to a parent element, that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future.

```
$('ul').on('click', 'li', function(event) {
  var li = $(event.target)
  li.toggleClass('done')
})
```

The click event is the __single event listener__ attached to the __parent element__ of all of the `<li>` tags. If I click on an `<li>` tag that is a descendant of the `<ul>` then it will call this function. This means I can add more `<li>` tags without needing to concern myself with adding done functionality to each one.

[Event Delegation](https://learn.jquery.com/events/event-delegation/)

## $(document).ready()

Using the built in browser API we can execute JavaScript code after the DOM is ready. 

```
document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOMContentLoaded')
})
```

jQuery was built for compatibility. Some older browsers do not fire the event 'DOMContentLoaded'. If we use the `ready` function then jQuery will hide these differences from us.

```
$(document).ready(function() {
  console.log('DOMContentLoaded')
})
```

This is done so often when writing jQuery code that you can shorten this to:

```
$(function() {
  console.log('DOMContentLoaded')
})
```

## Bonus

You will see the use of `this` in jQuery code examples. It can be used to create a jQuery object. `$(this)` will work as long as you understand how the context is set. 

```
$('ul').on('click', function(event) {
  var ul = $(this)
})
```

Not quite what we were looking for. In this case event delegation has been impacted.

```
$('ul').on('click', 'li', function(event) {
  var li = $(this)
})
```

By giving the `on` function an optional 'selector' parameter we can ensure the context is correct. This can be avoided by using `event.target` instead of `this`. Notice that in all of my examples I used the event to get the targeted element.
