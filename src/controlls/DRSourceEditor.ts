import { DOMUtils } from "./DOMUtils";

import * as CodeMirror from 'codemirror'

import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/wrap/hardwrap';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/display/rulers';
import 'codemirror/addon/display/panel';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/display/autorefresh'
import 'codemirror/keymap/sublime';
import { IBuf } from "../IBuf";


export class ShaderError {
  line: number;
  error: string;
  constructor(line: number, error: string) {
      this.line = line;
      this.error = error;
  }
}

export class DRSourceEditor {
  fragmentEditor: any;  
  onBuild: (s:string) => void;
  onSave: (s:string) => void;
  onSelectShader : (e:Event) => void
  nameOfShader: string  
  update(buffer: IBuf) {
    this.fragmentEditor.getDoc().setValue(buffer.fragment);   
    this.fragmentEditor.refresh(); 
    this.nameOfShader = buffer.name;
  }

  markErrors(shaderErrors:Array<ShaderError>){
    shaderErrors.forEach((err: ShaderError) => {
      let errNode = DOMUtils.create("abbr");
      errNode.classList.add("error-info");
      errNode.title = err.error;
      this.fragmentEditor.setGutterMarker(err.line - 1, "note-gutter", errNode);
  });    
  }

  constructor(public parent: HTMLElement,private listOfShaders:Array<string>) {
  }

  private toOptions(){
     let p = '';
      this.listOfShaders.forEach( i => {
          p += `<option value="${i}">${i}</option>`
      });
      return p;
  }

  render(): void {

    let html = `<div class="modal fade" id="mod-source" data-backdrop="false" >
      <div class="modal-dialog modal-fullscreen">
      
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Fragment source</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
           
              <form id="editor-fragment">
                  <textarea id="fragment" col="10" rows="10">
                  </textarea>
              </form>
             
            </div>
            <div class="modal-footer justify-content-between">
              
            <div class="mr-auto">
            Errors <span class="badge text-bg-secondary mx-4">0</span>
            </div>

            <div class="ml-2">
              <select class="form-control">
             ${this.toOptions()}
              </select>
              </div>

              
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
  </div>`;

    let result = DOMUtils.toDOM(html) as HTMLElement;

    DOMUtils.get("select",result).addEventListener("change", (e) => {
      this.onSelectShader(e)
    });

    this.parent.appendChild(result);

      this.fragmentEditor = CodeMirror.fromTextArea(DOMUtils.get("#fragment"),
      {
        gutters: ["note-gutter", "CodeMirror-linenumbers"],
        viewportMargin: Infinity,
        lineNumbers: true,
        matchBrackets: true,
        mode: 'x-shader/x-fragment',
        keyMap: 'sublime',
        autoCloseBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        indentUnit: 4,
        lineWrapping: true,
        autofocus: false,
        autorefresh: true,

        extraKeys: {
          "Ctrl-S":  (instance: { getValue: () => string; } ) => { 
            this.onBuild(instance.getValue()) }
        }
      }
    );
    // this.fragmentEditor.on("change", (cm: CodeMirror) => {
    //   let source = cm.getValue();
    //   console.log(source);
    // });
  }
}
