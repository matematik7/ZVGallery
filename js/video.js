/*  ZVGallery
 *  =========
 *  Copyright 2014 Domen Ipavec <domen.ipavec@z-v.si>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

zvg.config(function($routeProvider) {
    $routeProvider.when('/video', {
        templateUrl: 'templates/video.html',
        controller: 'VideoController'
    });
});

zvg.controller('VideoController', function($scope, $routeParams, $http, $filter, $location) {
    var path = $routeParams['path'];
    if (path == undefined) {
        $location.path('/');
    }
    
    $scope.breadcrumbs = [{name: $filter('translate')('Home'), path: '/'}];
    var current_path = '';
    angular.forEach(path.split("/"), function(value) {
        if (value.length < 1) {
            return;
        }
        current_path += '/' + value;
        $scope.breadcrumbs.push({name:value, path:current_path});
    });
    $scope.activeBreadcrumb = $scope.breadcrumbs.pop().name;
    
    var player = _V_("video-player");
    player.ready(function() {
        player.pause();
        $("#video-player-source").attr("src", "backend.php?c=video&p="+path);
        player.load();
    });
    
    $scope.$on('$destroy', function() {
        player.dispose();
    });
});