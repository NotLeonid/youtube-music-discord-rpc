Set s=WScript.CreateObject("WScript.Shell")
Set fso=CreateObject("Scripting.FileSystemObject")
script=fso.GetAbsolutePathName(WScript.ScriptFullName)
startup=fso.BuildPath(s.SpecialFolders("Startup"),"rich-presence-for-youtube-music.lnk")
Set shortcut=s.CreateShortcut(startup)
shortcut.TargetPath=script
shortcut.Save
s.Run "cmd /c server.bat", 0, True
