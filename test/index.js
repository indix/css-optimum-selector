import fs from 'fs';
import { expect } from 'chai';
import cheerio from 'cheerio';
import * as CRS from '../src';

const html = fs.readFileSync('./test/stub/index.html', 'utf8')

describe('Css selector test', () => {
  it('should find common parent', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field');
    const ele2 = $('div#extraDetails > div:nth-child(3) > div.form-field');
    const par = CRS.checkCommonParent(ele1, ele2);
    expect(par.attr('id')).to.be.equal('extraDetails');
    done();
  });

  it('should return correct child relation', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field');
    const relation = CRS.nthChildStr(ele1);
    expect(relation).to.be.equal('div:nth-child(2)')
    done();
  });

  it('should give path from child to parent', (done) => {
    const $ = cheerio.load(html);
    const child = $('div#extraDetails > div:nth-child(5) > div.form-field');
    const parent = $('div#extraDetails');
    const path = CRS.childToParentTraversal(child, parent);
    expect(path.length).to.be.equal(2);
    done();
  });

  it('should return relative path ', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field');
    const ele2 = $('div#extraDetails > div:nth-child(3) > div.form-field');
    const relativePath = CRS.getCommonSelector(ele1, ele2, $);
    expect(relativePath).to.be.equal('div#extraDetails * div:nth-child(2)');
    done();
  });

  it('should return have required nodes on using relative path', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#productsRelated > div:nth-child(2) > div.content-odd > div.details > div.sprice > span.myerror');
    const ele2 = $('div#productsRelated > div:nth-child(3) > div.content-odd > div.details > div.sprice > span.myerror');
    const relativePath = CRS.getCommonSelector(ele1, ele2, $);
    expect($(relativePath).length).to.be.equal(5);
    done();
  });

  it('should return false for uncommon elements', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#productsRelated > div:nth-child(2) > div.content-odd > div.details > div.sprice > span.myerror');
    const ele2 = $('div#extraDetails > div:nth-child(3) > div.form-field');
    const relativePath = CRS.getCommonSelector(ele1, ele2, $);
    expect(relativePath).to.be.equal(false);
    done();
  });
});
