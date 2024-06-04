let AC_GAME_OBJECT = [];

class AcGameObject {
   constructor() {
        AC_GAME_OBJECT.push(this);

        this.timedelta = 0;
        this.has_call_start = false;
   } 

   start() {  // 只会在开始执行一次

   }

   update() {  // 每一帧执行一次（除了第一帧）

   }

   destroy() {  // 删除当前对象
        for(let i in AC_GAME_OBJECT) {
            if(AC_GAME_OBJECT[i] === this) {
                AC_GAME_OBJECT.splice(i,1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_OBJECT_FRAME = (timestamp) => {
    for(let obj of AC_GAME_OBJECT) {
        if(!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECT_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECT_FRAME);

export {
    AcGameObject,
}