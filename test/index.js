import fs from 'fs';
import { expect } from 'chai';
import cheerio from 'cheerio';
import * as CRS from '../src';

const html = fs.readFileSync('./test/stub/index.html', 'utf8')

describe('Css relative selector test', () => {
  it('should find common parent', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#productsRelated > div:nth-child(3) > div.content-odd > div.details > div.sprice > span.myerror');
    const ele2 = $('div#productsRelated > div:nth-child(2) > div.content-even > div.details > div.sprice > span.myerror');
    const par = CRS.checkCommonParent(ele1, ele2);
    // console.log(par.html());
    expect(par.attr('id')).to.be.equal('extraDetails');
    done();
  });

  it('should return correct child relation', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#extraDetails > div:nth-child(5) > div.form-field');
    const relation = CRS.nthChildStr(ele1);
    expect(relation).to.be.equal('div:nth-child(1)')
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
    const ele1 = $('div#productsRelated > div:nth-child(2) > div.content-odd > div.details > div.sprice > span.myerror');
    const ele2 = $('div#productsRelated > div:nth-child(2) > div.content-even > div.details > div.sprice > span.myerror');
    const relativePath = CRS.getCommonSelector(ele1, ele2, $);
    console.log(relativePath);
    expect(relativePath).to.be.equal('div#extraDetails * div:nth-child(1)');
    done();
  });

  it('should return false', (done) => {
    const $ = cheerio.load(html);
    const ele1 = $('div#productDescription > div.body > ul');
    const ele2 = $('div.body > p:nth-child(1)');
    const relativePath = CRS.cssPath(ele1, $);
    expect(relativePath).to.be.equal(false);
    done();
  });
});
