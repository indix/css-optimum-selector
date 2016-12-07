import fs from 'fs'
import { expect } from 'chai'
import cheerio from 'cheerio'
import CRS from '../src'
import defaultOption from './default'

const html = fs.readFileSync('./test/stub/index.html', 'utf8')

describe('CSS-Optimum-Selector', () => {
  it('should return elements tag, id, class etc...', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList(ele1)
    expect(checkList.tag[0]).to.equal('div')
    expect(checkList.class[0]).to.equal('form-field')
    done()
  })

  it('should return filtered data for values in ignore field', (done) => {
    const crs = new CRS(defaultOption)
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList(ele1)
    expect(checkList.class[0]).to.equal('form-field')
    const filteredCheckList = crs.getFilteredCheckList(checkList)
    done();
  })

  it('should return filtered data for values in ignore field', (done) => {
    const crs = new CRS(defaultOption)
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList(ele1)
    expect(checkList.class.length).to.equal(1)
    const filteredCheckList = crs.getFilteredCheckList(checkList)
    expect(checkList.class.length).to.equal(2)
    expect(filteredCheckList.class[1]).to.equal('test-class')
    done();
  })

  it('should return array of attr in priority basis', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList($(ele1))
    const filteredCheckList = crs.getFilteredCheckList(checkList)
    const priorityArray = crs.formPriorityArray(filteredCheckList)
    expect(priorityArray.length).to.equal(2)
    done();
  })

  it('should check whether the node is unique to parent', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList($(ele1), $)
    const filteredCheckList = crs.getFilteredCheckList(checkList)
    const priorityArray = crs.formPriorityArray(filteredCheckList)
    const result = crs.checkUniqueInParent(priorityArray, '', $)
    expect(priorityArray.length).to.equal(2)
    done();
  })

  it('should return two selector for uncommon selectors', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('#productsRelated > div:nth-child(3) > div.content-even > div.details > div.sprice > span')
    const ele2 = $('#extraDetails > div:nth-child(3) > div.form-field')
    const path = crs.getMultiSelector(ele1, ele2)
    expect(path.length).to.equal(2)
    done()
  })

  it('should return relative path for relative selectors', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('#productsRelated > div:nth-child(3) > div.content-even > div.details > div.sprice > span')
    const ele2 = $('#productsRelated > div:nth-child(2) > div.content-even > div.details > div.sprice > span')
    const path = crs.getMultiSelector(ele1, ele2)
    expect(path.length).to.equal(1)
    done()
  })

  it('should return relative path on relative depth basis', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('#productsRelated > div:nth-child(3) > div.content-even > div.details > div.sprice > span')
    const ele2 = $('#productsRelated > div:nth-child(2) > div.content-even > div.details > div.sprice > span')
    const path = crs.getMultiSelector(ele1, ele2)
    expect(path[0]).to.equal('#productsRelated span:nth-child(5)')
    done()
  })

  it('should return unique css selector', (done) => {
    const crs = new CRS({
      ignoreFunc: {
        class: data => data.filter(item => item.indexOf('indix') < 0)
      }
    })
    const $ = cheerio.load(html)
    const ele1 = $('#price > strike')
    const path = crs.getUniqueCssSelector(ele1)
    expect(path).to.equal('#price > strike')
    done()
  })

})
