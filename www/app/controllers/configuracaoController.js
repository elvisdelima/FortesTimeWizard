angular.module('app.controllers')
.controller('ConfigCtrl', function($scope) {
       
    $scope.data = {'pis':localStorage.getItem("pis")||""};
    $scope.salvo = $scope.data.pis ? true : false;
    
    $scope.$watch("data.pis",function(nValue,oValue){
        $scope.salvo = nValue===oValue&& nValue!=="";
    });
    
    $scope.SalvarPis = function(){
        localStorage.clear();
        localStorage.setItem("pis",$scope.data.pis);        
        $scope.salvo = $scope.data.pis?true:false;
    }
    
});
