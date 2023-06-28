import { DasSequencer } from "../sequencer/DasSequencer";


export class DOMUtils {
    static get<T extends HTMLElement>(query: string, parent?: Element): T {
        return parent ? parent.querySelector(query) as T : document.querySelector(query) as T
    }
    static getAll(query: string, parent?: Element): Array<Element> {
        var results = new Array<Element>();
        let queryResult = parent ? parent.querySelectorAll(query) : document.querySelectorAll(query)
        for (let i = 0; i < queryResult.length; i++) results.push(queryResult.item(i));
        return results;
    }
    static on<T extends HTMLElement>(event: string, element: string | HTMLElement, fn: (event?: any, el?: HTMLElement | any) => void, options?: AddEventListenerOptions): T {
        typeof (element) === "string" ? element = DOMUtils.get<T>(element) : element = element;
        element.addEventListener(event, (e: Event) => {
            fn(e, element);
        }, options);
        return element as T;
    }
    static removeChilds(parent):void{
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
    }

    static create<T extends HTMLElement>(p: string | T, textContent?: string, attr?: Object): T {
        let node: T;
        typeof (p) === "string" ? node = document.createElement(p) as T : node = p;
        if (textContent)
            node.textContent = textContent;
        if (attr) {
            Object.keys(attr).forEach((k: string) => {
                node.setAttribute(k, attr[k]);
            });
        }
        return node;
    }

    static prettify(text:string):string{
        let result = text.replace(/^["'](.+(?=["']$))["']$/, '$1'); // remove qoutes at start and end of string
        return result;
    }

    static linkify(text: string) {    
        text = DOMUtils.prettify(text);
        const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(regex, (url: string) => {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });
    }
    static toDOM(html: string): any {
        var d = document, i, a = d.createElement("div"), b = d.createDocumentFragment();
        a.innerHTML = html;
        while (i = a.firstChild)
            b.appendChild(i);
        return b;
    }
    static makeDraggable(el: HTMLElement) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const elementDrag = (e: any) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }
        el.onmousedown = (e: any) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = (e) => {
                document.onmouseup = null;
                document.onmousemove = null;
            };
            document.onmousemove = elementDrag;
        };
    }



}


export class DRTime{



    onPlaybackChange:   (state:boolean) => void;
    onTimelineChange:   (value:number) => void;

    isPlaying: boolean;
    currentTime: number;
    renderTime: HTMLInputElement;


    constructor(public parent:HTMLElement,public seq:DasSequencer){
        this.currentTime = 0 ;
    }

    // <i class="bi bi-pause-btn-fill"></i>


    updateTimeline(time:number){
        this.renderTime.value = time.toString();
    }

    render():void{

            let html = `
            <div class="controls">
            <input type="range" value="10" min="0" max="${this.seq.duration / 1000}" id="rendertime" list="markers">
            <datalist id="markers"></datalist>
            <i class="bi bi-play-btn-fill" id="toogle-playback"></i>
            </div>            `;

            let result = DOMUtils.toDOM(html) as HTMLElement;

            this.parent.appendChild(result);

            const playButton = DOMUtils.get(".bi-play-btn-fill",this.parent) as HTMLButtonElement

            DOMUtils.on("click",playButton,() => {
                    this.isPlaying = !this.isPlaying;
                    this.onPlaybackChange(this.isPlaying);
                    playButton.classList.toggle("bi-play-btn-fill");
                    playButton.classList.toggle("bi-pause-btn-fill");
            });


            this.renderTime = DOMUtils.get("#rendertime",this.parent) as HTMLInputElement
            
            DOMUtils.on<HTMLInputElement>("input",this.renderTime,(e) => {
                this.currentTime = parseInt(this.renderTime.value)
                this.onTimelineChange(this.currentTime);                
        });

        this.seq.scenes.forEach ( s => {
            const el = document.createElement("option");
            el.value = (s.msStart / 1000).toString();   
            DOMUtils.get("#markers").appendChild(el);   
        });
       
    }

    
}