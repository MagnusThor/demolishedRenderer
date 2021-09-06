# demolishedRenderer

## About

demolishedRenderar is a lightweight high-performance, easy to use multi-pass (1-n shader programs/buffers) rendering engine that supports 1-n textures,custom uniforms.

DR is written mainly for a demo-scene purpose. 

## Install

    npm install demolishedrenderer

## Get started 

### Create an instance of the renderer 

     constructor(canvas: HTMLCanvasElement, mainVertexShader: string, mainFragmentShader: string, customUniforms?: ICu);

## Methods

###  addAssets (aA)

Add assets shared, global assets that can be used 1-n buffers 

    aA(assets: any, cb: () => void): DR;

### addBuffer (aB)

Create a render buffer, shader that produces a texture that can be use for output etc within main fragment.

       aB(name: string, vertex: string, fragment: string, textures?: Array<string>, customUniforms?: ICu): DR;
 
 ### R(time:number)

 Render a frame based on time 

 ### run(startTime:number,fps:number)

Start a render loop at startTime, fps sets a maximum frame rate (FPS)

### sP(key: string, state: boolean):void 

Enable or disable a buffer/program. Can be toggled during render loop.

## Texture's & Custom Uniforms

Pass 1-n textures to the engines as an `Array<Itx>` , textures is shared among 1-n buffers / shader programs. When adding a buffer you need to specify with textures to use.

       aB("myByffer,vertexShader,fragmentShader",["myTexture1","myTexture2],cU):


## Texture (ITx)

    interface ITx {
        src?: any,
        fn?(currentProgram:WebGLProgram,src:any): Function
    }

### example

    let textures = [
        {
             "myTexture1": {
               src: "/test/assets/texture.jpg"
            },
        },
        {
             "myTexture2": {
                (gl,c) => {
                        // do stuff with your gl program texture...
                }
            },
        }

    ]


### Custom Uniform's

Bulit in uniforms are , this are updated for each frame, this also applies to customUniforms,

    uniform float time; 
    uniform int frame;
    uniform int deltaTime; 
    uniform vec2 resolution;
    uniform sampler2D {bufferName}; // bufferName = the name of your buffer, contains previous frame.  ( applies to main fragment shader)


### Add custom uniform(s)

    const customUniforms = {
            "fRnd": (location, currentGlProgram, mainGlProgram, renderTime) => { 

                currentGlProgram.uniform1f(location,Math.random()); 
            
            },
            ....


Custom uniforms can be passed to each buffer as well as the main program. 


Kind regards,
    Magnus 'Bagzy' Thor
