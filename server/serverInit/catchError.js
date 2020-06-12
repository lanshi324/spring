export default class CatchError extends Error {
  constructor(msg, code) {
    super(msg)
    this.msg = msg
    this.status = code
  }
}
