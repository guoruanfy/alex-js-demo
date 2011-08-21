/**
    管理游戏中所有对象的管理器
    @class
*/
function GameObjectManager()
{
    /** 保存游戏中对象的数组
        @type Arary
    */
    this.gameObjects = new Array();
    /** 上一次帧被渲染的时间
        @type Date
    */
    this.lastFrame = new Date().getTime();
    /** x轴的全局滚动值
        @type Number
    */
    this.xScroll = 0;
    /** y轴的全局滚动值
        @type Number
    */
    this.yScroll = 0;
    /** 对ApplicationManager实例的引用
        @type ApplicationManager
    */
    this.applicationManager = null;
    /** 对画布元素的引用
        @type HTMLCanvasElement
    */
    this.canvas = null;
    /** 对画布元素2D上下文的引用
        @type CanvasRenderingContext2D
    */
    this.context2D = null;
    /** 对内存中用作后台缓冲区的画布的引用
        @type HTMLCanvasElement
    */
    this.backBuffer = null;
    /** 对后台缓冲画布的2D上下文的引用
        @type CanvasRenderingContext2D
    */
    this.backBufferContext2D = null;

    /**
        初始化这个对象
        @return A reference to the initialised object
    */
    this.startupGameObjectManager = function()
    {
        // 设置引用this对象的全局指针
        g_GameObjectManager = this;

        // 取得画布元素及其2D上下文的引用
        this.canvas = document.getElementById('canvas');
        this.context2D = this.canvas.getContext('2d');
        this.backBuffer = document.createElement('canvas');
        this.backBuffer.width = this.canvas.width;
        this.backBuffer.height = this.canvas.height;
        this.backBufferContext2D = this.backBuffer.getContext('2d');

        // 创建一个新的ApplicationManager
        this.applicationManager = new ApplicationManager().startupApplicationManager();

        // 使用setInterval来调用draw函数
        setInterval(function(){g_GameObjectManager.draw();}, SECONDS_BETWEEN_FRAMES);

        return this;
    }

    /**
        渲染循环
    */
    this.draw = function ()
    {
        // 计算从上一帧到现在的时间
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - this.lastFrame)/1000;
        this.lastFrame = thisFrame;

        // 清理绘制上下文
        this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 首先更新所有游戏对象
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].update)
            {
                this.gameObjects[x].update(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
            }
        }

        // 然后绘制所有游戏对象
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].draw)
            {
                this.gameObjects[x].draw(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
            }
        }

        // 将后台缓冲复制到当前显示的画布
        this.context2D.drawImage(this.backBuffer, 0, 0);
    };

    /**
        向gameObjects集合中添加一个GameObject
        @param gameObject The object to add
    */
    this.addGameObject = function(gameObject)
    {
        this.gameObjects.push(gameObject);
        this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;})
    };

    /**
        从gameObjects集合中删除一个GameObject
        @param gameObject The object to remove
    */
    this.removeGameObject = function(gameObject)
    {
        this.gameObjects.removeObject(gameObject);
    }
}