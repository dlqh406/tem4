function login() {

    firebase.auth().signInWithEmailAndPassword(
        $("#textemail").val(), $("#textpassward").val()).then(function (result) {

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = "아이디와 비밀번호를 재확인해주세요";
        alert(errorCode)
    })
}

function logout() {
    firebase.auth().signOut().then(function () {
        // deploy 시 public 지워
        console.log("in")
        window.open("./", "_self", false);
    }, function (error) {

    })
}