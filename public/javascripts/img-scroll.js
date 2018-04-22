// lazyload();
$(function(){
    window.offsetTops = [];
    window.onload = function () {
        var lis = document.getElementsByTagName('li')
        offsetTops = Array.prototype.map.call(lis, function (li) {
            return li.offsetTop;
        })
        var i = 1;
        document.addEventListener('keydown', function (event) {
            if(event.keyCode == '83') {
                window.scroll({
                    top: offsetTops[i++],
                    behavior: "smooth"
                })
                if (i === offsetTops.length) {
                    i = 0;
                }
            }
        })

         //添加移动端手势
        var pinchImg = document.getElementsByTagName("img");
        var initScale = 1;
        Array.prototype.forEach.call(pinchImg,function(itemImg){
            Transform(itemImg);
            
            new AlloyFinger(itemImg, {
                rotate:function(evt){
                    itemImg.rotateZ += evt.angle;
                },
                multipointStart: function () {
                    initScale = itemImg.scaleX;
                },
                pinch: function (evt) {
                    itemImg.scaleX = itemImg.scaleY = initScale * evt.zoom;
                }
            });
        })
    }
    let images = document.querySelectorAll("img");
    lazyload(images);
    var imageList = document.getElementsByTagName('img');
    Array.prototype.forEach.call(imageList,function(img,index){
        //暂时删除高度
        img.onload = function() {
            this.removeAttribute('height');
            var width = this.width ;
            if(width > screen.width ) {
                this.style.width ='100%';
            }
            offsetTops[index] = img.offsetTop;
            console.log('loaded')
        }
    })
   
   
})

function imgOnload(obj) {
    var width = obj.width ;
    if(width > screen.width ) {
        obj.style.width ='100%';
    }
}