/* eslint-disable no-unused-vars*/
import fs from 'fs';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('our first test', () => {
    it('should pass', () => {
        expect(true).toEqual(true);
    });
});

// TODO: this test needs to be corrected with upgraded JSDOM

// describe('index.html', () => {
//     it('should have h1 that says users', (done) => {
//         const index = fs.readFileSync('./src/index.html', "utf-8");
//         const dom = new JSDOM(index);
//         const h1 = dom.window.document.getElementsByTagName('h1')[0];

//         expect(h1.innerHTML).toEqual("Users");
//     });
// });
