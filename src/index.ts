
export class DR {

        gl: WebGLRenderingContext;
        mainProgram: WebGLProgram;
        targets: Map<string, any>
        programs: Map<string, WebGLProgram>;
        surfaceBuffer: WebGLBuffer;
        buffer: WebGLBuffer;
        vertexPosition: number;
        screenVertexPosition: number;
        header: string = `#version 300 es
        #ifdef GL_ES
                precision highp float;
                precision highp int;
                precision mediump sampler3D;
        #endif
        `;
        textureCache: Map<string, any>;

        createShader(program: WebGLProgram, type: number, source: string): void {
                let shader = this.gl.createShader(type) as WebGLShader;
                this.gl.shaderSource(shader, source);
                this.gl.compileShader(shader);
                this.gl.attachShader(program, shader);
                if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                        this.gl.getShaderInfoLog(shader).trim().split("\n").forEach((l: string) =>
                                console.error("[shader] " + l))
                        throw new Error("Error while compiling vertex/fragment" + source)
                };
        }
        addProgram(name: string): WebGLProgram {
                let p = this.gl.createProgram();
                this.programs.set(name, p);
                return p;
        }
        
        ct(image:any){
                let gl = this.gl;
                let texture = gl.createTexture();
                gl.bindTexture(3553, texture);
                gl.texImage2D(3553, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,image);
                gl.generateMipmap(3553);
                return texture;	  
                //gl.texImage2D()                         }
               // gl.texImage2D(3553, 0, 6408, 512, 512, false, 6408, 5121,image);	
                
                // gl.bindTexture(gl.TEXTURE_2D, texture);
                // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                // gl.generateMipmap(gl.TEXTURE_2D);
                // gl.bindTexture(gl.TEXTURE_2D, null);
                
        }

        addAssets(textures: any,cb:()=>void): void {
                let c = Object.keys(textures).length;
                Object.keys(textures).forEach((key: string) => {
                        const m = new Image();
                        m.onload = (e) => {
                                this.textureCache.set(key, this.ct(m));
                                if(this.textureCache.size === c) cb();
                        }
                        m.src = textures[key].src;
                });
        }
        addBuffer(name: string, vertex: string, fragment: string, textures?: Array<string>): this {
                let gl = this.gl;
                let target = this.createTarget(this.canvas.width, this.canvas.height, textures ? textures : []);
                this.targets.set(name, target);

                let program = this.addProgram(name);
                this.createShader(program, gl.VERTEX_SHADER, this.header + vertex);
                this.createShader(program, gl.FRAGMENT_SHADER, this.header + fragment);

                gl.linkProgram(program);
                gl.validateProgram(program);


                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        var info = gl.getProgramInfoLog(program);
                        throw 'Could not compile WebGL program. \n\n' + info;
                }

                gl.useProgram(program);


                if (textures) {
                        textures.forEach((tk: string) => {
                                let m = this.textureCache.get(tk);
                                gl.bindTexture(3553, m);
                                
                        });                      
                }
                this.vertexPosition = gl.getAttribLocation(program, "pos");
                gl.enableVertexAttribArray(this.vertexPosition);
                return this;
        }

        render(time: number) {

                let gl = this.gl;
                let main = this.mainProgram;
                let i = 0;
                this.programs.forEach((current: WebGLProgram, key: string) => {

                        gl.useProgram(current);

                        let target = this.targets.get(key);

                        gl.uniform2f(gl.getUniformLocation(current, "resolution"), this.canvas.width, this.canvas.height);
                        gl.uniform1f(gl.getUniformLocation(current, "time"), time);

                        target.textures.forEach((tk: string) => {
                                let loc = gl.getUniformLocation(current, tk);
                                gl.activeTexture(gl.TEXTURE0 + i);	                
                                gl.uniform1i(loc, i);
                                i++;
                        });


                        gl.bindBuffer(gl.ARRAY_BUFFER, this.surfaceBuffer);
                        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

                        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
                    
                        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);

                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                        gl.drawArrays(gl.TRIANGLES, 0, 6);


                });
                // Render front buffer to screen
                gl.useProgram(main);
                gl.uniform2f(gl.getUniformLocation(main, "resolution"), this.canvas.width, this.canvas.height);
                gl.uniform1f(gl.getUniformLocation(main, "time"), time);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

                this.targets.forEach((target: any, key: string) => {
                        gl.uniform1i(gl.getUniformLocation(main, key), i);
                        gl.activeTexture(gl.TEXTURE0 + i);
                        gl.bindTexture(gl.TEXTURE_2D, target.texture);
                        i++;
                });
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        createTarget(width: number, height: number, textures: Array<string>): any {
                let gl = this.gl;
                var t = {
                        "framebuffer": gl.createFramebuffer(),
                        "renderbuffer": gl.createRenderbuffer(),
                        "texture": gl.createTexture(),
                        "textures": textures
                };
                gl.bindTexture(gl.TEXTURE_2D, t.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                gl.bindFramebuffer(gl.FRAMEBUFFER, t.framebuffer);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t.texture, 0);
                gl.bindRenderbuffer(gl.RENDERBUFFER, t.renderbuffer);

                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, t.renderbuffer);
             
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);

                return t;

        }

        constructor(public canvas: HTMLCanvasElement, v: string, f: string) {

                this.targets = new Map<string, any>();
                this.programs = new Map<string, WebGLProgram>();
                this.textureCache = new Map<string, any>();

                this.gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true }) as WebGLRenderingContext;

                this.gl.viewport(0, 0, canvas.width, canvas.height);

                let gl = this.gl;

                this.buffer = gl.createBuffer();
                this.surfaceBuffer = gl.createBuffer();

                this.mainProgram = gl.createProgram();

                this.createShader(this.mainProgram, this.gl.VERTEX_SHADER, this.header + v);
                this.createShader(this.mainProgram, this.gl.FRAGMENT_SHADER, this.header + f);

                this.gl.linkProgram(this.mainProgram);
                this.gl.validateProgram(this.mainProgram);

                if (!gl.getProgramParameter(this.mainProgram, gl.LINK_STATUS)) {
                        var info = gl.getProgramInfoLog(this.mainProgram);
                        throw 'Could not compile WebGL program. \n\n' + info;
                }
                
                this.gl.useProgram(this.mainProgram);
                this.screenVertexPosition = gl.getAttribLocation(this.mainProgram, "pos");
                gl.enableVertexAttribArray(this.screenVertexPosition);
        
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([- 1.0, - 1.0, 1.0, - 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0]), gl.STATIC_DRAW);
        }
}
