var money = 100;
var point1 = 0;
var Timer;
var idm;
document.getElementById("gacha").style.display = "none";

//全体の処理
var main = function () {
    myfunc2();
    setTimeout(myfunc, 5000);
    console.log(idm);
}

// ガチャの処理
var myfunc = function () {
    stop = 1;
    randomNumber = Math.floor(Math.random() * 100);
    un = 0;

    if (randomNumber < 1) {
        rea = "SR";
        randomNumber = Math.floor(Math.random() * 3);
        un = monster[randomNumber][0];
        point1 = 300;
    } else if (randomNumber < 19) {
        rea = "R";
        randomNumber = Math.floor(Math.random() * 3) + 3;
        un = monster[randomNumber][0];
        point1 = 50;
    } else if (randomNumber < 99) {
        rea = "N";
        randomNumber = Math.floor(Math.random() * 5) + 6;
        un = monster[randomNumber][0];
        point1 = 10;
    } else {
        rea = "N";
        randomNumber = 6;
        un = monster[randomNumber][0];
        point1 = 10;
    }
    console.log(rea);
    console.log(un);
    db();

    // canvas上に文字を表示
    theCanvas = document.getElementById("cv");
    context = document.getElementById("cv").getContext("2d");
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    context.font = "italic 40px Arial";
    context.strokeStyle = "blue";
    context.strokeText(rea, 100, 30, 150);
    context.strokeText(un, 100, 80, 150);
    context.font = "italic 20px Arial";
    context.strokeText(monster[randomNumber][1], 100, 150, );
    img = new Image();
    img.onload = function onImageLoad() {
        context.drawImage(img, 100, 180);
    }
    img.src = "img/" + randomNumber + '.png';
    setTimeout(reload, 500);
}


// 配列
var monster = [
    ['ねこです', 'よろしくおねがいします'], ['ネコチュウ', 'ネズミだよね'], ['ネッコーマウス', 'ネズミでしょ'],// 0~2はSR
    ['ドラ〇もんのｶﾞｰﾙﾌﾚﾝﾄﾞ', 'みんな知ってるね'], ['ネコ・アン・ローズ', '本名は猫田'], ['素晴らしきヒィッツネコルド', '俺より強い猫に会いに行く'],// 3~5はR
    ['藤原ネコヤ', 'あ゛ぁ゛ぁ゛ぁ゛あ゛ああ゛あ゛!!!'], ['アノネコノ猪木', '元気ではない'], ['ネコノオワリ', 'ドラゲナイ'], ['猫の極み乙女', 'STAP細胞はある'], ['猫苦情', '実家がボブ術の道場をやってるらしい'], // 6~11までN
];


var myfunc2 = function () {// アニメーションの処理
    var canvas = document.getElementById("cv");
    var ctx = canvas.getContext("2d");
    var imgCnt = 8;  // 描画する画像の数
    var aryImg = [];  // 画像の情報を格納
    var cvsw = 800;   // canvasタグに指定したwidth
    var cvsh = 600;   // canvasタグに指定したheight
    var imgBaseSizeW = 105;  // 画像の基本サイズ横幅
    var imgBaseSizeH = 105;  // 画像の基本サイズ立幅

    // 画像の読み込み
    var img = new Image();
    img.src = "img/nck.png";
    img.onload = flow_start;

    // 画像のパラメーターを設定
    function setImagas() {
        for (var i = 0; i < imgCnt; i += 2) {
            var x = 100;
            aryImg.push({
                "posx": x * i,     // 初期表示位置x
                "posy": 500,     // 初期表示位置y
                "sizew": imgBaseSizeW,          // 画像の横幅
                "sizeh": imgBaseSizeH,          // 画像の縦幅
            });
        }
    }

    // 描画、パラメーターの更新
    var idx = 0;
    function flow() {
        for (var idx = 0; idx < imgCnt; idx++) {// imgCntが画像の数、idxは現在の画像の数
            aryImg[idx].posy = aryImg[idx].posy - 3;// 上下に向かって進む
            ctx.drawImage(img, aryImg[idx].posx, aryImg[idx].posy, aryImg[idx].sizew, aryImg[idx].sizeh);
            ctx.drawImage(img, aryImg[idx].posx + 100, 500 - aryImg[idx].posy, aryImg[idx].sizew, aryImg[idx].sizeh);
            // 範囲外に描画された画像を上に戻す
            if (aryImg[idx].posy <= -100) {stopTimer(); break; }
            ctx.font = "italic 40px Arial"; //フォントにArial,40px,斜体を指定
            ctx.strokeStyle = "blue"; //輪郭線の色を青に
            ctx.strokeText("cat！！", 300, 300, 150);
            //console.log("aaa");
        }
        console.log("bbb");
    }

    function flow_start() {
        setImagas();
        Timer = setInterval(flow, 10);
    }

    function stopTimer() {
        clearInterval(Timer);
        console.log("ccc"); 
    }

}

// IDの読み込み
function printIDm() {
    var idm = getIDm();
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        document.getElementById("gacha").style.display = "inline";
    });
}

// テストID読み込み
function printIDmDummyWithoutServer() {
    var database = firebase.database();
    var seed = "1";
    idm = getIDmDummyWithoutServer(seed);
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        document.getElementById("gacha").style.display = "inline";
        console.log(idm)
    });
}

// 画面更新
function reload() {
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        tetes1 = snapshot.child("money").val();
        tetes2 = snapshot.child("name").val();
        console.log(tetes1);
        console.log(tetes2);
    });
}

// ポイント増減
function db() {
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        var money1 = snapshot.child("money").val();
        var updates = {};
        updates['/' + idm + '/money'] = money1 + point1;
        return firebase.database().ref().update(updates);
    });
}

// ログアウト
function logout() {
    idm = null;
    if (idm == null) { document.getElementById("gacha").style.display = "none"; }
    document.getElementById("UserName").innerHTML = 'ユーザー名：' + 'ログインしてください';
    document.getElementById("Point").innerHTML = 'ポイント：' + 'ログインしてください';
}