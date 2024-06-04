import { AcGameObject } from '/static/js/ac_game_object/base.js';
import { Controller } from '/static/js/controller/base.js';

class GameMap extends AcGameObject {
    constructor(root) {
        super();    

        this.root = root;
        this.$canvas = $(`<canvas width="1280" height="720" tabindex=0></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.controller = new Controller(this.$canvas);

        this.root.$kof.append($(`
            <div class="kof_head">
                <div class="kof_head_hp_0"><div></div></div>
                <div class="kof_head_timer">60</div>
                <div class="kof_head_hp_1"><div></div></div>
            </div>
        `));

        this.time_left = 60000;
        this.$timer = this.root.$kof.find(".kof_head_timer")
    }

    start() {

    }

    update() {
        this.time_left -= this.timedelta;

        if(this.time_left <= 0) {
            this.time_left = 0;

            let [a,b] = this.root.players;
            if(a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }
        this.$timer.text(parseInt(this.time_left / 1000));

        this.render();
    }

    render() {
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // this.ctx.fillStyle = "black";
        // this.ctx.fillRect(0,0,this.$canvas.width(),this.$canvas.height());
    }
}

export {
    GameMap,
}