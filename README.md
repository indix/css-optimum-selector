# CSS Optimum Selector


A class for finding unique css selector and multi-selector(selecting multiple elements based on two relative elements) in a most efficient way. This will give you the shortest selector for any case. It is even shorter than the chrome selector extraction(as per I tested) on console panel ! 

### Installation
```
npm i css-optimum-selector --save
```
or
``` html
<script src="https://unpkg.com/css-optimum-selector/lib/index.min.js"></script>
```

### What CSS Optimum Selector does ?

It does two main things ! It can extract unique css selector and multi css selector. Oh thats okay. But what is multi css selector ? 

Cool. Just imagine an ordered list with n number of elements. If you wanted to select all the list elements, what will you do ? Click all element and then find its css selector ? No, not needed. Just pass two element to CSS Optimum Selector and it will analyse the pattern and will give you single selector that can select all list elements. That seems interesting !!! :-D

What if there is different pattern, for instance odd, even type. Can I get still all elements or can I get only certain pattern elements ? Can CSS Optimum Selector help me in this case ?

Yeah dude, it will help you for sure ! It gives you relative-depth option with which you can select different pattern. That seems great !!! :-O

What if there is no pattern in selection. Cool down, CSS Optimum Selector will return you css selector for both the element ;-)

### How to use ?

Acquire the class by importing or requiring after installing the package. Then pass down the option object(if needed) during the initialization. You should know following things to use this package efficiently !

* Why Option ?

  You can pass various options to the class so that your manipulation is reduced !! Is this mandatory ? No. You can skip this and use the class directly if you dont have any interest. But wait, this will really save ur time if you want any filter operations to carry out on DOM element's tag, id, class or any attributes.

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
      class: (args) => {
        return args.filter((arg) => {        //type - Object of functions
          arg.index('sample') > -1           //type args - Array of string
        }
      }
    }
  }
```

### Usage

There are four member-functions availabe to use. Two for unique-css-selector and two for multi-selector. Why two ? Because you may want to pass javascript node element or jQuery node element. So you can choose any methods that suit you best :)

* Unique Css Selector Functions

```
  => getUniqueCssSelector           ---> argument is javascript node element
  
  => uniqueCssSelector              ---> argument is jQuery node element
``` 

* Multi Selector

```
  => getCommonSelector              ---> argument is javascript node element
  
  => multiSelector                  ---> argument is jQuery node element
```  

CSS selector needs one argument which is a target element. Multi selector needs three argument and third argument is optional. First two arguments are the target element and third optional argument is number which is relative depth for searching.

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
    const selector = this.cssOptimumSelector.getUniqueCssSelector(event.target)
    //for js element above way. If using any jQuery then go for cssOptimumSelector.uniqueCssSelector(targetElm)
  }
  
  multiSelector(target1, target2) {
    const multiSelector = this.cssOptimumSelector.getMultiSelector(target1, target2, 2)
    //for js element above way. If using any jQuery then go for cssOptimumSelector.multiSelector(targetElm)
  }

}
```
