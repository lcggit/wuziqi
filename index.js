$(function () {
    let chess = $('.qipan'),
        black = {},
        white = {},//分解记录黑白子各自位置信息
        flag = true,
        begin = $('.begin'),
        blank = {},
        p = $('p'),
        AI = true;
    function go() {
        chess.empty();
        for(let i = 0; i<15;i++){
            $('<i>').appendTo(chess);
            $('<b>').appendTo(chess);
            for(let j = 0;j<15;j++){
                blank[i+"--"+j] = true;
                $('<span>')
                    .appendTo(chess)
                    .addClass('qizi')
                    .attr('id',i+"--"+j)
                    .data('pos',{x:i,y:j});
            }
        }
        for (let i = 0;i<5;i++){
            $('<div>').appendTo(chess).addClass('point');
        }
        //此处的x,y分别对应垂直和水平
        chess.on('click','span',function () {
            if($(this).hasClass('black') || $(this).hasClass('white')){
                return;
            }
            let data = $(this).data('pos');
            delete blank[data.x+"--"+data.y];
            if(flag){
                $(this).addClass('black');
                black[data.x + '--' + data.y] = true;
                if(success(black,data) >= 5){
                    alert('黑字胜');
                    chess.off();
                }


                if(AI){
                    let pos = position();
                    console.log(pos)
                    $('#' + pos.x+"--"+pos.y).addClass('white');
                    white[pos.x + "--" + pos.y] = true;
                    delete blank[pos.x+"--"+pos.y];
                    if(success(white, pos) >= 5){
                        alert('白字胜');
                        chess.off();
                    }
                    return;
                }
            }else{
                $(this).addClass('white');
                white[data.x + '--' + data.y] = true;
                if(success(white,data) >= 5){
                    alert('白字胜');
                    chess.off();
                }

            }
            flag = !flag;
        })

        //判断黑白双方棋子的位置
        function position() {
            let score1 = 0 , score2 = 0 , pos1 = null , pos2 = null;
            for(let i in blank){
                let obj = {x:i.split('--')[0],y:i.split('--')[1]};
                if(success(black,obj) > score1){
                    score1 = success(black,obj);
                    pos1 = obj;
                }
                if(success(white,obj) > score2){
                    score2 = success(white,obj);
                    pos2 = obj;
                }
            }
            return score1 > score2 ? pos1 : pos2;
        }
        //判断落下的每个棋子当前四个方向各自对应的连着的棋子数量，并取其中的最大值，判断是否成功
        function success(obj,pos) {
            let heng = 1,shu = 1,zx = 1,yx = 1,
                x = pos.x, y = pos.y;

            //统计横着的个数
            while(obj[x + '--' + (--y)]){
                heng++;
            }
            y = pos.y;
            while(obj[x + '--' + (++y)]){
                heng++;
            }

            //统计竖着的个数
            y = pos.y;
            while(obj[(--x) + '--' + y]){
                shu++;
            }
            x = pos.x, y = pos.y;
            while(obj[(++x) + '--' + y]){
                shu++;
            }

            //统计左斜着的个数
            x = pos.x, y = pos.y;
            //console.log(shu)
            while(obj[(++x) + '--' + (--y)]){
                zx++;
            }
            x = pos.x, y = pos.y;
            while(obj[(--x) + '--' + (++y)]){
                zx++;
            }

            //统计右斜着的个数
            x = pos.x, y = pos.y;
            while(obj[(--x) + '--' + (--y)]){
                yx++;
            }
            x = pos.x, y = pos.y;
            while(obj[(++x) + '--' + (++y)]){
                yx++;
            }
            return Math.max(heng,shu,zx,yx)
        }
    }

    begin.on('click',function () {
        p.addClass('none');
        go();
    })
    $('reset').on('click',function () {
        
    })
    ///保存下空白的部分blank，然后每落下一个子，delete blank[],
    //仅供与防守取决于
})