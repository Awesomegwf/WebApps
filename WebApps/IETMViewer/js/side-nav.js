var format_worker = function(obj, n, parent) //obj as input ,n as depth
    {
        //console.log("format_worker");
        let count = 0;
        var ul = document.createElement("ul");
        for (var i = 0; i < obj.length; i++) {
            var item_name = obj[i].item_name;
            var sub_item = obj[i].sub_item;
            var href = obj[i]["href"];
            var li = document.createElement("li");

            if (i == obj.length - 1) li.setAttribute("id", "end");
            var a = document.createElement("a");
            a.innerHTML = item_name;
            if (!!href) a.setAttribute("href", href);

            if (sub_item.length == 0 || !sub_item[0].item_name) {
                li.appendChild(a);
                ul.appendChild(li);
                count++;
                continue;
            } else {
                var em = document.createElement("em");
                li.appendChild(em);
                li.appendChild(a);
                ul.appendChild(li);
            }

            count += format_worker(sub_item, n + 1, li);

        }
        parent.appendChild(ul);
        return count;
    }
var format = function(obj, parent) {
        //console.log("format");
        var mainDiv = document.createElement("div");
        mainDiv.setAttribute("data-role", "main");
        mainDiv.setAttribute("class", "ui-content");
        mainDiv.setAttribute("style", "padding:3%");

        //ul.setAttribute("style", "margin-left:20px;width:250px;padding:10px;");
        parent.appendChild(mainDiv);

        for (var i = 0; i < obj.length; i++) {

            var tree_name = obj[i].tree_name;
            var items = obj[i].items;
            //var li = document.createElement("li");      
            var collDiv = document.createElement("div");
            var treeDiv = document.createElement("div");
            // var btn = document.createElement("button");
            var treeNameH1 = document.createElement("h1");

            collDiv.setAttribute("data-role", "collapsible");
            mainDiv.appendChild(collDiv);
            collDiv.appendChild(treeNameH1);
            collDiv.appendChild(treeDiv);

            // ul.appendChild(li);
            // // li.appendChild(div);
            // // li.appendChild(btn);
            // li.appendChild(div);
            // // div.appendChild(span);
            // // btn.appendChild(span);
            // li.setAttribute("class", "dir-tree");
            // // div.setAttribute("id", "tree-name");
            // // div.setAttribute("class", "tree-name ui-btn");
            // span.setAttribute("id", "tree-name");
            // // btn.setAttribute("class", "tree-name ui-btn ui-shadow");
            // span.innerHTML = tree_name;
            treeNameH1.innerHTML = tree_name;
            // if (item.length == 0 || !item[0]["item-name"]) continue;
            // var div1 = document.createElement("div");
            treeDiv.setAttribute("id", tree_name + "-menu");
            treeDiv.setAttribute("class", "menu");

            //console.log("format_worker() tree-name:" + tree_name);
            var count = format_worker(items, i, treeDiv);
            // div1.style.height = 20 * count + 20 + "px";
        }
    }
    /*
    var setEmOnclick = function(e) {
        //	for(var -obj=document.getElementById(e.id).getElementsByTagName(e.tag),i=-1,em;em=-obj[++i];){
        for (var -obj = $("em"), i = -1, em; em = -obj[++i];) {
            em.onclick = function() { //onmouseover
                var ul = this.nextSibling;
                //alert(this.parentNode.childNodes.length);
                if (!ul) {
                    return false;
                }
                ul = ul.nextSibling;
                if (!ul) {
                    return false;
                }
                if (e.tag != 'a') {
                    ul = ul.nextSibling;
                    if (!ul) {
                        return false;
                    }
                }
                for (var -li = this.parentNode.parentNode.childNodes,
                        n = -1,
                        li; li = -li[++n];) {
                    if (li.tagName == "LI") {
                        for (var -ul = li.childNodes,
                                t = -1,
                                $ul; $ul = -ul[++t];) {

                            switch ($ul.tagName) {
                                case "UL":
                                    $ul.className = $ul != ul ? "" : ul.className ? "" : "off";
                                    break;
                                case "EM":
                                    $ul.className = $ul != this ? "" : this.className ? "" : "off";
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
    */
var setEmClick = function() {
    //console.log("em.count=" + $("em").length);
    for (var _obj = $("em"), i = -1; em = _obj[++i];) {
        em.onclick = function() {
            if (this.className = "" || !this.className) {
                this.className = "off";
                //alert(this.tagName);
                $(this).siblings("ul").each(function() {
                    this.className = "off";
                });

                $(this).parent().siblings("li").find("em").each(function() {
                    this.className = "";
                });
                $(this).parent().siblings("li").find("ul").each(function() {
                    this.className = "";
                });

            } else {
                this.className = "";
                //alert(this.tagName);
                $(this).siblings("ul").each(function() {
                    this.className = "";
                });

                $(this).find("em").each(function() {
                    this.className = "";
                });
                $(this).find("ul").each(function() {
                    this.className = "";
                });

            }
        }
        $(em).siblings("a").onclick = em.click;
    }
}

var resizeDiv = function() {
    var aClientHeight = document.body.clientHeight;
    var headerHeight = document.getElementById("menu-header").offsetHeight;
    var res = aClientHeight - 101 - 25;
    $("#menu-header").css("height", "101px");
    $(".menu-root").css("height", res + "px");
    // var count = $(".tree-name").length;
    // //var height = document.getElementById("tree-name").offsetHeight;
    // var tree_root_height = document.getElementById("tree-root").offsetHeight;
    // console.log("tree_root_height:" + document.body.clientHeight);

    // var headHeight = document.getElementById("menu-header").offsetHeight;
    // var aHeight = aClientHeight - count * height - (8) * count - headHeight * 2; //?
    // // $(".menu").css("height", aHeight + "px");
    // // $("#menu-root").css("height", aClientHeight - 25);
    // //$(".tree-name").css("width", $("#menu-root").css("width"));
    // //$(".menu").css("width", document.getElementById("menu-root").offsetWidth - 50);
}

var bindEvent = function() {
    $(window).resize(resizeDiv);
    resizeDiv();
    setEmClick();
    // var lilist = $("li")
    // lilist.each(function() {
    //     $(this).hover(function() {
    //         console.log("hover");
    //         $(this).css("background-color", "blue");
    //     }, function() {
    //         $(this).css("background-color", "white");
    //     });
    // });

    // $("body").on("swiperight", function() {
    //     $("#sidePanel").panel("open");
    // });

    $(".tree-name").hover(function() {
            $(this).css("cursor", "Pointer");
        },
        function() {
            $(this).css("cursor", "hand");
        });
    $(".header").hover(function() {
            $(this).css("cursor", "Pointer");
        },
        function() {
            $(this).css("cursor", "hand");
        });

    var treenamediv = $(".trees").find(".tree-name");
    //alert(treenamediv.length);
    treenamediv.each(function() {
        $(this).bind("click",
            function() {

                // treenamediv.each(function() {
                //     $(this).css("background-color", "#ffffff");
                // });
                // $(this).css("background-color", "#fabf7c");
                // $(this).addClass("ui-shadow");
                // $(this).siblings(".menu").show();
                // $(this).parent().siblings().find(".menu").hide();

                //$(this).siblings(".menu").toggle();
            });
    });

    var buttonlist = $(".header-btn");
    buttonlist.each(function() {
        var root = $(this).attr("toshow");
        root = "#" + root;
        $(this).bind("tap", function() {
            $(".header-btn").css("background-color", "#ffffff");
            $(".header-btn").css("box-shadow", "none");
            $(this).css("background-color", "#fabf7c");
            $(this).css("box-shadow", "0px 0px 5px #888888");

            $(".menu-root").hide();
            $(root).show();
        });
    });

    /*

        $("#tree-icon").click(function() {
            var treeroot = $("#tree-root");
            console.log("tree clicked");
            $(this).css("background-color", "#121212;");
            treeroot.css("background-color", "#121212;");
            treeroot.siblings(".root2").css("background-color", "#ffffff");
            treeroot.show();
            treeroot.siblings(".root2").hide();

        });
        $("#bookmark-icon").click(function() {
            var treeroot = $("#bookmark-root");
            console.log("bookmark clicked");
            $(this).css("background-color", "#121212;");
            treeroot.css("background-color", "#121212;");
            treeroot.siblings(".root2").css("background-color", "#ffffff");
            treeroot.show();
            treeroot.siblings(".root2").hide();

        });
        $("#note-icon").click(function() {
            var treeroot = $("#note-root");
            console.log("note clicked");
            $(this).css("background-color", "#121212;");
            treeroot.show();
            treeroot.css("background-color", "#121212;");
            treeroot.siblings(".root2").css("background-color", "#ffffff");
            treeroot.siblings(".root2").hide();

        });
    */
}

var init_side_panel = function() {

    /* init nav tree */
    var tr = document.getElementById("tree-root");
    var divv = tr.firstElementChild;

    format(menu_js, tr);


    bindEvent();

    $(".menu-root").hide();
    $("#tree-root").show();
}
