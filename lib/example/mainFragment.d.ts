export declare const mainFragment = "\nuniform vec2 resolution;\nuniform float time;\n\nuniform float sI;\n\nuniform sampler2D iChannel0;\nuniform sampler2D iChannel1;\nuniform sampler2D iChannel2;\nuniform sampler2D iChannel3;\nuniform sampler2D iChannel4;\n\n\nuniform sampler2D[5] channels;\n\n\nout vec4 fragColor;\n\n#define iTime time\n#define res resolution \n\nconst float GA =2.399; \nconst mat2 rot = mat2(cos(GA),sin(GA),-sin(GA),cos(GA));\n\n\nvec3 dof(sampler2D tex,vec2 uv,float rad)\n{\n\t\n\tvec3 acc=vec3(0);\n    vec2 pixel=vec2(.002*res.y/res.x,.002),angle=vec2(0,rad);;\n    rad=1.;\n\tfor (int j=0;j<80;j++){  \n        rad += 1./rad;\n\t    angle*=rot;\n        vec4 col=texture(tex,uv+pixel*(rad-1.)*angle);\n\t\tacc+=col.xyz;\n\t}\n\treturn acc/80.;\n}\n\n//-------------------------------------------------------------------------------------------\nvoid mainImage(out vec4 fragColor,in vec2 fragCoord)\n{\n\n\tvec4 color = vec4(vec3(0.),1.);\n\n\tvec2 uv = gl_FragCoord.xy / res.xy;\n\n\tfloat blend,blend2,multi1,multi2;\n\t\n    blend=min (3. *abs(sin((.1*iTime)*3.1415/3.0)),1.); \n\n    blend2=min(2.5*abs(sin((.1*iTime)*3.1415/3.0)),1.); \n    \n    multi1=((fract(uv.x*6.-4.*uv.y*(1.-blend2))< 0.5 || uv.y<blend) \n    &&(fract(uv.x*6.-4.*uv.y*(1.-blend2))>=0.5 || uv.y>1.-blend))?1.:0.;\n\n \tmulti2=(fract(uv.x*12.-0.05-8.*uv.y*(1.-blend2))>0.9)?blend2:1.;\n   \n    uv.y=(fract(uv.x*6.-4.*uv.y*(1.-blend2))<0.5)?uv.y-(1.-blend):uv.y+=(1.-blend);\n\t\n\tif(sI ==0.0){\n\t\t//color = texture(iChannel0,uv);\n\t\tcolor=vec4(dof(iChannel0,uv,texture(iChannel0,uv).w),1.);\n\t}else if(sI == 1.0){\n\t\tcolor = texture(iChannel1,uv);\n\t}\n\t\n\telse{\n\t\tcolor = texture(iChannel2,uv);\n\t\t//color=vec4(dof(iChannel1,uv,texture(iChannel1,uv).w),1.);\n\t}\n\t\n\tfragColor = color; //multi1*multi2*blend2;\n\t\n}\n\nvoid main(){\n\n    mainImage(fragColor,gl_FragCoord.xy);\n\n}";
//# sourceMappingURL=mainFragment.d.ts.map