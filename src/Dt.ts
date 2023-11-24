import { IUni } from "./IUni";

export class Dt {
        framebuffer: WebGLFramebuffer;
        renderbuffer: WebGLRenderbuffer;
        texture: WebGLTexture;
        textures: Array<string>;
        customUniforms: any;
        activeUniforms: Map<string,IUni>;
        getUniformLocation(key:string):WebGLUniformLocation{
                return this.activeUniforms.get(key).location;
        }   
        constructor(gl: WebGLRenderingContext, textures: string[], customUniforms: any) {
                this.textures = new Array<string>();
                this.framebuffer = gl.createFramebuffer();
                this.renderbuffer = gl.createRenderbuffer();
                this.texture = gl.createTexture();
                this.textures = textures;
                this.customUniforms = customUniforms;
                this.activeUniforms = new Map<string, IUni>();
        }
}
