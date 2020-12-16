function getRandomInt(min, max) { //랜덤
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function btAmount() { // 금액설정 버튼
    $("#amount").html(getRandomInt(1, 100) +",000원");
}
function btPhone() { // 휴대폰 번호 입력 버튼
    let textLength = $("#setPhoneNum").text().length;
    if(textLength > 0 && textLength < 4 && textLength%3 == 0) {//휴대폰 번호 입력 (4번째 자리에 - 표시)
        $("#setPhoneNum").append("-" + this.value);
    } else if(textLength > 4 && textLength < 12 && textLength%8 == 0) {//(9번째 자리에 - 표시)
        $("#setPhoneNum").append("-" + this.value);
    } else
        $("#setPhoneNum").append(this.value);
}
function btBackSpace() { //backSpace 버튼
    let str = $('#setPhoneNum').text();
    if (str.substr(str.length-2, 1) == "-") {
        $('#setPhoneNum').html(str.substring(0, str.length-2));
    } else {
        $('#setPhoneNum').html(str.substring(0, str.length-1));
    }
}
function saveAmount() { //로컬스토리지에 데이터 저장
    let x = JSON.parse(localStorage.getItem($("#setPhoneNum").text()));
    let a = {};
    if($("#amount").text() == "") {
        alert("금액을 설정해 주세요.")
    }
    else if($("#setPhoneNum").text() == "") {
        alert("휴대폰 번호를 입력해주세요.");
    }
    else {
        if(x==null) { //해당 휴대폰 번호가 존재하지 않을 때
            a.amount = [parseInt($("#amount").text().replace(",", ""))]; //replace로 ,을 없애주고 parseInt로 자료형 number로 바꾸기
            a.count = 1;
            a.date = [new Date().toLocaleDateString()];
            localStorage.setItem($("#setPhoneNum").text(), JSON.stringify(a));
            x = a;
        } else { //휴대폰 번호가 존재할 때
            x.amount.push(parseInt($("#amount").text().replace(",", "")));
            x.count++;
            x.date.push(new Date().toLocaleDateString());
            localStorage.setItem($("#setPhoneNum").text(), JSON.stringify(x));
        }
        //적립 금액 합계
        let sumAmount = 0;
        for(let item of x.amount)
            sumAmount += item;
        /*sumAmount = sumAmount + "";
        sumAmount = sumAmount.splice(sumAmount.length, 1);*/
        $("#tdAmount").html(sumAmount+"원");
        $("#tdCount").html(x.count);
    }
}

$(document).ready(function() {
    $("#setAmount").click(btAmount);
    $("#backSpace").click(btBackSpace);
    $(".btPhone").click(btPhone);
    $("#saveAmount").click(saveAmount);

    //document.querySelector("#setAmount").addEventListener("click", btAmount);
    //document.querySelector("#backSpace").addEventListener("click", btBackSpace);
    /*let phoneBt = document.querySelectorAll(".btPhone");
    for(let item of phoneBt){
        item.addEventListener("click", btPhone);
    }*/
});