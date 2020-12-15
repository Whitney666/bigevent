$(function() {
    $(".goToRegis").click(function() {
        $(".login").hide();
        $(".register").show();
    })

    $(".goToLogin").click(function() {
        $(".login").show();
        $(".register").hide();


    })

    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function(value, item) { //value：表单的值、item：表单的DOM对象
            let newValue = $(".passIpt").val();
            // console.log(newValue);
            if (value !== newValue) {
                return "两次密码输入不一致!";
            }
        }
    });

    $(".regisForm").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: "/api/reguser",
            type: "POST",
            data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功!");
                $(".goToLogin").click();
                $(".regisForm")[0].reset();
            }
        })
    })


    $(".loginForm").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: "/api/login",
            type: "POST",
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("登录失败！");
                }
                localStorage.setItem("token", res.token);
                layer.msg("登录成功,即将跳转到首页！", {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    //do something
                    location.href = "/home/index.html";
                });

            }
        })
    })
})