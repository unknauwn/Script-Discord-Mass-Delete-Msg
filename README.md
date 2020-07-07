## Script JS for Mass Deleting Discord Messages

Before starting, you need to enable Developper Mode on your Account Settings from Discord

Get your **UserID** & **ServerID** by right clicking on your Image & Server Image then Copy ID.

Check how to open console from your Brower(eg Firefox: CTRL+SHIFT+C then click on "console" tab)

###### Delete PM Messages
Update Variable:
**const author = "USER_ID";**
Replace **USER_ID** by yours

Be sure to select the PM target for messages purge

Copy whole code and paste it in your Explorer Console then press Enter, Process will start and display the timer estimated, progress.

###### Delete Server Messages
Update Variable:
**const server = "SERVER_ID"**
**const author = "USER_ID";**
Replace **USER_ID** & **SERVER_ID** by yours

Be sure to select the Server target for messages purge
You can Delete all messages from whole Server or only a target channel from Server, just comment "**const channel = window.location.href.split('/').pop();**" for delete whole Server message

Copy whole code and paste it in your Explorer Console then press Enter, Process will start and display the timer estimated, progress.
