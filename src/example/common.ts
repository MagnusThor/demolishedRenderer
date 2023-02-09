export const common = /*wgsl*/ `

uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

#define iTime time
#define iResolution resolution

#define res resolution


float sdBox(vec3 p,vec3 b)
{
  vec3 d=abs(p)-b;
  return min(max(d.x,max(d.y,d.z)),0.)+length(max(d,0.));
}
// 	rotation
void pR(inout vec2 p,float a) 
{
	p=cos(a)*p+sin(a)*vec2(p.y,-p.x);
}
// 	3D noise function (IQ)
float noise(vec3 p)
{
	vec3 ip=floor(p);
    p-=ip; 
    vec3 s=vec3(7,157,113);
    vec4 h=vec4(0.,s.yz,s.y+s.z)+dot(ip,s);
    p=p*p*(3.-2.*p); 
    h=mix(fract(sin(h)*43758.5),fract(sin(h+s.x)*43758.5),p.x);
    h.xy=mix(h.xz,h.yw,p.y);
    return mix(h.x,h.y,p.z); 
}

`;