cc.Class({
    extends: cc.Component,
    properties: {
        anim : cc.Animation,
        game: {
            default: null,
            serializable: false
        }
    },
    restart : function(){
        this.game.restart();
    },
    play : function(){
        if(!this.game.end){//游戏未结束才可以射击
            this.anim.play('gun-shake');
        }
    },
    onLoad () {
        this.game = this.node.game;
    }
});
