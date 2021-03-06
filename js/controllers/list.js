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
    $routeProvider.when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'ListController'
    });
});

zvg.controller('ListController', function($scope, $pathList, $timeout) {
    var state = null;
    var n = 0;
    $scope.scrollDisabled = true;
    
    $pathList.get(function(s) {
        state = s;
        $scope.scrollDisabled = false;
    });
    
    $scope.scroll = function() {
        $scope.scrollDisabled = true;
        $timeout(function() {
            n += 12;
            if (n > state.entries.length) {
                n = state.entries.length;
            }
            $scope.entries = state.entries.slice(0,n);
            if (n < state.entries.length) {
                $scope.scrollDisabled = false;
            }
        });
    }
});
