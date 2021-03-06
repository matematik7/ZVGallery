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

var LoginController = zvg.controller("LoginController", function($scope, $http, $route) {
    $scope.loggedIn = false;
    
    $http.get("backend.php?c=user").success(function(data) {
        $scope.loggedIn = data.success;
    });
    
    $scope.logout = function() {
        $http.get("backend.php?c=logout").success(function() {
            $scope.loggedIn = false;
            $route.reload();
        });
    };
    
    $scope.login = function() {
        $scope.showError = false;
        $http({
            method: 'POST',
            url: "backend.php?c=login",
            data: $.param({
                'username': $scope.username,
                'password': $scope.password
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            if (data.success == true) {
                $scope.loggedIn = true;
                $route.reload();
            } else {
                $scope.showError = true;
            }
        });
    };
});