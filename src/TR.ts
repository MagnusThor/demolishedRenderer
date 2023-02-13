export interface I2D{
    key:string 
    ctx:CanvasRenderingContext2D,
    fn:(timeStamp:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D) => void;
}
export class TR{
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        layers: Map<string,I2D>
        properties:Array<number>; 
        constructor(w:number,h:number){
            this.layers = new Map<string,I2D>();
            const canvas = document.createElement("canvas");
            canvas.width = w; canvas.height = h;
            this.properties= [w,h,w /2, h / 2];
            this.ctx = canvas.getContext("2d");
            this.canvas = canvas;
        }
        data():any{
            return this.canvas.toDataURL("image/png",1.0);
        }
        D(key:string):void{
             this.layers.delete(key);   
        }
        A(key:string,fn:(timeStamp:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D) => void ):void{
            this.layers.set(key,{key:key,ctx:this.ctx,fn:fn})
        }
        R(t:number,pre?:string):TR{
            const c = this.canvas;
            const x = this.ctx
            x.clearRect(0,0,c.width,c.height);            
            if(!pre){
            this.layers.forEach ( (v) => {
                v.fn(t,c,x);
            });
            }else
                Array.from(this.layers.values()).map( (p) =>  p.fn(t,c,x));
            return this;
        } 
}