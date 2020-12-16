$(function() {
    let form = layui.form;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        oldPwd: value => {
            let oldValue = $(".oldPwd").val();
            if (value === oldValue) {
                return "新密码和原密码不能一样!";
            }
        },
        newPwd: value => {
            let newValue = $(".newPwd").val();
            if (value !== newValue) {
                return "确认密码和新密码不一致!";
            }
        }
    });

    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("更新密码成功！");
                $(".layui-form")[0].reset();
            }
        })
    })


})