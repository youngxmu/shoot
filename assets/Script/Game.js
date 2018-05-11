cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        bottlePrefab: {
            default: null,
            type: cc.Prefab
        },
        bombPrefab: {
            default: null,
            type: cc.Prefab
        },
        gainPrefab: {
            default: null,
            type: cc.Prefab
        },
        crack1Prefab: {
            default: null,
            type: cc.Prefab
        },
        crack2Prefab: {
            default: null,
            type: cc.Prefab
        },
        crack3Prefab: {
            default: null,
            type: cc.Prefab
        },
        crack4Prefab: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        gun : {
            default: null,
            type: cc.Node
        },
        shootLine: {
            default: null,
            type: cc.Node
        },
        timer: {
            default: null,
            type: cc.Node
        },
        bombRate : 0.5,
        end : false,//游戏是否结束
        score : 0,
        bonus : 0,
        combo : false,
        shoot : false
    },
    onShoot : function(){
        this.shoot = true;
    },
    onLoad: function () {
        this.gun.game = this;
        this.shootLine.game = this;
        // 获取地平面的 y 轴坐标
        this.shootLineY = this.shootLine.y;
        this.score = 0;
        
        // setInterval(function(){
        //     _this.createBottle(_this);
        // }, 2000);
    },
    createBottle: function(_this) {
        var bottle = cc.instantiate(_this.bottlePrefab);
        _this.node.addChild(bottle);
        bottle.setPosition(_this.getNewBottlePosition());
        bottle.getComponent('Bottle').game = _this;
    },
    createBomb: function(_this) {
        var bomb = cc.instantiate(this.bombPrefab);
        _this.node.addChild(bomb);
        bomb.setPosition(_this.getNewBottlePosition());
        bomb.getComponent('Bomb').game = _this;
    },
    // createCrack : function(_this){
    //     var crack1 = cc.instantiate(_this.crack2Prefab);
    //     _this.node.addChild(crack1);
    //     crack1.setPosition(cc.p(0, 0));
    //     crack1.getComponent('Crack1').game = _this;
    // },
    createCrack : function(position){
        console.log(position)
        var y = position.y;
        var x = position.x;
        var x1 = x-30;
        var x2 = x-10;
        var x3 = x+10;
        var x4 = x+30;
        var p1 = cc.p(0,0);
        var crack1 = cc.instantiate(this.crack1Prefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(crack1);
        // 为星星设置一个随机位置
        crack1.setPosition(p1);
        console.log(crack1);
        crack1.getComponent('Crack1').play(p1);
    },
    /**
     * 打中瓶子之后显示当前瓶子得分
     */
    createScore : function(position){
        if(this.combo){
            this.bonus++;
        }
        var score = 1 + this.bonus;
        var y = position.y;
        var x = position.x;
        var p1 = cc.p(x, y);
        var gain = cc.instantiate(this.gainPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(gain);
        // 为星星设置一个随机位置
        gain.setPosition(p1);
        gain.getComponent(cc.Label).string = '+' + score;
        this.gainScore(score);
    },
    getNewBottlePosition: function () {
        var randX = 0;
        var randY = this.shootLineY + cc.random0To1() * 100 - 500;
        var maxX = this.node.width * 3 / 8;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        if(randY < -500){
            randY = -499;
        }
        return cc.p(randX, randY);
    },
    start: function () {
        var _this = this;
        // _this.createCrack(_this);
        // _this.createBottle(_this);
        // _this.createBomb(_this);    
        this.createInterval = setInterval(function(){
            var seed = cc.random0To1();
            if(seed < 0.3){// ~30概率出现炸弹
                _this.createBomb(_this);    
            }else{
                _this.createBottle(_this);
            }
        }, 300);
    },
    gainScore: function (score) {
        this.score += score;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score.toString();
        this.resetTimer();

        if(score > 100){
            this.bombRate = 0.8;
        }
    },
    resetTimer : function(){
        this.combo = true;
        var _this = this;
        var bar = this.timer.getComponent(cc.ProgressBar);
        bar.progress = 1;
        this.timerInterval = setInterval(function(){
            if(bar.progress<=0){
                this.combo = false;
                clearInterval(_this.timerInterval);
            }
            bar.progress = bar.progress - 0.01;
        }, 30);
    },
    comboFail : function(){
        this.combo = false;
        this.bonus = 0;
        var bar = this.timer.getComponent(cc.ProgressBar);
        bar.progress = 0;
    },
    gameover : function(){
        this.end = true;
        clearInterval(this.createInterval);
        this.comboFail();
    }
    // update (dt) {},
});
