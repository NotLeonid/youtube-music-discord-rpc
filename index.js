'use strict';

const WebSocket=require('ws');
const DiscordRPC=require('discord-rpc');
const clientId="1124795067509510214";
DiscordRPC.register(clientId);
var rpc;

var unknown="(unspecified)";
var cooldown=0;

rpc=new DiscordRPC.Client({transport:'ipc'});
rpc.on("ready",()=>{});
rpc.login({clientId}).catch(console.error);

setTimeout(process.exit,1000*60*10);

function timeToMs(str){const items=str.split(":").map(Number);let h=0;let m=0;let s=0;if(items.length==3){[h,m,s]=items;}else if(items.length==2){[m,s]=items;}return ((h*60+m)*60+s)*1000;}
function change(title,artist,time,thumbnail){
if(!rpc.user)return;
title=title||unknown;
artist=artist||unknown;
time=time||"0:00:00";
thumbnail=thumbnail||"icon";
var startTimestamp=new Date(new Date().getTime()-timeToMs(time||"0:00:00"));
rpc.setActivity({details:title,state:artist,startTimestamp,largeImageKey:thumbnail,largeImageText:title,instance:false,smallImageKey:thumbnail=="icon"?undefined:"icon",smallImageText:"YouTube Music",buttons:[{label:"I want this too!",url:"https://github.com/NotLeonid/youtube-music-discord-rpc"}]});
}
function stop(){rpc.destroy();process.exit();}//if(!rpc.user)return;rpc.setActivity();}

const wss=new WebSocket.Server({port:33444,host:'127.0.0.1'});
wss.on('connection',async function connection(ws,req){
ws.on('message',async function incoming(data){
var data=JSON.parse(data);
if(data.action=="stop"){stop();}
else if(data.action=="change"){
if(!rpc)startRPC();
if(cooldown-new Date().getTime()<0){change(data.title,data.artist,data.time,data.thumbnail);cooldown=new Date().getTime()+5000;}
}
});
ws.on('close',async function incoming(data){stop();});
});
