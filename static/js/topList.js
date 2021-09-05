// 绘制热门文章以及用户列表

function drawTopList() {
    $.ajax("/list",{
            type:'POST',
            data:{},
            dataType: 'json',
            success:function (data) {
                drawTopArticleList(data);
                // drawTopUserList(data);
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

            var listItem=$("<div class=\"list-article-item\">\n" +
            "                    <div class=\"list-item-title\">《"+curArticleTitle+"》</div>\n" +
            "                    <div class=\"list-item-keywords\">\n" +
            "                        <strong>关键字: </strong><code>"+curArticleKeywords+"</code>\n" +
            "                    </div>\n" +
            "                    <div class=\"list-item-content\">\n" +
            "                        <i class=\"fa fa-eye\"></i>\n" +
            "                        <small>1200</small>\n" +
            "                        <i class=\"fa fa-download\"></i>\n" +
            "                        <small>"+curDownloadCnt+"</small>\n" +
            "                </div>");

            listItem.attr({"id":"article-item-"+index});

            listSelector.append(listItem);
        });
        $("#article-item-0").css({"backgroundColor":"bisque"});

    }
    function drawTopUserList(data){
        var listSelector=$("#user-article-list");
        var updateSelector=$("#update-list");
        updateSelector.css({"left":listSelector.width()-24});

        Object.keys(data).forEach(function (item,index) {
            var curArticleInfo=data[item];
            var curDownloadCnt=curArticleInfo[0];
            var curArticleTitle=curArticleInfo[1].length>15?curArticleInfo[1].slice(0,13)+'...':curArticleInfo[1];
            var curArticleKeywords=curArticleInfo[2].length>15?curArticleInfo[2].slice(0,13)+'...':curArticleInfo[2];

            var listItem=$("<div class=\"list-user-item\">\n" +
            "                    <div class=\"list-item-title\">《"+curArticleTitle+"》</div>\n" +
            "                    <div class=\"list-item-content\">\n" +
            "                        <i class=\"fa fa-eye\"></i>\n" +
            "                        <small>1200</small>\n" +
            "                        <i class=\"fa fa-download\"></i>\n" +
            "                        <small>"+curDownloadCnt+"</small>\n" +
            "                        <i class=\"fa fa-calendar\"></i>\n" +
            "                        <small>2021</small>\n" +
            "                    </div>\n" +
            "                </div>");

            listItem.attr({"id":"user-item-"+index});

            listSelector.append(listItem);
        });
        $("#user-item-0").css({"backgroundColor":"bisque"});
    }

}
drawTopList();
