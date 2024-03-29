"use strict";
class MyResponse {
    constructor(body, userId, err) {
        this.body = {};
        this.userId = null;
        this.err = null;
        this.body = body;
        this.userId = userId;
        this.err = err;
    }
    sendRestResponse(res) {
        if (this.err == null) {
            res.status(200).send({
                'status': 'ok',
                'data': this.body
            });
        }
        else {
            res.status(this.err.code).send({
                'status': 'fail',
                'message': this.err.message
            });
        }
    }
}
module.exports = MyResponse;
//# sourceMappingURL=MyResponse.js.map