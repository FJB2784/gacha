// getIDm*()
// getIDmDummy(seed)
// getIDmDummyWithoutServer(seed)

function getIDm()
{
    const request = new XMLHttpRequest();

    try
    {
        request.open("GET", "http://localhost:8000/", false);
        request.send();
    }
    catch (e)
    {
        console.log("サーバに接続できません");
        return null;
    }

    if (request.status == 200)
    {
        // 読み取り成功
        return request.responseText;
    }
    else
    {
        // 読み取り失敗
        console.log("カード読み取り失敗");
        return null;
    }
}

function getIDmDummy(seed)
{
    const request = new XMLHttpRequest();

    try
    {
        request.open("GET", "http://localhost:8000/getIDmDummy?seed=" + seed, false);
        request.send();
    }
    catch (e)
    {
        console.log("サーバに接続できません");
        return null;
    }

    if (request.status == 200)
    {
        // 疑似IDm生成成功
        return request.responseText;
    }
    else
    {
        // 疑似IDm生成失敗
        console.log("疑似IDm生成失敗");
        return null;
    }
}

// yjdmd5.jsに依存
function getIDmDummyWithoutServer(seed)
{
    return yjd_md5(seed).substring(0, 16);
}

// 非同期通信の残骸
// function getIDmAsync()
// {
//     const request = new XMLHttpRequest();
//     request.open("GET", "http://localhost:8000/");

//     request.addEventListener("load", (event) => {
//         if (event.target.status == 200)
//         {
//             // 読み取り成功
//             console.log(event.target.responseText);
//         }
//         else
//         {
//             // 読み取り失敗 500
//             console.log("カード読み取り失敗");
//         }
//     });

//     request.addEventListener("error", (event) => {
//         // 接続失敗
//         console.log("サーバに接続できません");
//     });
    
//     request.send();
// }