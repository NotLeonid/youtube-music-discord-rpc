var ytmusicdiscordrpc;
function ytmusicdiscordrpc_connect(){
ytmusicdiscordrpc=new WebSocket("ws://localhost:33444");
ytmusicdiscordrpc.onclose=(e)=>{setTimeout(ytmusicdiscordrpc_connect,5000);};
}
setInterval(async function(){
if(!ytmusicdiscordrpc.readyState)return;
if(ytmusicdiscordrpc.readyState!=ytmusicdiscordrpc.OPEN)return;
if(document.querySelector("#progress-bar").ariaValueText=="0:00 of NaN:NaN")return;
var title=await document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > yt-formatted-string").innerText;
var artist=await document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span").innerText.replaceAll("\n","").split("•")[0].trim();
var time=await document.querySelector("#left-controls > span").innerText.split("/")[0].trim();
var thumbnail=await document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img").src;
ytmusicdiscordrpc.send(JSON.stringify({action:"change",title:title,artist:artist,time:time,thumbnail:thumbnail}));
},1000);
ytmusicdiscordrpc_connect();
