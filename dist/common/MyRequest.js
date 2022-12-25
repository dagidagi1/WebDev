"use strict";
class MyRequest {
    constructor(body, userId) {
        this.body = {};
        this.userId = null;
        this.postId = null;
        this.body = body;
        this.userId = userId;
    }
    //cons
    static fromRestRequest(req) {
        const ret = new MyRequest(req.body, req.body.sender);
        ret.body['id'] = req.params.id;
        ret.body['bySender'] = req.query.sender;
        return ret;
    }
}
module.exports = MyRequest;
//# sourceMappingURL=MyRequest.js.map