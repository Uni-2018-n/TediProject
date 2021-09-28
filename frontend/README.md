Read me file for front end:

to run this vue project we need to have npm installed and do:
npm install to install the node modules and
npm run serve to run it.
the program then will print where the port that it listens, the protocol and the address that it listens to.

There is a chance that it might be needed to use this command:
npm install vue@next
this is to install some of the vue's core modules.

user home page has a sign in and register tab, on register every field is required except phone number and profile picture, those could be set on register but it also could be set later on the settings tab etc.

Generaly speaking the page layout has 3 compartments, 
the top compartment is the navigation bar:
Here we also have 3 segments, first the main button going to the main page of a logged in user, at the midle we have a search bar once you hover over the search button a search input slides into view and there you can right the name of a user you want to find(could be connected with you or not). This action works both by pressing the enter button or pressing the search icon. After that we have a list with all the tabs that are available in this site followed by a logout button that helps to logout the user.
The middle compartment is diffrent for each tab and will be analized later.
The bottom button is a footer for tha page with some dummy data popup when pressing the terms of use item. Used only for cosmetic purposes.

(Its good to mention that all the popups are closed by a top left X button.)


In more depth about each tab,
first of all we have the main page, 
At the left we have a small segment indicating the user we are currently logged in with some information if the information exists(user's education) and finally a connections button redirecting to the user's network tab. Finally its good to mention that the left compartment is set to sticky so even when the user scrolls down the compartment is always into view.
After that there is a input compartment used to generate new posts, this compartment accepts photos, voice files and video files by pressing the desired media button and as the user appends it there is a preview available showing each image, video and voice file a user has provided. The images and videos are in a group of maximum 4 and if the user wants to preview more than 4 files all there is to do is click on an image and all of the media will popup.
In more depth about the post printing, the media files and the text are viewed exatly as previewed while generating the post, each post can be liked or unliked and can have comments. To post a comment we need to press the comment button to print all post's comments and type the new comment we want to append. After that the comment will be only posted with a click of the enter button.


The network tab:
Here we have a list with each user that is connected with us, for each user we show the user's photo, name and some other information if they are available.

After clicking on a user we are redirected to the users public profile, since we are friends with the user we see every available information the user has.
Incase we go to the users profile by searching them form the search bar if we are not friends with the user it will be printed everything the user has set to public.
In the users profile we can connect request them or if we are friend we could start a new conversation with them.

In applications tab:
Here the middle compartment is a tab list, the My jobs tab lets us append a new job, each job is required to have some description and at least one skill to be accepted to post.
Bellow the job generation compartment we have each job that we have posted. Each job has a button that redirects to the Requests tab showing all the applications that are for the specific job we selected. Each request can be pressed and a popup will be shown showing the applicant's description the skills that the applicant appened and the resume file.
The middle tab named Jobs shows all the jobs that the specific user could be intrested at, each job is shown as generated with all the information, for each job there is an intrest button opening a popup that lets the user add all the nessasary information to apply for the specific job.

At Communications tab:
Here we again have 2 compartments, left compartment shows a list with all the users that we have started a conversation, we can start also a new conversation by the chat icon that opens a popup used to search the user we want to chat with. We can press each user we have started a conversation and at the right will open a component that will show all the chat and let us send new messages. If there arent any open conversations the chat wont be printed, if there are the first (latest) conversation will be laoded by default.

For Notifications tab:
here we have 2 segments, first segment is for connection requests, we could accept or reject the request.
Second segment is for showing the notifications that may be available. We can receive a notification if a user liked one of our posts or if a user adds a comment to one of our posts, each action if we click on a notification we will be redirected to a special page with only our post to see the like or new comment.

For Personal information tab:
Here we see our profile page, here we can update our profile picture, update our work status, update our education field or our skills array.
This profile page is to preview and edit this information. Its generally the same as the public profile page but with some edit features and popups. 
For each information(except profile picture) there is a edit button at the right side. Once we click this we can edit the set information, set it to public and set it to public or private view.
For the current work place we are viewing only the latest work place, on edit you could also view the history of work places we have but its not public.

For Settings tab:
Here we could update our profile picture by pressing into the old picture and selecting the new one.
Also here we can change other information like user's email, phone number and password. 
The user's email input element is set to disabled since its pre-filled with information but if the user clicks on the element the email gets cleared and the user can now set the new email if needed.
For each change we do we need to click the update button, if something of the above elements are edited by clicking the update button we will update them and the un-edited elements will stay as set before.
There is a reset option incase the user needs to make sure that no information was changed by mistake.

Incase the user wants to logout from the site, simply press the logout tab and will be redirected to the login page.
If the user is not loged in the user wont have access to any of the above tabs and will be redirected to the login page.

The admin page:
Only one user can access the admin page and the user will be redirected to that page after login.
At the top of the admin page we have a search bar searching by user name or by id. The name searching can be by write an aproximate name and print all the names that are close with the searching input but the id must be exactly the id of the user.
After that we have some actions that we need to use only if we need to generate the files.
If we click the select button when clicking the users we are selecting them and adding them to an array so when we hit the export button we will download a JSON or XML file.

If select isnt pressed if we click on a user we get a popup with all the information we have on the user.

Its good to mention that on login the user is redirected to the admin page but could also go to the other pages as a normal user by changing the link to a /user etc. This is done so the admin can be a normal user if its desired. Also the admin can logout by /logout or by going to the main site and hitting the logout button.