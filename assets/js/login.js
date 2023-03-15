$(function () {
    // 点击 link_reg 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 link_login 的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 自定义密码的校验规则
    // 从layui中获取form对象，通过form.verify()函数自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 密码的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 密码确认时的校验规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框的内容
            // 还要拿到密码框的内容
            // 判断
            var pwd = $('.reg-box [name=password]').val()
            console.log(pwd);
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交功能
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/前后端交互/大事件项目/index.html'
            }
        })
    })
})  