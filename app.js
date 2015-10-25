var app = angular.module('pomodoro', []);

app.factory('time', [function(){
  var o = {
    posts: []
  };
  return o;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
    $scope.test = 'Hello world!';
    $scope.posts = posts.posts;

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
}]);//end of controller
