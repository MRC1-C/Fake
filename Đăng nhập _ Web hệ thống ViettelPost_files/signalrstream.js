var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/socket")
    .build();

(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield connection.start();
    }
    catch (e) {
        console.error(e.toString());
    }
}))();

$.holdReady(true);
$.getScript("/lib/signalr/signalr.js", function () {
    $.holdReady(false);
    setTimeout(function () {
        try {
            const qrCodeId = document.getElementById("qrCodeId").value;
            connection.stream("listen", 1000, qrCodeId)
                .subscribe({
                    next: (item) => {
                        console.log(item);
                    },
                    complete: () => {
                        console.log("Confirm success.");
                        var redirect_uri = encodeURIComponent(getUrlParameter("ReturnUrl"));
                        if (redirect_uri === 'undefined')
                            redirect_uri = encodeURIComponent(getUrlParameter("returnUrl"));
                        window.location.replace(`/Home/QrCode?qrCodeId=${qrCodeId}&returnUrl=${redirect_uri}`);
                    },
                    error: (err) => {
                        console.log("Connection error.");
                    }
                });
        } catch (e) {
            console.error(e.toString());
        }
    }, 1000);
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};