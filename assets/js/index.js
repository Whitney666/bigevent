let layer = layui.layer;

function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg("获取用户基本信息失败！");
            }
            // layer.msg("获取用户基本信息成功！");
            let name = res.data.nickname || res.data.username;
            $(".text").text("欢迎 " + name);
            if (res.data.user_pic) {
                $(".layui-nav-img").show().attr("src", res.data.user_pic);
                $(".userInfo").hide();
            } else {
                let first = name[0].toUpperCase();
                $(".layui-nav-img").hide();
                $(".userInfo").show().text(first);
            }
        },
        complete: function(res) {
            // console.log(res);
            let data = res.responseJSON;
            if (data.status === 1 && data.message === "身份认证失败!") {
                location.href = "/home/login.html";
                localStorage.removeItem("token");
            }
        }
    })
}
getUserInfo();

$(".logoutBtn").click(function() {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        location.href = "/home/login.html";
        localStorage.removeItem("token");
        layer.close(index);
    });
})