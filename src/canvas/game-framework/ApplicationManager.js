
/**
    ApplicationManager用于管理应用
    @class
*/
function ApplicationManager()
{
    /**
        初始化对象
        @return 对初始化对象的引用
    */
    this.startupApplicationManager = function()
    {
        this.bounce = new Bounce().startupBounce(g_image);
        return this;
    }
}
