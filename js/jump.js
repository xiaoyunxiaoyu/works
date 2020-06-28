/**
 * Created by hezhiyun on 2020/3/22.
 */
window.onload = function(){
    //需求：点击ol中的li，跳转到对应的ul中的li
    //步骤：
    //0.数组赋给ul和ol中的li颜色
    //1.老三步
    //2.获取点击的ol中li的下标
    //3.缓动动画到对应的ul中的li

    //0.数组赋给ul和ol中的li颜色
    var colorArr = ["red","yellow","blue","pink","green"];
//1.老三步
//            var ul = document.getElementsByTagName("ul")[0];
//            var ol = document.getElementsByTagName("ol")[0];
//            var ulLi = ul.children;
//            var olLi = ol.children;

    var wrapLayer = document.getElementsByClassName("wrap-layer")[0]
    var step = document.getElementsByClassName("step")[0]
    var ulLi = wrapLayer.getElementsByClassName("wrap-item")
    var olLi = step.children;

    var target = 0;//记录点击的ol中li对应的ul中的li在文件中的位置
    var timer = null;
    var leader = 0;
    for(var i=0; i<olLi.length; i++){
        olLi[i].index = i;
//                ulLi[i].style.backgroundColor = colorArr[i];
//                olLi[i].style.backgroundColor = colorArr[i];
        olLi[i].addEventListener("click",function(){
            //获取对应的li在文件中的位置
            target = ulLi[this.index].offsetTop;
            //console.log(target);
            //console.log(leader);
            //3.缓动动画到对应的ul中的li
            animate();
        });

        //获取屏幕当前位置
        window.onscroll = function(){
            leader = scrollTo().top;
        }
    }
    function animate(){
        //要用定时器，先清定时器
        clearInterval(timer);
        timer = setInterval(function(){
            //设置步长
            var step = (target - leader)/10;
            //二次处理步长
            step = step>0?Math.ceil(step):Math.floor(step);
            //给leader赋值
            leader = leader + step;
            window.scrollTo(0,leader);
            //清除定时器
            //console.log(target);
            if(Math.abs(target-leader)<=Math.abs(step)){
                window.scrollTo(0,target);
                clearInterval(timer);
            }
        },30);
    }

//返回当前被屏幕卷去的头部
    function scrollTo(){
        return{
            "top":document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset,
            "left":document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset
        }
    }
}
