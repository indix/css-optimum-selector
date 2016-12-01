import fs from 'fs'
import { expect } from 'chai'
import cheerio from 'cheerio'
import CRS from '../src'
import defaultOption from './default'

const html = fs.readFileSync('./test/stub/index.html', 'utf8')

describe('CSS-Optimum-Selector', () => {
  xit('should return elements tag, id, class etc...', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList(ele1)
    expect(checkList.tag[0]).to.equal('div')
    expect(checkList.class[0]).to.equal('form-field')
    done()
  })

  xit('should return filtered data for values in ignore field', (done) => {
    const crs = new CRS(defaultOption)
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList(ele1)
    expect(checkList.class[0]).to.equal('form-field')
    const filteredCheckList = crs.getFilteredCheckList(checkList)
    done();
  })

  xit('should return filtered data for values in ignore field', (done) => {
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

  xit('should return array of attr in priority basis', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field')
    const checkList = crs.getCheckList($(ele1))
    const filteredCheckList = crs.getFilteredCheckList(checkList)
    const priorityArray = crs.formPriorityArray(filteredCheckList)
    expect(priorityArray.length).to.equal(2)
    done();
  })

  xit('should check whether the node is unique to parent', (done) => {
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

  it('should check whether the node is unique to parent', (done) => {
    const crs = new CRS()
    const $ = cheerio.load(html)
    //#productsRelated > div:nth-child(2) > div.content-odd > div.details > div.sprice
    const ele1 = $('#productsRelated')
    const path = crs.cssPath(ele1, $)
    console.log(path);
    done()
  })
})
