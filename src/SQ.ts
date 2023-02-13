



export class SQ {

        si: any;
        end: boolean;
        s: Array<number>;
        sp!: number;
        sc!: number;
        st!: number;
        bf: Array<string>;
        cB: Array<number>;

        static sceneDuration = (d: number, sD: number) => {
                const t = (d / 441 * 2 * 10);
                return sD / t;
        };

        rB(key: string) {

                return this.bf.includes(key);
        }

        constructor(public ss: Array<any>, public L: number) {
                this.s = [0, 0, 0, 0];
        }

        b(n: number): number {
                return (this.sc >> n) & 1;
        }

        c(n: number): number {
                return Math.min(Math.max(0., n), 1.);
        }

        R(t: number, gl: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) {
                const _ = this;
                if (this.end)
                        return;

                let p = 0;
                let q = t * 1000. * 441. / 10. / (_.L * 2.); // Hmmm

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
