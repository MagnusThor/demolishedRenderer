"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferAFragment = void 0;
exports.bufferAFragment = `


uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

#define iTime time
#define iResolution resolution

#define V vec3//
#define S .1*sin(q.x+sin(q.z))

mat2 m = mat2(8, 6, -6, 8);
float h, s, t, x, p, d, v;
V q, z, w, U;
#define g(p)(q=p,h=abs(S),q.xz*=m*.1,h+S)
float n(V p) {
    for(p *= .1, s = .08, t = .9; (s /= .4) < 4e2; p += t) t -= g(p) / s, p.xz *= m * .21;
    return 3. - exp(t);
}//
void mainImage(out vec4 O, vec2 u) {
    U = V(u, 0) / iResolution - 1.;
    for(d = p = x = 0.; d++ < 2e2 && p / 5e3 <= x;) z = V(0, -8. * g(V(0, 0, v = iTime * .2)), v / .1) + p * normalize(U - V(sin(v), U.y * .7 - .1, -3)), p += x = z.y + n(z);
    O.rgb = d / 5e2 + .1 + .1 * log(p) - dot(V(w.z = .01), normalize(V(n(z - w.zyx), x = n(z), n(z - w) - n(z.zyx * 11.) / 5e2) - x)) * n(z.zyx * 6.) * V(5, 10, 15);
}


void main(){

    mainImage(fragColor,gl_FragCoord.xy);

}`;
