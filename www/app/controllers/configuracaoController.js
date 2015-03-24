angular.module('app.controllers')
.controller('ConfigCtrl', function($scope,$cordovaVibration,$cordovaDialogs) {
       
    $scope.data = {'pis':localStorage.getItem("pis")||"",'vibra':localStorage.getItem("vibra")==="true"||false,'sound':localStorage.getItem("sound")==="true"||false};
    $scope.salvo = $scope.data.pis ? true : false;
    
    $scope.$watch("data.vibra",function(nValue,oValue){
        localStorage.setItem("vibra",nValue);
        
        if(nValue)
            $cordovaVibration.vibrate(1000);
    });
    $scope.$watch("data.sound",function(nValue,oValue){
        localStorage.setItem("sound",nValue);
        if(nValue)
            $cordovaDialogs.beep(1);    
    });
    
    $scope.$watch("data.pis",function(nValue,oValue){
        $scope.salvo = nValue===oValue&& nValue!=="";
    });
    
    $scope.SalvarPis = function(){
        localStorage.clear();
        localStorage.setItem("pis",$scope.data.pis);        
        $scope.salvo = $scope.data.pis?true:false;
    }
    
});
