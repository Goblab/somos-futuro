import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, 

  tagName: 'div', 
  postToFeed: function (title, desc, url, image, caption) {
      var obj = {method: 'feed', link: url, picture: image, name: title, description: desc, caption: caption, redirect_uri: url, display: 'popup'};

      function callback(response) { console.log(response); }

      if (this.FB) {
        FB.ui(obj, callback);
      } else {
        this.socialApiClient.load().then(function(FB) {
          FB.ui(obj, callback);
        });
      }      
  },

  showShareDialog: function(e){
    var title = this.get('data-title'),
        desc = this.get('data-desc'),
        url = window.location.href,
        caption = this.get('data-caption'),
        image = this.get('data-image');

    this.postToFeed(title, desc, url, image, caption);
  }.on('click')
});
