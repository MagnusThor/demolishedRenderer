export interface IE2D{
    key:string 
    animate:(timeStamp:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,props?: any) => void;
    props:any
}

export class Geometry{
    
}


export class Vector2{

    public x:number = 0;
    public y: number = 0

    constructor(x:number,y:number)
    {
        this.x = x;
        this.y = y;
    }
    
}

export class Vector3 extends Vector2{
    public z:number = 0;
    constructor(x: number, y: number, z: number) {
        super(x,y);
        this.z=z;
    }
    rotateX(a:number){
        const rad = a * Math.PI / 180;
        const cosa = Math.cos(rad);
        const sina = Math.sin(rad);
        const y = this.y * cosa - this.z * sina;
        const z = this.y * sina + this.z * cosa;
        return new Vector3(this.x,y,z);
    }

    rotateY(a:number){
        const rad = a * Math.PI / 180;
        const cosa = Math.cos(rad);
        const sina = Math.sin(rad);
        const z = this.z * cosa - this.x * sina;
        const x = this.z * sina + this.x * cosa;
        return new Vector3(x,this.y,this.z);
    }

    rotateZ(a:number){
        const rad = a * Math.PI / 180;
        const cosa = Math.cos(rad);
        const sina = Math.sin(rad);
        const x = this.x * cosa - this.y * sina;
        const y = this.x * sina + this.y * cosa;
        return new Vector3(x,y,this.z);
    }

    scale(n:number):void{
            this.x *= n;
            this.y *= n;
            this.z *= n;
    }

    clone():Vector3{
        return new Vector3(this.x,this.y,this.z);
    }

    length():number{
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize():Vector3{
       const len = this.length();
       return new Vector3( this.x /= len, this.y /= len, this.x /= len);       
    }

    dot  (vectorB:Vector3) {
        return this.x * vectorB.x + this.y * vectorB.y + this.z * vectorB.z;
    }

    angle(b:Vector3){
        const an = this.normalize();
        const bn = b.normalize();
        return Math.acos(an.dot(bn));
    }

    cross(vectorB:Vector3){
        let tmp = this.clone();
        tmp.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tmp.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tmp.z = (this.x * vectorB.y) - (this.y * vectorB.x);
    }

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
        assets: Map<string,Blob>
        constructor(w:number,h:number,ww?:number,vh?:number){
            this.entities = new Map<string,IE2D>();
            this.assets = new Map<string,Blob>();
            let canvas = document.createElement("canvas");
            canvas.width = w; canvas.height = h;
            this.ctx = canvas.getContext("2d");
            this.canvas = canvas;
        }       
        AA(key:string,blob:Blob):TR{
            this.assets.set(key,blob);
            return this;
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