import { DR } from "../DR";
import { IUni } from "../IUni";
import { DasSequencer } from "../sequencer/DasSequencer";
import { DOMUtils } from "./DOMUtils";


export class DRTime{
    onPlaybackChange:   (state:boolean) => void;
    onTimelineChange:   (value:number) => void;
    isPlaying: boolean;
    currentTime: number;
    renderTime: HTMLInputElement;
    constructor(public parent:HTMLElement,public seq:DasSequencer){
        this.currentTime = 0 ;
    }
    updateTimeline(time:number){
        this.renderTime.value = time.toString();
    }
    render():void{

            let html = `
            <div class="timeline">
            <input type="range" value="0" min="0" max="${this.seq.duration / 1000}" id="rendertime" list="markers" step="0.5">
            <datalist id="markers"></datalist>
            <i class="bi bi-play-btn-fill" id="toogle-playback"></i>
            </div>`;
            let result = DOMUtils.toDOM(html) as HTMLElement;
            this.parent.appendChild(result);
            const playButton = DOMUtils.get(".bi-play-btn-fill",this.parent) as HTMLButtonElement
            DOMUtils.on("click",playButton,() => {
                    this.isPlaying = !this.isPlaying;
                    console.log(this.isPlaying);
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