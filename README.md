![](http://www.fipradio.fr/sites/all/themes/custom/fip/logo.png) [slack-a-fip](https://github.com/npny/slack-a-fip)
===

Notifies a slack channel each time a new song airs, providing the track name and a youtube link.

 * [Create a new incoming webhook](https://my.slack.com/services/new/incoming-webhook) and save the url somewhere.  
 (A separate and private channel would probably be wise, as this is pretty spammy)
 * [Download](https://github.com/npny/slack-a-fip/archive/master.zip) / Clone this repo, then `npm install`.
 * Run the script with your webhook url : `node slack-a-fip.js https://hooks.slack.com/services/.../...`
 * Enjoy sweet, sweet jazz music from the comfort of your Slack.

[MIT](http://opensource.org/licenses/mit-license.php) - Pierre Boyer, 2016.