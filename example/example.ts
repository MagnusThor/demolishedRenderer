import { DR } from "../src/DR";


export class Example {

    static run() {

        let player: DR;

        const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main() { 
            gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

        let fragment = `uniform float time;
        uniform vec2 resolution;
                        
        uniform float sT;
        uniform int sC; // use for controlling , cb - controllBits(n)
        uniform int sI;
        uniform float sP;
        
        uniform sampler2D iChannel0;
        uniform sampler2D iChannel1;
        uniform sampler2D iChannel2;
        
        out vec4 fragColor;    
        
        void main(){
        
            vec2 uv = (-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y;
        
            vec4 a = texture(iChannel0,uv);
            vec4 b = texture(iChannel1,uv);
            vec4 c = texture(iChannel2,uv);
            
            vec4 d = mix(b,a,0.5);
        
            fragColor = d ; //texture(iChannel2,uv);
        
        }`;




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
        let canvas = document.querySelector("#main") as HTMLCanvasElement;
        // canvas.width = innerWidth; canvas.height = innerHeight;

        const customUniforms = {
            "seqTime": (l, gl, p, t) => { // total time relative to sequence
                gl.uniform1f(l, 1);
            },
            "seqCode": (l, gl, p, t) => { // seqCode
                gl.uniform1i(l, 32784);
            },
            "sProg": (l, gl, p, t) => { // scene progress
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
            
        }, () => {
            player.aB("A", vertex, fragment, ["iChannel0","iChannel1","iChannel2"],customUniforms).run(0,60);


        });


    }

}



setTimeout(() => {

    Example.run();


    // Compress into binary. using
    // node compress.js -> outputs file output.png.html


}, 3000);