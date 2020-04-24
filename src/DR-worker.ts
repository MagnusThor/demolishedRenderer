import { DR } from './DR';
import { IBus } from './IBus';

const ctx: Worker = self as any;

const postMessage = <T>(topic, data: T, transferables?: Array<Transferable>) => {
       ctx.postMessage({
              topic: topic,
              data: data
       }, transferables || []);
};
let _rd: DR;

ctx.addEventListener("message", (ev: MessageEvent) => {
       let msg = ev.data as IBus;
       if (msg.topic === "init") {
              _rd = new DR(
                     msg.data.canvas,
                     msg.data.vert, msg.data.frag, msg.data.customUniforms || {});
              msg.data.buffers.forEach((b: any) => {
                     _rd.aB(b.name, b.vert, b.frag, b.textures, b.customUniforms);
              });
              postMessage("init", {});
       } else if (msg.topic === "start") {
              const animate = (ts: number) => {
                     requestAnimationFrame(animate);
                     let t = ts / 1000;
                     _rd.R(t); // Render       
                     postMessage("render", {
                            bitmap: _rd.canvas["transferToImageBitmap"]()
                     })

              };
              animate(0);
       }
});


