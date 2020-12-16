$(function() {
    let layer = layui.layer;
    let form = layui.form;

    getUserId();

    function getUserId() {
        $.ajax({
            url: "/my/userinfo",
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！");
                }
                form.val("layuiForm", res.data);
            }
        })
    }

    $(".resetBtn").click(function(e) {
        e.preventDefault();
        getUserId();
    })

    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("修改用户信息失败！");
                }
                layer.msg("修改用户信息成功！");
                window.parent.getUserInfo();

            }
        })
    })
})