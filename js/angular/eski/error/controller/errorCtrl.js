;appCRM.controller('errorsController', function($scope, Error) {
        
        $scope.limitList = 20;
        $scope.init = function(){
            $scope.getError();
        };

        $scope.getError = function(){
            Error
                .get()
                .then(function(data){
                    $scope.errorList = data;
                });
        };

        $scope.errorState = function(error, state){
            error.state = state;
            Error.update(error);
        }

        $scope.dateRefresh = function(start, end){
            Error
                .getFilter(moment(start._d).unix(), moment(end._d).unix())
                .then(function(data){
                    $scope.errorList = data;                   
                });

        }
        
        $scope.init();
	});