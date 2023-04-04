"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQ = void 0;
class SQ {
    rB(key) {
        return this.bf.includes(key);
    }
    constructor(ss, L, bpm, tpb) {
        this.ss = ss;
        this.L = L;
        this.bpm = bpm;
        this.tpb = tpb;
        this.min = 1000 * 60;
        this.sec = 1000;
        this.s = [0, 0, 0, 0];
        this.msBpm = (this.min / bpm);
        this.msTpb = this.msBpm / tpb;
    }
    b(n) {
        return (this.sc >> n) & 1;
    }
    c(n) {
        return Math.min(Math.max(0., n), 1.);
    }
    R(t, gl, u) {
        const _ = this;
        if (this.end)
            return;
        let p = 0;
        let q = t * 1000. * 441. / 10. / (_.L * 2.);
        while (_.ss[p][0] < 255 && q >= _.ss[p][0])
            q -= _.ss[p++][0];
        _.s = _.ss[p];
        _.sc = _.ss[p][1];
        _.si = _.ss[p][2];
        _.sp = _.c(q / _.ss[p][0]);
        _.st = q;
        _.bf = _.ss[p][3];
        gl.uniform1f(u.get("sT"), _.st);
        gl.uniform1f(u.get("sC"), _.sc);
        gl.uniform1f(u.get("sP"), _.sp);
        gl.uniform1f(u.get("sI"), _.si);
        if (_.s[0] === 255)
            _.end = true;
    }
}
SQ.sceneDuration = (d, sD) => {
    const t = (d / 441 * 2 * 10);
    return sD / t;
};
exports.SQ = SQ;
