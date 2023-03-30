$(document).ready(function () {
    $("#registerModel_Email").blur(function () {
        var $this = $(this);
        var isError = $this.parent().next().hasClass("field-validation-error");

        if (isError) {
            $this.addClass("input-error");
            $this.next().removeClass("display-none");
        } else {
            $this.removeClass("input-error");
            $this.next().addClass("display-none");
        }
    });

    $("#registerModel_Password").blur(function () {
        var $this = $(this);
        var isError = $this.parent().next().hasClass("field-validation-error");

        if (isError) {
            $this.addClass("input-error");
        } else {
            $this.removeClass("input-error");
        }
    });

    $("#registerModel_ConfirmPassword").blur(function () {
        var $this = $(this);
        var isError = $this.parent().next().hasClass("field-validation-error");

        if (isError) {
            $this.addClass("input-error");
        } else {
            $this.removeClass("input-error");
        }
    });

    //$("#UsernameOTP").keyup(function () {
    $("#UsernameOTP").keyup(function () {
        var regex_Mobile = /(09|08|07|05|01[2|6|8|9]|03)+([0-9]{8})\b/g;
        var $this = $(this).val();
        if ($this !== "") {
            var isMobile = regex_Mobile.test($this);
            if (isMobile && $this.length <= 10) {
                $("#errorValidPhone").addClass("display-none");
                checkUser($this);
                //checkRuleSendSMS($this);
                //checkExistAccount($this);
            } else {
                var regex_Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
                var isEmail = regex_Email.test($this);
                if (isEmail) {
                    $("#btnLoginUserPass").removeClass("display-none");
                    $("#btnLoginMocha").removeClass("display-none");
                    $("#btnContinue").addClass("display-none");
                    //$("#divPassword").removeClass("display-none");
                    $("#labelExistPassword").removeClass("display-none");
                    $("#errorValidPhone").addClass("display-none");
                } else {
                    $("#errorValidPhone").removeClass("display-none");
                }
            }
        } else {
            $("#errorValidPhone").addClass("display-none");
        }
    });
    
    
});
function checkFormatPhoneNumber(text){
    var regex_Mobile = /(09|08|07|05|01[2|6|8|9]|03)+([0-9]{8})\b/g;
    var isMobile = regex_Mobile.test(text);
    return isMobile
}
function checkformatEmail(text) {
    var regex_Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    var isEmail = regex_Email.test(text);
    return isEmail
}
// SMS Login
function smsLogin(mobile) {
    var countryCode = document.getElementById("country_code").value;
    var phoneNumber = mobile;
    AccountKit.login(
        'PHONE',
        {
            countryCode: countryCode,
            phoneNumber: phoneNumber
        },
        loginCallback
    );
}

function checkUser(phone) {
    $.ajax({
        url: '/Account/CheckPasswordUser',
        type: 'POST',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: { phoneNumber: phone },
        success: ajaxOnSuccess
    });
}

function ajaxOnSuccess(data) {
    if (data) {
        $("#btnLoginUserPass").removeClass("display-none");
        $("#btnLoginMocha").removeClass("display-none");
        $("#btnContinue").addClass("display-none");
        //$("#divPassword").removeClass("display-none");
        $("#labelExistPassword").removeClass("display-none");
    } else {
        $("#btnLoginUserPass").addClass("display-none");
        //$("#btnLoginMocha").addClass("display-none");
        $("#btnContinue").removeClass("display-none");
        //$("#divPassword").addClass("display-none");
        $("#labelExistPassword").addClass("display-none");
    }
}

function checkRuleSendSMS(phone) {
    $.ajax({
        url: '/Account/CheckRuleSendSms',
        type: 'POST',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: { phoneNumber: phone, sendOtpType: 1 },
        success: ajaxOnSuccessSendSms
    });
}

function ajaxOnSuccessSendSms(data) {
    if (data) {
        $("#divErrorSendRuleSms").removeClass("display-none").addClass("noti-appear");
        $("#btnContinue").addClass("disabled");
        setTimeout(function () {
            $("#divErrorSendRuleSms").removeClass("noti-appear");
        }, 4000);
    } else {
        $("#divErrorSendRuleSms").addClass("display-none");
        $("#btnContinue").removeClass("disabled");
    }
}

function checkExistAccount(phone) {
    $.ajax({
        url: '/Account/CheckExistAccount',
        type: 'POST',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: { phoneNumber: phone, sendOtpType: 1 },
        success: ajaxOnSuccessExistAccount
    });
}

function ajaxOnSuccessExistAccount(data) {
    if (data) {
        $("#btnLoginMocha").removeClass("display-none");
    } else {
        $("#btnLoginMocha").addClass("display-none");
    }
}

function onShowLoginOTP() {
    $("#AccountLoginOTP").removeClass("display-none");
    $("#AccountPassword").addClass("display-none");
    $(".login-container-tab .nav-tabs li a[href='#tab-signup']").trigger("click");
}

function onHideLoginOTP() {
    $("#AccountPassword").removeClass("display-none");
    $("#AccountLoginOTP").addClass("display-none");
    $("#divPassword").addClass("display-none");
    $(".login-container-tab .nav-tabs li a[href='#tab-fast-login']").trigger("click");
}

function onHideLoginOTPOrigin() {
    $("#AccountPassword").removeClass("display-none");
    $("#divPassword").addClass("display-none");
    $("#AccountLoginOTP").addClass("display-none");
}

function onShowLoginPassword() {
    $("#AccountLoginOTP").addClass("display-none");
    $("#divPassword").addClass("display-none");
    $("#AccountPassword").removeClass("display-none");
    $(".login-container-tab .nav-tabs li a[href='#tab-signup']").trigger("click");
}

function loginUserPass() {
    $("#btnLogin").removeClass("display-none");
    $("#divPassword").removeClass("display-none");
    $("#btnLoginUserPass").addClass("display-none");
    $("#btnLoginMocha").addClass("display-none");
}