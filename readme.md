# demolishedRenderer

## About

demolishedRenderar is a hight performnce, easy to use multi-pass (1-n shader programs) rendering engine that supports -n textures,custom uniforms.  It's a light weight JavaScript 4k gzipped. 

## Install

    npm install demolishedrenderer


## Get started ( how to use )

### Create an instance of the renderer 

     constructor(canvas: HTMLCanvasElement, mainVertexShader: string, mainFragmentShader: string, customUniforms?: ICu);

## Methods

###  addAssets (aA)

Add assets shared, global assets that can be used 1-n buffers 

    aA(assets: any, cb: () => void): this;

### addBuffer (aB)

Create a render buffer, shader that produces a texture that can be use for output etc within main fragment.

       aB(name: string, vertex: string, fragment: string, textures?: Array<string>, customUniforms?: ICu): this;
 
 ### R(time:number)

 Render a frame based on time 

 ### run(startTime:number,fps:number)


Start a render loop at startTime, fps sets a fixed FPS


## Texture's & Custom Uniforms

Pass 1-n textures to the engines as an `Array<Itx>` , textures is shared among 1-n buffers / shader programs. When adding a buffer you need to specify with textures to use.



## Texture (ITx)

    interface ITx {
        unit: number,
        src?: any,
        fn?(currentProgram:WebGLProgram,src:any): Function
    }

### example

    let textures = [
        {
             "myTexture1": {
                unit: 33986,
                src: "/test/assets/texture.jpg"
            },
        },
        {
             "myTexture2": {
                unit: 33987,
                (gl,c) => {
                        // do stuff with your gl program texture...
                }
            },
        }

    ]


### Custom Uniform's

Bulit in uniforms are , this are updated for each frame, this also applies to customUniforms,

    uniform float time; // time
    uniform int frame; // frame number
    uniform vec2 resolution; // dimenstions of the rendering surface,target canvas.
    uniform sampler2D {bufferName}; // bufferName = the name of your buffer, contains previous frame.


### Add custom uniform(s)

    const customUniforms = {
            "fRnd": (location, currentGlProgram, mainGlProgram, renderTime) => { 

                currentGlProgram.uniform1f(location,Math.random()); 
            
            },
            ....


Custom uniforms can be passed to each buffer as well as the main program. 

## Misc

Many Thanks to Inigo Quilez for example shaders and inspiration.


Kind regards,
    Magnus 'Bagzy' Thor
