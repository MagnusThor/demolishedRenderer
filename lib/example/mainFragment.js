"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainFragment = void 0;
exports.mainFragment = `

uniform vec2 resolution;
uniform float time;

uniform float outTexture;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;


out vec4 fragColor;


#define iTime time
#define res resolution 

const float GA =2.399; 
const mat2 rot = mat2(cos(GA),sin(GA),-sin(GA),cos(GA));


vec3 dof(sampler2D tex,vec2 uv,float rad)
{
	vec3 acc=vec3(0);
    vec2 pixel=vec2(.002*res.y/res.x,.002),angle=vec2(0,rad);;
    rad=1.;
	for (int j=0;j<80;j++){  
        rad += 1./rad;
	    angle*=rot;
        vec4 col=texture(tex,uv+pixel*(rad-1.)*angle);
		acc+=col.xyz;
	}
	return acc/80.;
}

//-------------------------------------------------------------------------------------------
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{

	vec2 uv = gl_FragCoord.xy / res.xy;

	if(outTexture ==0.0){
		fragColor=vec4(dof(iChannel0,uv,texture(iChannel0,uv).w),1.);

	}else 	
	fragColor=vec4(dof(iChannel1,uv,texture(iChannel1,uv).w),1.);

}

void main(){

    mainImage(fragColor,gl_FragCoord.xy);

}`;
