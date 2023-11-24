import { DRExt } from "../DRExt";
import { DOMUtils } from "./DOMUtils";



export class DRUniforms {

  constructor(public parent: HTMLElement, private dr: DRExt) {
  }

  render(): void {
    let html = `<div class="modal fade" id="mod-uniforms">        
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Uniforms</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="dump">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>        
      </div>
    </div>   
     `;
    let result = DOMUtils.toDOM(html) as HTMLElement;
    this.parent.appendChild(result);
  }

  update(): void {
    const parent = DOMUtils.get("#dump");
    parent.replaceChildren();
    const activeUniforms = this.dr.getUniforms();
    activeUniforms.forEach(uniform => {
      const row = DOMUtils.create<HTMLDivElement>("div");
      row.classList.add("row", "mb-3");
      const lbl = DOMUtils.create<HTMLLabelElement>("label");
      lbl.classList.add("col-form-label", "col-sm-8");
      lbl.textContent = uniform.name;
      row.append(lbl);
      const col = DOMUtils.create<HTMLDivElement>("div");
      col.classList.add("col-sm-4");
      const input = DOMUtils.create<HTMLInputElement>("input");
      input.classList.add("form-control");
      input.dataset.name = uniform.name;
      input.dataset.type = uniform.type.toString();
      input.value = this.dr.getUniform(uniform.location).toString();
      col.append(input);
      row.append(col);
      parent.appendChild(row);
    });

  }

}
