# CSS Optimum Selector


A module to identify an unique css selector for a jQuery element in a most efficient way. An input of two jQuery elements return a common CSS selector matching a pattern of both the input elements.

### Installation
```
npm i css-optimum-selector --save
```
or
``` html
<script src="https://unpkg.com/css-optimum-selector/lib/dist.js"></script>
```

### What CSS Optimum Selector do?

The module solves two use-cases:
1. Given an element, extract the unique css selector.
2. Given a couple of elements, extract a multi-element css selector uniquely identifying the patten in the input element list.

What is multi-element css selector?

Imagine an ordered list with n number of elements. To select all the elements in the list, one would skim through each of the element and find a common pattern of CSS selector among them.
"CSS Optimum Selector" do it more intelligently. A input of just 2 elements from the list is enough to pull-out the common pattern and the module extracts a single CSS selector that can select all the list elements.

What if there is a different pattern, for instance odd, even type? Can the module uniquely identify all the elements or can it get only certain pattern of elements?

Yes, it can still identify all the elements. The relative-depth option allows to select a either only a single matching pattern or all the patterns.

What if there is no pattern in selection ?

In no patterns case, CSS Optimum Selector will return css selector for each of the element passed as input.

### How to use ?

```
import CSSOptimumSelector from 'css-optimum-selector'
```

Optionally, The module accepts a list of options. The options help to identify the selector in more optimum way by applying filter operations the on input element's tag, id, class or any other attributes.

Below are definition of options:
* root : The root element to begin unique CSS selector extraction. _Default - html_
* startWith: The selector can start with the specified rule. This is optional, if not specified the selector of shortest will be returned. The value is an array which means that the startwith value can be more than one (i.e) specifying ['id', 'class', 'tag'] means the selector can start with any one of the above value.
* priority : The ordered list of identifiers to be used as priority in extractiong selector. _Default - priority: ['tag', 'id', 'class']_
* relativeDepth - Used only for multi-element selector. A value of __1__ is to select all matching list of elements. A value of __2 or above__ is to select only the patterns which match its occurance. For example: Consider a (odd, even, odd, even..) pattern of elements. An input of two odd elements with relativeDepth=2 will return CSS selector to identify all the odd elements. An input of two odd elements with relativeDepth=1 will return CSS selector to identify all listed elements. _Default - 1_

* ignore : For each of class, id and tag, the option accepts an array of classes, ids or tags to
ignored in extracting a CSS selector.
* ignoreFunc : Same logic as ignore parameter, but ignoreFunc accepts a function returning a boolean indicating whether the class, id or tag can be ignored or not.


* Option Structure

  ```
  const option = {
    root: 'html',                            //type - string
    startWith: ['id', 'class']               //type - Array of string
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

The module can be used in ES6 or ES5. Below is an example in ES6 format.

* Unique CSS Selector

```
  => getUniqueCssSelector     ---> argument is jQuery node element; return type string

```

* Multi-element CSS Selector

```
  => getMultiSelector         ---> argument is jQuery node element; return type array of string

```  

**getUniqueCssSelector** accepts one argument the target element.

**getMultiSelector** accepts three arguments, the third being optional. The first two arguments are the target elements and the third optional argument is a number indicating the relative depth.

* Snippet

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

### Status
This project is being actively developed and should be considered alpha quality.


### Further Enhancement

What if the module suggests the maximum relative depth available and the same can be set at runtime, instead of hard-coding relativeDepth within options? Star or watch the project for updates on features.

### Contribute

For any issues or queries, do raise a Github Issue. If you're interested to contribute, please feel free to fork and send in a Pull Request.
