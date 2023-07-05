Set s=WScript.CreateObject("WScript.Shell")
Set fso=CreateObject("Scripting.FileSystemObject")
script=fso.GetAbsolutePathName(WScript.ScriptFullName)
startup=fso.BuildPath(s.SpecialFolders("Startup"),"youtube-music-discord-rpc-server.lnk")
Set shortcut=s.CreateShortcut(startup)
shortcut.TargetPath=script
shortcut.Save
s.Run "cmd /c server.bat", 0, True