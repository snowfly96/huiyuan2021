// 绘制热门文章以及用户列表

function drawTopList() {
    $.ajax("/list",{
            type:'POST',
            data:{},
            dataType: 'json',
            success:function (data) {
                var pageFlag=($("#hot-title").text()).slice(2,4);
                if(pageFlag==="文章"){
                    drawTopArticleList(data["topArticles"],0);
                }
                else{
                    drawTopUserList(data["topUsers"],0);
                }

                $("input[name='behavior-type']").click(function () {
                    if($("input[name='behavior-type']:checked").val()==='download'){
                        $("#data-type").text("下载数据");
                        pageFlag=($("#hot-title").text()).slice(2,4);
                        if(pageFlag==="文章"){
                            drawTopArticleList(data["topArticles"],0);
                        }
                        else{
                            drawTopUserList(data["topUsers"],0);
                        }
                    }
                    else{
                        $("#data-type").text("浏览数据");
                        pageFlag=($("#hot-title").text()).slice(2,4);
                        if(pageFlag==="文章"){
                            drawTopArticleList(data["topArticles"],1);
                        }
                        else{
                            drawTopUserList(data["topUsers"],1);
                            console.log("hello")
                        }
                    }
                });
            },
            error:function (e) {
                alert("List: "+e);
            }
    });

    function drawTopArticleList(data,ty) {
        var listSelector=$("#user-article-list");
        listSelector.empty();
        var updateSelector=$("#update-list");
        updateSelector.css({"left":listSelector.width()-24});
        var sortedUsers=Object.keys(data).sort(function(a,b){
            return data[b][ty]-data[a][ty];
        });

        var sortedData={};
        sortedUsers.forEach(function (item) {
            sortedData[item]=data[item];
        });

        Object.keys(sortedData).forEach(function (item,index) {
            var curArticleInfo=sortedData[item];
            var curDownloadCnt=curArticleInfo[0];
            var curArticleTitle=curArticleInfo[1].length>15?curArticleInfo[1].slice(0,13)+'...':curArticleInfo[1];
            var curArticleKeywords=curArticleInfo[2].length>15?curArticleInfo[2].slice(0,13)+'...':curArticleInfo[2];

            var listItem=$("<div class=\"list-article-item\">\n" +
            "                    <div class=\"list-item-title\">《"+curArticleTitle+"》</div>\n" +
            "                    <div class=\"list-item-keywords\">\n" +
            "                        <strong>关键字: </strong><code>"+curArticleKeywords+"</code>\n" +
            "                    </div>\n" +
            "                    <div class=\"list-item-content\">\n" +
            "                        <i class=\"fa fa-download\"></i>\n" +
            "                        <small>1200&nbsp</small>\n" +
            "                        <i class=\"fa fa-eye\"></i>\n" +
            "                        <small>"+curDownloadCnt+"&nbsp</small>\n" +
            "                </div>");

            listItem.attr({"id":"article-item-"+index});

            listSelector.append(listItem);
        });
        $("#article-item-0").css({"backgroundColor":"bisque"});

    }
    function drawTopUserList(data,ty){
        var listSelector=$("#user-article-list");
        listSelector.empty();
        var updateSelector=$("#update-list");
        updateSelector.css({"left":listSelector.width()-24});

        var sortedUsers=Object.keys(data).sort(function(a,b){
            return data[b][ty]-data[a][ty];
        });

        var sortedData={};
        sortedUsers.forEach(function (item) {
            sortedData[item]=data[item];
        });
        Object.keys(sortedData).forEach(function (item,index) {
            var curUserInfo=sortedData[item];

            var listItem=$("<div class=\"list-user-item\">\n" +
            "                    <div class=\"list-item-title\" style='padding-left: 10px'>用户：<code>"+item+"</code></div>\n" +
            "                    <div class=\"list-item-content\">\n" +
            "                        <i class=\"fa fa-download\"></i>\n" +
            "                        <small>"+curUserInfo[0]+"&nbsp</small>\n" +
            "                        <i class=\"fa fa-eye\"></i>\n" +
            "                        <small>"+curUserInfo[1]+"&nbsp</small>\n" +
            "                        <i class=\"fa fa-search\"></i>\n" +
            "                        <small>"+curUserInfo[2]+"&nbsp</small>\n" +
            "                    </div>\n" +
            "                </div>");

            listItem.attr({"id":"user-item-"+index});

            listSelector.append(listItem);
        });
        $("#user-item-0").css({"backgroundColor":"bisque"});
    }

}
drawTopList();
