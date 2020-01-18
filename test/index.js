import Nightmare from 'nightmare'
import assert from 'assert'

Nightmare.action('getTexts', function(selector, done){
    this.evaluate_now((selector) => {
        return [].slice.call(document.querySelectorAll(selector)).map((e) => e.innerText)
    }, done, selector)
})


describe("じゃんけんアプリ", () => {
    const nightmare = Nightmare({ show: false })
    const URL = 'http://localhost:8080/'

    it("タイトル表示", (done) => {
        nightmare
        .goto(URL)
        .evaluate(() => {
            return document.querySelector('h1').innerText
        })
        .then((title) => {
            assert.equal(title, 'じゃんけん')
        })
        done()
    })

    it("グーをクリックして対戦結果が表示される", (done) => {
        nightmare
        .goto(URL)
        .click('#btn-gu')
        .getTexts('tbody td')
        .then((texts) => {
            const [time, human, computer, judgment] = texts
            assert.equal(human, 'グー')
            assert.ok(computer.match(/^(グー|チョキ|パー)$/))
            assert.ok(judgment.match(/^(勝利|引き分け|敗北)$/))
        })
        done()
    })

    it("グーをクリックして対戦成績をクリックすると対戦成績が表示される", (done) => {
        nightmare
        .goto(URL)
        .click('#btn-gu')
        .click('#tab-status')
        .getTexts('tbody td')
        .then((texts) => {
            const [win, lose, draw] = texts.map((e) => Number(e))
            assert.ok(win >= 0 && win <=1)
            assert.ok(lose >= 0 && lose <=1)
            assert.ok(draw >= 0 && draw <=1)
            assert.equal(win + lose + draw)
        })
        done()
    })

    it("2回クリックすると2行表示される", (done) => {
        nightmare
        .goto(URL)
        .click('#btn-gu')
        .click('#btn-gu')
        .click('#tab-status')
        .getTexts('tbody td')
        .then((texts) => {
            assert.equal(texts.length, 2)
        })
        done()
    })
})