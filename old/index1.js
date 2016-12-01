import cssPath from './css-path';

const checkCommonParent = (a,b) => {
  if (!a.length || !b.length) return null;
  return a.is(b) ? a : checkCommonParent(a.parent(), b.parent());
}
const nthChildStr = (ele) => {
  let str = `${ele.prop('tagName').toLowerCase()}:nth-child(`;
  ele.parent().children().each((idx, child) => {
    if(ele.is(child)) str+=`${idx+1})`;
  })
  return str;
}

const childToParentTraversal = (child, par, path=[]) => {
  if(par.is(child)) return path;
  path.unshift(nthChildStr(child))
  path = childToParentTraversal(child.parent(), par, path)
  return path;
}

const checkCommonPath = (path1, path2) => path1 !== null && path1 === path2;

const getCommonSelector = (ele1, ele2, $) => {
  const commonParent = checkCommonParent(ele1, ele2);
  if (!commonParent) return false;
  const ele1Path = childToParentTraversal(ele1, commonParent).slice(1).join(' > ');
  const ele2Path = childToParentTraversal(ele2, commonParent).slice(1).join(' > ');
  if (checkCommonPath(ele1Path, ele2Path)) {
    const path = cssPath(commonParent.get(0), $);
    const commonSelector = `${path} * ${ele1Path}`;
    return commonSelector;
  }
  return false;
}

export {
  cssPath,
  nthChildStr,
  getCommonSelector,
  checkCommonParent,
  childToParentTraversal,
}
