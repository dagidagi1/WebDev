class MyRequest {
    body= {}
    userId = null
    postId = null
    constructor(body, userId) {
        this.body = body
        this.userId = userId
    }
    //cons
    static fromRestRequest(req) {
        const ret = new MyRequest(req.body, req.body.sender)
        ret.body['id'] = req.params.id
        ret.body['bySender'] = req.query.sender
        ret.body
        return ret
    }
}
export = MyRequest
