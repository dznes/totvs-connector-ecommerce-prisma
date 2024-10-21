export class CodeAlreadyExistsError extends Error {
  constructor() {
    super('Code already exists in TOTVS.')
  }
}
