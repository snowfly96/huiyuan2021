// 绘制热门文章以及用户列表

function drawTopList() {
    $.ajax("/list",{
            type:'POST',
            data:{},
            dataType: 'json',
            success:function (data) {
                drawTopArticleList(data);
            },
            error:function (e) {
                alert("List: "+e);
            }
    });

    function drawTopArticleList(data) {
        var listSelector=$("#user-article-list");
        var updateSelector=$("#update-list");
        updateSelector.css({"left":listSelector.width()-24});

        Object.keys(data).forEach(function (item,index) {
            var curArticleInfo=data[item];
            var curDownloadCnt=curArticleInfo[0];
            var curArticleTitle=curArticleInfo[1].length>15?curArticleInfo[1].slice(0,13)+'...':curArticleInfo[1];
            var curArticleKeywords=curArticleInfo[2].length>15?curArticleInfo[2].slice(0,13)+'...':curArticleInfo[2];

            var listItem=$("<div class=\"list-item\">\n" +
            "                    <div class=\"list-item-title\">《"+curArticleTitle+"》</div>\n" +
            "                    <div class=\"list-item-keywords\">\n" +
            "                        <strong>关键字: </strong><code>"+curArticleKeywords+"</code>\n" +
            "                    </div>\n" +
            "                    <div class=\"list-item-content\">\n" +
            "                        <i class=\"fa fa-eye\"></i>\n" +
            "                        <small>1200</small>\n" +
            "                        <i class=\"fa fa-download\"></i>\n" +
            "                        <small>"+curDownloadCnt+"</small>\n" +
            "                        <i class=\"fa fa-calendar\"></i>\n" +
            "                        <small>2021-01-16 13:00:01</small>\n" +
            "                    </div>\n" +
            "                </div>");

            listSelector.append(listItem);
        });

    }
}
drawTopList();
