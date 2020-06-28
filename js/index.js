/**
 * Created by hezhiyun on 2017/11/25.
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
                stepAnimate();
            });

            //获取屏幕当前位置
            window.onscroll = function(){
                leader = scrollTo().top;
            }
        }
        function stepAnimate(){
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

    var json = [
        // {   //  1
        //     width:400,
        //     top:70,
        //     left:50,
        //     opacity:20,
        //     zIndex:2
        // },
        {  // 2
            width:362,
            height: 510,
            top:140,
            left:0,
            opacity:80,
            zIndex:3
        },
        {   // 3
            width:476,
            height: 590,
            top:100,
            left:362,
            opacity:100,
            zIndex:4
        },
        {  // 4
            width:362,
            height: 510,
            top:140,
            left:838,
            opacity:80,
            zIndex:3
        },
        // {   //5
        //     width:400,
        //     top:70,
        //     left:750,
        //     opacity:20,
        //     zIndex:2
        // }
    ];
    var slide = document.getElementById("slide");
    var ul = slide.children[0];
    var liArr = ul.children;
    var arrow = document.getElementById("arrow");
    var arrowChildren = arrow.children;
    //开闭原则
    var flag = false;
    //页面初始动画
    move();

    //显示隐藏左右箭头
    slide.onmouseenter = function(){
        //需要时再设置opacity:100
        animate(arrow,{"opacity":0});
    };
    slide.onmouseleave = function(){
        animate(arrow,{"opacity":0});
    };

    for(var k in arrowChildren){
        arrowChildren[k].onclick = function(){
            if(this.className === "prev"){
                if(flag === true){
                    flag = false;
                    move(false);
                }
            }else{
                if(flag === true){
                    flag = false;
                    move(true);
                }
            }
        }
    }

    function move(bool){
        //json.push();//在最后添加
        //json.pop();//删除最后一位
        //json.unshift();//在最前面添加
        //json.shift();//删除第一位
        //如果没有输入参数则li不换位置
        if(bool !== undefined){
            if(bool){
                json.unshift(json.pop());
            }else{
                json.push(json.shift());
            }
        }
        for(var i=0; i<liArr.length; i++){
            animate(liArr[i],json[i],function(){
                flag = true;
            });
        }

    }

    /********************************楼层跳跃***********************************************/

};