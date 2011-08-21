
/**
    游戏中出现的所有元素的基类
    @class
*/
function GameObject()
{
    /** 显示的深度次序。较小的zOrder值表示先渲染，因而会在背景中。
        @type Number
    */
    this.zOrder = 0;
    /**
        x轴的坐标
        @type Number
    */
    this.x = 0;
    /**
        y轴的坐标
        @type Number
    */
    this.y = 0;

    /**
        初始化游戏对象，并将其添加到GameObjectManager维护的对象列表中
        @param x        x轴的坐标
        @param y        y轴的坐标
        @param z        元素的z次序（背景元素的z值较小）
    */
    this.startupGameObject = function(/**Number*/ x, /**Number*/ y, /**Number*/ z)
    {
        this.zOrder = z;
        this.x = x;
        this.y = y;
        g_GameObjectManager.addGameObject(this);
        return this;
    }

    /**
        清理当前对象，将其从GameObjectManager维护的对象列表中删除
    */
    this.shutdownGameObject = function()
    {
        g_GameObjectManager.removeGameObject(this);
    }
}
