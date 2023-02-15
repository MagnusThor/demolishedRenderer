export interface IE2D{
    key:string 
    animate:(timeStamp:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,props?: any) => void;
    props:any
}
export class E2D implements IE2D{
    ctx: CanvasRenderingContext2D; 
    active: boolean = true;
    public props: Map<string, any>;
    constructor(public key:string, public animate: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
        props?: any
        ) => void)
    {   
        this.props = new Map<string,any>();
    }    
    G<T>(key):T{
        return this.props.get(key) as T;
    }
    S<T>(key,value:T):void{
        this.props.set(key,value);
    }
    extend<T>(sources: any):T{
        const O= (item: any)  => {
            return (item && typeof item === 'object' && !Array.isArray(item));
        }
       const M = (target:any, ...sources: any)  => {
            if (!sources.length) return target;
            const source = sources.shift();          
            if (O(target) && O(source)) {
              for (const key in source) {
                if (O(source[key])) {
                  if (!target[key]) Object.assign(target, { [key]: {} });
                  M(target[key], source[key]);
                } else {
                  Object.assign(target, { [key]: source[key] });
                }
              }
            }
            return M(target, ...sources);
          }        
          return M(this,sources) as T ;
    }
}
export class TR{
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        entities: Map<string,IE2D>    
        constructor(w:number,h:number,ww?:number,vh?:number){
            this.entities = new Map<string,IE2D>();
            let canvas = document.createElement("canvas");
            canvas.width = w; canvas.height = h;
            this.ctx = canvas.getContext("2d");
            this.canvas = canvas;
        }       
        data():any{
            return this.canvas.toDataURL("image/png",1.0);
        }
        G(key:string):IE2D{
            return this.entities.get(key);   
       }
        D(key:string):void{
             this.entities.delete(key);   
        }
        A(e:IE2D):void{
            this.entities.set(e.key,e);
        }
        R(t:number,pre?:string):TR{
            let c = this.canvas;
            let x = this.ctx
            x.clearRect(0,0,c.width,c.height);            
            if(!pre){
            this.entities.forEach ( (v) => {
                v.animate(t,c,x,Object.fromEntries(v.props));
            });
            }else
                Array.from(this.entities.values()).map( (p) =>  p.animate(t,c,x,Object.fromEntries(p.props)),
                );
            return this;
        } 
}