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
### How to use ?

Acquire the class by importing or requiring after installing the package. Then pass down the option object(if needed) during the initialization. You should know following things to use this package efficiently !

* Why Option ?

  You can pass various options to the class so that your manipulation is reduced !! Is this mandatory ? No. You can skip this and use the class directly if you dont have any interest. But wait, this will really save ur time if you want any filter operations to carry out on DOM element's tag, id, class or any attributes.

  You can also assign priority for attributes and tag. So is that all option does ? Haha no ! You can set root element and also set the relative-depth for multi-selector(will explain about this below) 

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
ni
### Usage

There are four member-functions availabe to use. Two for unique-css-selector and two for multi-selector. Why two ? Because you may want to pass javascript node element or jQuery node element. So you can choose any methods that suit you best :)

* Unique Css Selector Functions
  
  1 getCssPath           ---> argument is javascript node element
  2 uniqueCssSelector    ---> argument is jQuery node element
  
* Multi Selector
  
  1 getCommonSelector    ---> argument is javascript node element
  2 multiSelector        ---> argument is jQuery node element
  



