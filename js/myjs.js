/**
 * Created by hezhiyun on 2017/11/18.
 */

//获取屏幕可视区域的宽高
function client(){
    if(innerHeight !== undefined){
        return{
            "width":window.innerWidth,
            "height":window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return{
            "width":document.documentElement.clientWidth,
            "height":document.documentElement.clientHeight
        }
    }else{
        return{
            "width":document.body.clientWidth,
            "height":document.body.clientHeight
        }
    }
}

//缓动动画（回调函数）
//此animate函数对设置background: rgba(x,x,x,x)、border-radius、z-index、opacity这四个属性会出问题
function animate(ele,json,fn){
    //要用定时器先清除定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function(){
        //开闭原则：用于判断是否所有动作都已经完成，已经完成的时候bool为true,即可以清除定时器
        var bool = true;
        for(var k in json){
            //k=attr,json[k]=target
            //获取当前属性值
            var leader;
            //判断如果属性为opacity的时候特殊获取值
            if(k==="opacity"){
                //getStyle(ele,k)获取到的透明度是0到1，是小数，所以要放大100倍
                leader = getStyle(ele,k)*100 || 1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }

            //获取步长
            var step = (json[k] - leader)/10;
            //二次处理步长
            step = step>0?Math.ceil(step):Math.floor(step);
            //赋值
            leader = leader + step;
            if(k === "opacity"){
                //上面给leader赋值的时候放大了100倍，所以现在给opacity赋值要减少100倍；
                ele.style[k] = leader/100;
                //兼容ie678
                ele.style.filter = "alpha(opacity="+leader+")";
                //判断属性是否为zIndex,如果是的话，直接将json里面的zIndex值赋值
            }else if(k === "zIndex"){
                ele.style[k] = json[k];
            }else{
                ele.style[k] = leader + "px";
            }

            //4.清除定时器
            //判断: 目标值和当前值不相等，就不能清除定时器
            if(json[k] !== leader){
                bool = false;
            }
        }
        //只有所有的属性都到了指定位置，bool值才不会变成false；
        if(bool){
            clearInterval(ele.timer);
            //当当前动作都执行完之后（清除定时器之后），运行回调函数
            if(fn){
                fn();
            }
        }
    },25);
}
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}