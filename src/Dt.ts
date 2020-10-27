export class Dt {
        framebuffer: WebGLFramebuffer;
        renderbuffer: WebGLRenderbuffer;
        texture: WebGLTexture;
        textures: Array<string>;
        uniforms: any;
        locations: Map<string, WebGLUniformLocation>;
        constructor(gl: WebGLRenderingContext, textures: string[], customUniforms: any) {
                this.textures = new Array<string>();
                this.locations = new Map<string, WebGLUniformLocation>();
                this.framebuffer = gl.createFramebuffer();
                this.renderbuffer = gl.createRenderbuffer();
                this.texture = gl.createTexture();
                this.textures = textures;
                this.uniforms = customUniforms;
        }
}
