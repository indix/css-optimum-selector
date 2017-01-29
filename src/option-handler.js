import defaultProps from './defaults'

export default class OptionHandler {

  constructor(props) {
    this.ignore = (props && props.ignore) || null
    this.ignoreFunc = (props && props.ignoreFunc) || null
    this.root = (props && props.root) || 'html'
    this.priority = (props && props.priority) || defaultProps.priority
    this.relativeDepth = (props && props.relativeDepth) || defaultProps.relativeDepth
    this.startWith = (props && props.startWith) || defaultProps.startWith
  }

  checkStartWith(element, path) {
    try {
      const mapper = {
        id: '#',
        class: '.',
        tag: element.prop('tagName').toLowerCase(),
      }
      const startCrumb = path.split(' > ')[0];
      for( let item in this.startWith ) {
        if (startCrumb.startsWith(mapper[this.startWith[item]])) return true
      }
      return false;
    } catch(e) {
      console.log(e);
    }

  }

}
