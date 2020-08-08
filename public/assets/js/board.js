function templateBoard(element) {
    return `<tr >
    <td><a id="${element.val().newPostKey}" style="color: black;text-decoration:none;">${element.val().title}</a></td>
    <td style="text-align:right"><a id="${element.val().newPostKey}" style="color: black;text-decoration:none">${element.val().createdAt}</a></td>

    </tr>
    <th class="${element.val().newPostKey}
    "colspan=3 style="display: none; background:#F9F9F9; padding:40px;color: black; font-weight: normal">
    ${element.val().contents}
    <br><br>
    <div class="auth">
    <textarea class="box_upd ${element.val().newPostKey}"> ${element.val().contents}</textarea> <br><br><br>
    <button id="${element.val().newPostKey}" class="delete_bn">삭제</button>
    <button id="${element.val().newPostKey}" class="update_bn">수정 저장</button>
    </div>
    </th>

    `;
}

$(document).ready(function () {
    var ref = firebase.database().ref("post/");
    ref.orderByChild('reverseCreatedAt').limitToFirst(10).once("value", function (data) {
        var fir = `<table><thead><td>제목</td><td style="text-align:right">작성일</td></thead>`
        data.forEach(element => {
            fir = fir + templateBoard(element);
        })
        fir += "</table>";
        $("#board").html(fir);
        $("a").hover(function () {
                $(this).css("text-decoration", "underline");
            },
            function () {
                $(this).css("text-decoration", "none");
            });

        $("a").click(function () {
            var submenu = $(this).attr("id");
            console.log(submenu);
            $("th").css("display", "none")
            $("." + submenu).css("display", "")
            console.log("in");
        });

        $(".delete_bn").click(function () {
            var objectDel = $(this).attr("id")
            var ref = firebase.database().ref("post/" + objectDel + "/")

            ref.remove().then(function () {
                    alert("삭제완료")
                    window.location.reload()
                })
                .catch(function (error) {
                    console.log("Remove faliled" + error.message);
                });
        })

        $(".update_bn").click(function () {

            var objectUpd = $(this).attr("id")
            console.log("objectUpd:", objectUpd)
            // var vv = $(".box_upd" + "." + objectUpd).val()
            // console.log("vv:", vv)
            var ref = firebase.database().ref("post/" + objectUpd + "/");
            var udate = {
                contents: $(".box_upd" + "." + objectUpd).val(),

            }
            ref.update(udate).then(function (element) {
                alert("수정완료")
                window.location.reload()
            })
        })
        $(".writer").css("display", "none");
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {} else {
                $(".auth").css("display", "none")
                $("#auth").css("display", "none")
            }

        })


    })
});


function createpost() {
    var user = firebase.auth().currentUser;
    if (user) {

        function getFormatDate(date) {
            var year = date.getFullYear() + ".";
            var month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month + ".";
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;
            return year + '' + month + '' + day;
        }
        var d = new Date();
        var date = new Date();
        date = getFormatDate(date);


        var newPostKey = firebase.database().ref().child("post/").push().key;
        firebase.database().ref("post/" + newPostKey)
            .set({
                title: $("#title").val(),
                uid: user.uid,
                newPostKey: newPostKey,
                createdAt: date,
                reverseCreatedAt: -d.getTime(),
                contents: $("#message").val()
            })
            .then(function (result) {
                alert("등록완료")
                window.location.reload()
            })


    }
}

function viewAll() {
    $("#viewAll_bn").css("display", "none");
    var ref = firebase.database().ref("post/");
    ref.orderByChild('reverseCreatedAt').once("value", function (data) {
        var fir = "<table><thead><td>제목</td><td style='text-align:right'>작성일</td></thead>"
        data.forEach(element => {
            fir = fir + templateBoard(element);
        })
        fir += "</table>";
        $("#board").html(fir);
        $("a").hover(function () {
                $(this).css("text-decoration", "underline");
            },
            function () {
                $(this).css("text-decoration", "none");
            });

        $("a").click(function () {
            var submenu = $(this).attr("id");
            console.log(submenu);
            $("th").css("display", "none")
            $("." + submenu).css("display", "")
            console.log("in");
        });

        $(".delete_bn").click(function () {
            var objectDel = $(this).attr("id")
            var ref = firebase.database().ref("post/" + objectDel + "/")

            ref.remove().then(function () {
                    alert("삭제완료")
                    window.location.reload()
                })
                .catch(function (error) {
                    console.log("Remove faliled" + error.message);
                });
        })

        $(".update_bn").click(function () {

            var objectUpd = $(this).attr("id")
            console.log("objectUpd:", objectUpd)
            // var vv = $(".box_upd" + "." + objectUpd).val()
            // console.log("vv:", vv)
            var ref = firebase.database().ref("post/" + objectUpd + "/");
            var udate = {
                contents: $(".box_upd" + "." + objectUpd).val(),

            }
            ref.update(udate).then(function (element) {
                alert("수정완료")
                window.location.reload()
            })
        })

    })

}
