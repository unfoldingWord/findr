import fnr from '.';
import * as F from 'fast-check'
import {nonSubStringOf} from './nonSubStringOf'
import {reflectedString} from './ReflectedString'
import legacyGoldMasterData from './legacyGoldMaster.json'

/**
  @description perform Goldmaster testing

  Gold-master testing is a way to test an API to ensure that
  it is fully backwards compatible with older versions of the API.

  In short here's how it works.
    0. start with the old API (in ourcase this will be the `fnr` function
    _before_ the refactor since that's the  API who's version we want to
    preserve)
    1. generate a large enough random set of inputs and pass them into
    the API.
    2. Record each pair of input/output (this is what the legacyGoldMaster.json
    file is for)
    3. Whenever the API is updated (aka, we refactor the `fnr` function) apply
    all of the inputs to the API and ensure the outputs didn't change.
  @see https://en.wikipedia.org/wiki/Characterization_test
*/
describe('gold-master', () =>
  test.each
    (legacyGoldMasterData.map(({param, result}) => [param, result]))
    ('gold master test on: (%j)', (param : any, result) => { expect(fnr(param)).toEqual(result) })
)

describe('fnrText', () => {

  /**
    @todo CHRIS:
      The only familiarity I have with type/property-based testing is what
      you have shown me.
      Maybe some kind of summary on how it works would be helpful?
  */
  it('searching for empty text should give back the original text and an empty list of results', () => {
    F.assert(F.property(F.string(), (source) => {

      const searchResults = fnr({source, target: ""})
      const replaceText = searchResults.replaced
      const resultsLength = searchResults.results.length

      return resultsLength === 0 && replaceText === source
    }))
  })


  it('for any word (w) in a string a case sensitive search for (w) with a different case should give no results', () => {
    F.assert(F.property(reflectedString(), ([upperTarget, lowerTarget]) => {
      const searchResults = fnr({source: `${upperTarget}`, target: lowerTarget, config: {isCaseMatched: true}})
      return searchResults.results.length === 0
    }))
  })


  it('for any word (w) in a string a non case sensitive search for (w) with a different case should give results', () => {
    F.assert(F.property(reflectedString(), ([upperTarget, lowerTarget]) => {
      const searchResults = fnr({source: `${upperTarget}`, target: lowerTarget, config: {isCaseMatched: false}})
      return searchResults.results.length > 0
    }))
  })

  /**
    @todo
      there is a bug in fnr where searching for "" in "" gives no results.
  */
  it('searching for text that is identical to the source text should give back the source text as a single result', () => {
    F.assert(F.property(F.string({minLength: 1}), (source) => {
      const searchResults = fnr({source, target: source})
      return searchResults.results.length === 1
    }))
  })

  const stringWithNWordOccurance : F.Arbitrary<{fnrSearch : {target: string, source: string}, n : number}> =
    F.string({minLength: 1}).chain(target =>
    F.array(nonSubStringOf(target, 5)).map(s =>
      ({fnrSearch :
        { source: s.reduce((a,b) => `${a}${b}${target}`,'')
        , target
        }
      , n: s.length
      })
    ))

  it('searching for a word that exists n times within a source text should give back a n results', () => {
    F.assert(F.property(stringWithNWordOccurance, ({fnrSearch, n}) =>
     fnr(fnrSearch).results.length === n
    ))
  })

  const contextSizedSearch =
    F.integer({min: 1, max: 100}).chain(ctxLen =>
    F.string({minLength: 1}).chain(target =>
    nonSubStringOf(target, ctxLen).map(source =>
      ({ source
      , target
      , config: { ctxLen }
      })
    )))

  it('searching for a word with a context of size n should produce results with a context of size n for reach result', () => {
    F.assert(F.property(contextSizedSearch, ({source, target, config}) =>
      fnr({source: `${source}${target}${source}`, target, config}).results.every(s =>
        s.context.after.length === config.ctxLen
        && s.context.before.length === config.ctxLen)
    ))
  })

  /**
    @todo
    Currently this test is not the case for findr (see issue #30).

    I'm disabling these tests but they need to be included in future
    tests.
    - Noah Harvey 08-2023
  */
  it.skip('for any given search: replacing with empty text should delete the search results from the source text', () => {
    F.assert(F.property(F.string(), F.string(), (source_, target) => {
      const source = `${source_}${target}`
      const fnrResults = fnr({source, target, replacement: ""})

      return fnrResults.replaced === source_
    }))
  })

  it.skip('for any given search with n results: replace with a word should have at least n occurrences of that word in the result text.', () => {
    F.assert(F.property(stringWithNWordOccurance, F.string({minLength: 1}), ({fnrSearch: {source, target}, n}, replacement) => {
      const fnrResults = fnr({source, target, replacement})

      return fnrResults.results.length >= n
        && fnrResults.replaced === source.replace(target, replacement)
    }))
  })

});


