
/**
    出现在游戏中的所有元素的基类
    @class
*/
function VisualGameObject()
{
    /**
        由当前对象显示的图像
        @type Image
    */
    this.image = null;

    /**
        将当前元素绘制到后台缓冲
        @param dt 自上一帧绘制起经过的秒数
    */
    this.draw = function(/**Number*/ dt, /**CanvasRenderingContext2D*/ context, /**Number*/ xScroll, /**Number*/ yScroll)
    {
        context.drawImage(this.image, this.x - xScroll, this.y - yScroll);
    }

    /**
        初始化当前对象
        @param image 要显示的图像
    */
    this.startupVisualGameObject = function(/**Image*/ image, /**Number*/ x, /**Number*/ y, /**Number*/ z)
    {
        this.startupGameObject(x, y, z);
        this.image = image;
        return this;
    }

    /**
        清理当前对象
    */
    this.shutdownVisualGameObject = function()
    {
        this.shutdownGameObject();
    }
}
VisualGameObject.prototype = new GameObject;
