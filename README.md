# CSS Optimum Selector


A class for finding unique css selector and multi-selector in most efficient way. It will give you the shortest selector for any case. It is even shorter than the Google chrome selector.

### Installation
```
npm i css-optimum-selector --save
```
or
``` html
<script src="https://unpkg.com/css-optimum-selector/lib/index.min.js"></script>
```

### What CSS Optimum Selector does ?

It does two main things ! It can extract unique css selector and multi css selector.

Oh thats okay. But what is multi css selector ?

Cool. Just imagine an ordered list with n number of elements. If you wanted to select all the list elements, what will you do ? Click all element and then find its css selector ? No, not needed. Just pass two element to CSS Optimum Selector and it will analyse the pattern and will give you single selector that can select all list elements.

That seems interesting !!! :-D What if there is different pattern, for instance odd, even type. Can I get still all elements or can I get only certain pattern elements ? Can CSS Optimum Selector help me in this case ?

Yeah dude, it will help you for sure ! It gives you relative-depth option with which you can select different pattern.

That seems great !!! :-O What if there is no pattern in selection ?

Cool down, CSS Optimum Selector will return you css selector for both the element B-)

### How to use ?

Acquire the class by importing or requiring after installing the package. Then pass down the option object(if needed) during the initialization. You should know following things to use this package efficiently !

* Why Option ?

  You can pass various options to the class so that your manipulation is reduced !! Is this mandatory ? No. You can skip this and use the class directly if you dont have any interest. But wait, this will really save your time if you want any filter operations to be carried out on DOM element's tag, id, class or any attributes.

  You can also assign priority for attributes and tag. So is that all option does ? Haha no ! You can set root element and also set the relative-depth for multi-selector.

* Option Structure

  ```
  const option = {
    root: 'html',                            //type - string
    priority: ['tag', 'id', 'class'],        //type - Array of string
    relativeDepth: 2,                        //type - number
    ignore: {                                //type - Object of array of string
      class: ['class1', 'class2', 'class3'],
      id: ['id1', 'id2', 'id3'],             //not mandatory to have all keys
      tag: ['tag1', 'tag2', 'tag3'],         //include only the needed one
    },
    ignoreFunc: {
      class: args => args.filter(arg =>      //type - Object of functions
        arg.index('sample') > -1)            //type args - Array of string
    }
  }
```

### Usage

There are two member-functions availabe to use. One for unique-css-selector and one for multi-selector.

It can be used in ES6 or ES5. Below I am giving an example in ES6 format.

* Unique Css Selector Functions

```
  => getUniqueCssSelector     ---> argument is jQuery node element; return type string

```

* Multi Selector

```
  => getMultiSelector        ---> argument is jQuery node element; return type array of string

```  

CSS selector needs one argument which is a target element. Multi selector need three arguments in which third argument is optional. First two arguments are the target elements and third optional argument is number which is relative depth for searching.

* Snipet

```
import CSSOptimumSelector from 'css-optimum-selector'

const option = {
  root: 'body',
  relativeDepth: 3,
}

class SomeRandomClass {
  constructor() {
    this.cssOptimumSelector = new cssOptimumSelector(option)
  }

  someEventHandler(event) {
    const selector = this.cssOptimumSelector.getUniqueCssSelector($(event.target))
  }

  multiSelector(target1, target2) {
    const multiSelector = this.cssOptimumSelector.getMultiSelector(target1, target2, 2)
  }

}
```

### Future Enhancement

Will you be amazed to query maximum relative depth available and set relative depth at run time so that you can query different pattern for any number of times without doing the operation again and again ? Sit and relax. COMING SOON !!!

### Contact

For any issues and doubts feel friendly to contact me [Manishwaran](https://www.linkedin.com/in/manish-waran-9a54a1ba?trk=hp-identity-name).
