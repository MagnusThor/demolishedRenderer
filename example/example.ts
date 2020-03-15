import { DR } from "../src/DR";
import { TextureGen,CanvasTextureGen } from 'demolishedtexture';


export class Example {

    static run() {

        let player: DR;

                // main
                let mainVertex = `layout(location = 0) in vec2 pos; 
                out vec4 fragColor;                
                void main() { 
                    gl_Position = vec4(pos.xy,0.0,1.0);
                }`;
        
                let mainFragment = `uniform vec2 resolution;
                        uniform sampler2D A;
                       // uniform sampler2D B;                
                        out vec4 fragColor;
                        void main(){
                            vec2 uv = gl_FragCoord.xy/resolution.xy;
                            
                            fragColor = texture(A, uv);
                        }`;
        

        const bufferVertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main() { 
            gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

        let bufferFragment = `uniform float time;
        uniform vec2 resolution;
                        
        uniform float sT;
        uniform int sC; // use for controlling , cb - controllBits(n)
        uniform int sI;
        uniform float sP;
        
        uniform sampler2D iChannel0;
        uniform sampler2D iChannel1;
        uniform sampler2D iChannel2;
        uniform sampler2D iChannel3;

        out vec4 fragColor;    
        
        void main(){
        
            vec2 uv = (-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y;
        
            vec4 a = texture(iChannel0,uv);
            vec4 b = texture(iChannel1,uv);
            vec4 c = texture(iChannel2,uv);
            uv.y =   1.0 - uv.y;
            vec4 d = texture(iChannel3,uv);
            
            vec4 e = mix(a,d,0.2);
        
            fragColor = e ; //texture(iChannel2,uv);
        
        }`;



        let canvas = document.querySelector("#main") as HTMLCanvasElement;
        // canvas.width = innerWidth; canvas.height = innerHeight;

        // custom unifoms for buffer
        const customUniforms = {
            "seqTime": (l, gl, p, t) => { 
                gl.uniform1f(l, 1);
            },
            "seqCode": (l, gl, p, t) => { 
                gl.uniform1i(l, 32784);
            },
            "sProg": (l, gl, p, t) => { 
                gl.uniform1f(l, 0.05);
            },
        };

        player = new DR(canvas, mainVertex, mainFragment);

        // add textures to textureCache, create buffers -> passed as textures to main (mainVertex,mainFragment)
        player.aA({
            iChannel0: {
                src: "assets/iChannel0.png"
            },
            iChannel1: {
                src: 'assets/iChannel1.png'
            },
            iChannel2: {
                src: "assets/iChannel2.jpg"
            },
            iChannel3: {   // an animated texture 
                src: null,
                fn: (gl:WebGLRenderingContext,texture:WebGLTexture) =>{           
                  let t = CanvasTextureGen.G(512, 512, function (ctx, w, h) {
                        var c = "#ffffff";
                        ctx.fillStyle = c
                        ctx.strokeStyle = c;
                        ctx.lineWidth = 10;
                        ctx.strokeRect(20, 20, 512 - 40, 512 - 40);
                        ctx.stroke();
                        ctx.font = "120px 'Arial'";
                        ctx.fillText("FRUIT", 80, 160);
                        ctx.fillText("LOOM", 80, 430);
                        ctx.font = "100px 'Arial'";
                        ctx.fillText("OF the", 100, 280);
                        return ctx;
                    });
                  
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t.ctx.canvas);                 
                    // gl.generateMipmap(3553);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                }
            }
            
        }, () => {
            player.aB("A", bufferVertex, bufferFragment, ["iChannel0","iChannel1","iChannel2","iChannel3"],customUniforms).run(0,60);
        });
    }
}

setTimeout(() => {
    Example.run();
}, 3000);