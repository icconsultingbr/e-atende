class ApiResponse {

  static ok(res, data) {
    return res.status(200).json(data);
  }

  static created(res, data) {
    return res.status(201).send(data);
  }

  static badRequest(res, data) {
    return res.status(400).json(data);
  }

  static notFound(res, data) {
    return res.status(404).json(data);
  }

  static unhoutorized(res, data) {
    return res.status(401).json(data);
  }

  static serverError(res, data) {
    return res.status(500).json(data);
  }
}

module.exports = ApiResponse
