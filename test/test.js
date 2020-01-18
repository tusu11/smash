import assert from 'assert'
import Jyanken from '../src/components/Jyanken'

describe('Jyanken Class', () => {
    const jyanken = new Jyanken()

    describe("勝敗", () => {
        describe("CPUがグーの場合", () => {
            it("人間がグーで引き分け", () => {
                jyanken.pon(0, 0)
                assert.equal(jyanken.getScores()[0].judgement, 0)
            })
            it("人間がチョキで負け", () => {
                jyanken.pon(1, 0)
                assert.equal(jyanken.getScores()[0].judgement, 2)
            })
            it("人間がパーで勝ち", () => {
                jyanken.pon(2, 0)
                assert.equal(jyanken.getScores()[0].judgement, 1)
            })
        })
        describe("CPUがチョキの場合", () => {
            it("人間がグーで勝ち", () => {
                jyanken.pon(0, 1)
                assert.equal(jyanken.getScores()[0].judgement, 1)
            })
            it("人間がチョキで引き分け", () => {
                jyanken.pon(1, 1)
                assert.equal(jyanken.getScores()[0].judgement, 0)
            })
            it("人間がパーで負け", () => {
                jyanken.pon(2, 1)
                assert.equal(jyanken.getScores()[0].judgement, 2)
            })
        })
        describe("CPUがパーの場合", () => {
            it("人間がグーで負け", () => {
                jyanken.pon(0, 2)
                assert.equal(jyanken.getScores()[0].judgement, 2)
            })
            it("人間がチョキで勝ち", () => {
                jyanken.pon(1, 2)
                assert.equal(jyanken.getScores()[0].judgement, 1)
            })
            it("人間がパーで引き分け", () => {
                jyanken.pon(2, 2)
                assert.equal(jyanken.getScores()[0].judgement, 0)
            })
        })
    })
})