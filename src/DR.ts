
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

        /**
         * Create a Shader
         *
         * @param {WebGLProgram} program
         * @param {number} type
         * @param {string} source
         * @memberof DR
         */
        cS(program: WebGLProgram, type: number, source: string): void {
                let gl= this.gl;
                let shader = gl.createShader(type) as WebGLShader;
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                gl.attachShader(program, shader);
                // if (!this.gl.getShaderParameter(shader, 35713)) { // this.gl.COMPILE_STATUS
                //         this.gl.getShaderInfoLog(shader).trim().split("\n").forEach((l: string) =>
                //                 console.error("[shader] " + l))
                //         throw new Error("Error while compiling vertex/fragment" + source)
                // };
        }

        /**
         * Create and a a WebGLProgram
         *
         * @param {string} name
         * @returns {WebGLProgram}
         * @memberof DR
         */
        aP(name: string): WebGLProgram {
                let p = this.gl.createProgram();
                this.programs.set(name, p);
                return p;
        }
        
        /**
         *  Create a new WEBGLTexture
         *
         * @param {*} image
         * @returns
         * @memberof DR
         */
        t(image:any){
                let gl = this.gl;
                let texture = gl.createTexture();
                gl.bindTexture(3553, texture);
                gl.texImage2D(3553, 0, 6408, 6408, 5121,image);
                gl.generateMipmap(3553);
                return texture;	  
              
                
        }

        /**
         * add assets ( textures )
         *
         * @param {*} textures
         * @param {()=>void} cb
         * @memberof DR
         */
        aA(textures: any,cb:()=>void): void {
                let c = Object.keys(textures).length;
                Object.keys(textures).forEach((key: string) => {
                        const m = new Image();
                        m.onload = (e) => {
                                this.textureCache.set(key, this.t(m));
                                if(this.textureCache.size === c) cb();
                        }
                        m.src = textures[key].src;
                });
        }
        /**
         * Create a new Buffer 
         *
         * @param {string} name
         * @param {string} vertex
         * @param {string} fragment
         * @param {Array<string>} [textures]
         * @returns {this}
         * @memberof DR
         */
        aB(name: string, vertex: string, fragment: string, textures?: Array<string>): this {
                let gl = this.gl;
                let target = this.cT(this.canvas.width, this.canvas.height, textures ? textures : []);
                this.targets.set(name, target);

                let program = this.aP(name);
                this.cS(program, 35633, this.header + vertex);
                this.cS(program, 35632, this.header + fragment);
                gl.linkProgram(program);
                //gl.validateProgram(program);
                // if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                //         var info = gl.getProgramInfoLog(program);
                //         throw 'Could not compile WebGL program. \n\n' + info;
                // }

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

        /**
         * Render loop
         *
         * @param {number} time
         * @memberof DR
         */
        R(time: number) {

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
                                gl.activeTexture(33984 + i);	                
                                gl.uniform1i(loc, i);
                                i++;
                        });


                        gl.bindBuffer(34962, this.surfaceBuffer);
                        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);

                        gl.bindBuffer(34962, this.buffer);
                        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
                    
                        gl.bindFramebuffer(36160, target.framebuffer);

                        gl.clear(16384 | 256);
                        gl.drawArrays(4, 0, 6);


                });
                // Render front buffer to screen
                gl.useProgram(main);
                gl.uniform2f(gl.getUniformLocation(main, "resolution"), this.canvas.width, this.canvas.height);
                gl.uniform1f(gl.getUniformLocation(main, "time"), time);
                gl.bindBuffer(34962, this.buffer);
                gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);

                this.targets.forEach((target: any, key: string) => {
                        gl.uniform1i(gl.getUniformLocation(main, key), i);
                        gl.activeTexture(33984 + i);
                        gl.bindTexture(3553, target.texture);
                        i++;
                });
                gl.bindFramebuffer(36160, null);
                gl.clear(16384 |256);
                gl.drawArrays(4, 0, 6);
        }

        /**
         * Create render target
         *
         * @param {number} width
         * @param {number} height
         * @param {Array<string>} textures
         * @returns {*}
         * @memberof DR
         */
        cT(width: number, height: number, textures: Array<string>): any {
                let gl = this.gl;
                var t = {
                        "framebuffer": gl.createFramebuffer(),
                        "renderbuffer": gl.createRenderbuffer(),
                        "texture": gl.createTexture(),
                        "textures": textures
                };
                gl.bindTexture(3553, t.texture);
                gl.texImage2D(3553, 0, 6408, width, height, 0, 6408,5121, null);

                gl.texParameteri(3553, 10242, 33071);
                gl.texParameteri(3553, 10243, 33071);

                gl.texParameteri(3553, 10240,9728);
                gl.texParameteri(3553, 10241,9728);

                gl.bindFramebuffer(36160, t.framebuffer);
                gl.framebufferTexture2D(36160, 36064, 3553, t.texture, 0);
                gl.bindRenderbuffer(36161, t.renderbuffer);

                gl.renderbufferStorage(36161, 33189, width, height);
                gl.framebufferRenderbuffer(36160, 36096, 36161, t.renderbuffer);
             
                gl.bindTexture(3553, null);
                gl.bindRenderbuffer(36161, null);
                gl.bindFramebuffer(36160, null);

                return t;

        }

        run(t?:number):this{
                let fps = 60;
                let pt:number = performance.now();
                let interval = 1000/fps;
                let dt = 0;
                const a = (t: number) => {
                        requestAnimationFrame(a);
                        dt = t - pt;
                        if(dt > interval){
                                pt = t - (dt % interval);
                                this.R(pt / 1000);
                        }                           
                };
                a(t | 0 );
                return this;
        }

        constructor(public canvas: HTMLCanvasElement, v: string, f: string) {

                this.targets = new Map<string, any>();
                this.programs = new Map<string, WebGLProgram>();
                this.textureCache = new Map<string, any>();

                this.gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true }) as WebGLRenderingContext;
                let gl = this.gl;

                var c = 0,d:any; for (var i in gl) "function" == typeof gl[i] && (d = (c++ & 255).toString(16), d = d.match(/^[0-9].*$/) ? "x" + d : d, gl[d] = gl[i]);

                gl.viewport(0, 0, canvas.width, canvas.height);

            
                this.buffer = gl.createBuffer();
                this.surfaceBuffer = gl.createBuffer();

                this.mainProgram = gl.createProgram();

                this.cS(this.mainProgram, 35633, this.header + v);
                this.cS(this.mainProgram, 35632, this.header + f);

                gl.linkProgram(this.mainProgram);
                //this.gl.validateProgram(this.mainProgram);
                // if (!gl.getProgramParameter(this.mainProgram, gl.LINK_STATUS)) {
                //         var info = gl.getProgramInfoLog(this.mainProgram);
                //         throw 'Could not compile WebGL program. \n\n' + info;
                // }
                
                gl.useProgram(this.mainProgram);
                this.screenVertexPosition = gl.getAttribLocation(this.mainProgram, "pos");
                gl.enableVertexAttribArray(this.screenVertexPosition);
        
                gl.bindBuffer(34962, this.buffer);
                gl.bufferData(34962, new Float32Array([- 1.0, - 1.0, 1.0, - 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0]), 35044);
        }


        


}
