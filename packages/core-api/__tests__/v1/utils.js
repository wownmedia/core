'use strict'

const axios = require('axios')

class Helpers {
  request (method, path, params = {}) {
    const url = `http://localhost:4003/api/${path}`
    const headers = { 'API-Version': 1 }
    const request = axios[method.toLowerCase()]

    return ['GET', 'DELETE'].includes(method)
      ? request(url, { params, headers })
      : request(url, params, { headers })
  }

  expectJson (response) {
    expect(response.data).toBeObject()
  }

  expectStatus (response, code) {
    expect(response.status).toBe(code)
  }

  assertVersion (response, version) {
    expect(response.headers).toBeObject()
    expect(response.headers).toHaveProperty('api-version', version)
  }

  expectState (response, state) {
    expect(response.data).toHaveProperty('success', state)
  }

  expectSuccessful (response) {
    this.expectStatus(response, 200)
    this.expectJson(response)
    this.expectState(response, true)
    this.assertVersion(response, '1')
  }

  expectError (response) {
    this.expectStatus(response, 200)
    this.expectJson(response)
    this.expectState(response, false)
    this.assertVersion(response, '1')
  }

  expectDelegate (delegate, expected) {
    expect(delegate).toBeObject()
    expect(delegate.username).toBeString()
    expect(delegate.address).toBeString()
    expect(delegate.publicKey).toBeString()
    expect(delegate.votes).toBeNumber()
    expect(delegate.rate).toBeNumber()
    expect(delegate.missedblocks).toBeNumber()
    expect(delegate.producedblocks).toBeNumber()
    expect(delegate.approval).toBeString()
    expect(delegate.productivity).toBeString()

    Object.keys(expected || {}).forEach(attr => {
      expect(delegate[attr]).toBe(expected[attr])
    })
  }

  expectWallet (response) {
    expect(response).toHaveProperty('username')
    expect(response).toHaveProperty('address')
    expect(response).toHaveProperty('publicKey')
    expect(response).toHaveProperty('balance')
  }
}

/**
 * @type {Helpers}
 */
module.exports = new Helpers()
