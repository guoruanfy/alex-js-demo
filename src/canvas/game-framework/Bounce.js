
/**
    测试类，用于演示VisualGameObject类的用法
    @class
*/
function Bounce()
{
	/** x轴的运动方向
        @type Number
    */
	this.xDirection = 1;
	/** y轴的运动方向
        @type Number
    */
	this.yDirection = 1;
	/** 运动速度
        @type Number
    */
	this.speed = 10;

	/**
        初始化对象
        @return 对初始化对象的引用
    */
	this.startupBounce = function(image)
	{
		this.startupVisualGameObject(image, 0, 0, 0);
		return this;
	}

	/**
       更新对象
        @param dt 自上一帧绘制起经过的秒数
        @param context 绘制上下文
        @param xScroll x轴的全局滚动值
        @param yScroll y轴的全局滚动值
    */
	this.update = function (/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll, /**Number*/ yScroll)
	{
		this.x += dt * this.speed * this.xDirection;
		this.y += dt * this.speed * this.yDirection;

		if (this.x >= 450)
		{
			this.x = 450;
			this.xDirection = -1;
		}
		else if (this.x <= 0)
		{
			this.x = 0;
			this.xDirection = 1;
		}

		if (this.y >= 250)
		{
			this.y = 250;
			this.yDirection = -1;
		}
		else if (this.y <= 0)
		{
			this.y = 0;
			this.yDirection = 1;
		}
	}
}
Bounce.prototype = new VisualGameObject;
