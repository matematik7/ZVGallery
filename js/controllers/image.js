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
    $routeProvider.when('/image', {
        templateUrl: 'templates/image.html',
        controller: 'ImageController'
    });
});

zvg.controller('ImageController', function($scope, $pathList, $rootScope, $document, $location) {
    var state = null;
    $pathList.get(function(s) {
        state = s;
        if (state.current === null) {
            $rootScope.error = "Not a valid file.";
        } else {
            $scope.show = true;
            $scope.entry = state.entries_files[state.current];
        }
        $scope.nextImage = $pathList.next;
        $scope.previousImage = $pathList.previous;
    });
});
