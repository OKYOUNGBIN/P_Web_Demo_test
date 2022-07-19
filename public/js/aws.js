const { savedUrl } = await fetch("/s3UrlSaved").then((res) => res.json()); // 편집한 glb s3 bucket
const { htmlUrl } = await fetch("/s3UrlHtml").then((res) => res.json()); // scene viewer html 파일 s3 bucket

const exportGlb = document.querySelector("#glbExportBtn");
exportGlb.addEventListener("click", exportModelViewer);
async function exportModelViewer() {
  const modelViewer = document
    .querySelector("#editing_adapter")
    .shadowRoot.querySelector("model-viewer");
  const glTF = await modelViewer.exportScene();
  var file = new File([glTF], "");

  // post the image direclty to the s3 bucket
  await fetch(savedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  const savedGlbUrl = savedUrl.split("?")[0];
  console.log(savedGlbUrl);

  const htmlComponent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Model Viewer</title>
            <link rel="stylesheet" href="./style.css">
            <link rel="shortcut icon" type="image/png" href="../../shared-assets/icons/favicon.png" />
            <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        </head>
        <body>
        <model-viewer
        camera-controls
        ar
        ar-modes="scene-viewer quick-look webxr"
        autoplay
        environment-image="https://xr-box.s3.ap-northeast-2.amazonaws.com/shop_file/xr-viewer/images/photo_studio_01_1k.hdr"
        exposure="0.35"
        alt="B_Shelf"
        src="${savedGlbUrl}"
        bounds="tight">
            <button class="arStart" slot="ar-button">
                <span class="material-icons">view_in_ar</span>
                <br>
                <b>XR 미리보기</b>
            </button>
        </model-viewer>
        </body>
        </html>`;
  const newHtmlDoc = document.implementation.createHTMLDocument();
  newHtmlDoc.innerHTML = htmlComponent;

  // post the image direclty to the s3 bucket
  await fetch(htmlUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "text/html",
    },
    body: htmlComponent,
  });
  const htmlViewerUrl = htmlUrl.split("?")[0];
  console.log(htmlViewerUrl);

  let originHtmlUrl = htmlViewerUrl;
  const replaceHtmlUrl = originHtmlUrl.replace(
    "xr-box.s3.ap-northeast-2.amazonaws.com/",
    "d2d3yuaczk15qx.cloudfront.net/"
  );
  document.getElementById("inputUrl").value = replaceHtmlUrl;
  let copyText = document
    .getElementById("urlCopyBtn")
    .addEventListener("click", urlCopy);
  function urlCopy() {
    document.querySelector("#inputUrl").select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setTimeout(function () {}, 2500);
  }
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: `${replaceHtmlUrl}`,
    width: 128,
    height: 128,
    colorDark: "#ffffff",
    colorLight: "#000000",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

const downloadGlb = document.getElementById("downloadGlb");
downloadGlb.addEventListener("click", localDownGlb);
async function localDownGlb() {
  const modelViewer = document.getElementById("editing_adapter").shadowRoot.querySelector("model-viewer");
  const glTF = await modelViewer.exportScene();
  var file = new File([glTF], "export.glb");
  var link = document.createElement("a");
  link.download = file.name;
  link.href = URL.createObjectURL(file);
  link.click();
}