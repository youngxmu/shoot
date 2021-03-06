cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            serializable: false
        },
        gun : {
            default: null,
            type: cc.Node
        }
    },
    onLoad : function(){
        this.anim = this.gun.getComponent(cc.Animation);
        this.anim.on('play', this.onPlay, this);
        this.anim.on('finished', this.onFinished, this);
    },
    onPlay : function(){
        this.score = this.game.score;
        this.game.shoot = true;
    },
    onFinished : function(){
        if(this.game.score == this.score){
            this.game.comboFail();
        }
        this.game.shoot = false;
    },
    play : function(){
        if(!this.game.end){//游戏未结束才可以射击
            this.anim.play();
        }
    }
});
