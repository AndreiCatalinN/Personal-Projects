Live reload can be used when developing on iOS and Android devices. 
This is particularly useful when writing code that interacts with 
native plugins - we must run it on a device to verify that it works.
Therefore, being able to quickly write, build, test, and deploy code
is crucial to keeping up our development speed.

To do this run (NOT WORKING): 
<strong>npm run start-android</strong>
 or 
<strong>npm run start-ios</strong>

After building the new app, run using:
ionic cap open android

Every time a build is performed(e.g. ionic build) that updates the 
web directory (default: www), you'll need to copy those changes into
your native projects: <strong>ionic cap copy</strong>

Note: After making updates to the native portion of the code 
(such as adding a new plugin), use the sync command:
<strong>ionic cap sync</strong>
