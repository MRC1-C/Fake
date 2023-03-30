function isNumberKey(limitField, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    }
}

function backHistoryPage() {
    window.history.back();
}