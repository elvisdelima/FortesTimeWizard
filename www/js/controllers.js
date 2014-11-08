angular.module('starter.controllers', [])

.controller('InicioCtrl', function($scope) {    
})

.controller('LancamentosCtrl', function($http,$scope,$location,$ionicModal,$ionicLoading,$ionicPopup, LancamentosFiltro,LancamentosHoje) {
	
    $scope.data={Dia: new Date().toLocaleDateString()};
        var pis = localStorage.getItem("pis")
        
//    <div class='icon' ><span class='icon ion-alert padding' style='font-size:30px;'></span></div>
    $scope.showAlert=function(msg){
//        var alertBox ="<ion-header-bar class='bar-assertive'><h1 class='title'>Atenção</h1></ion-header-bar><div class='padding'><p>"+msg+"</p></div>";
        var alertBox=$ionicPopup.alert({title:"<h1 class='assertive'><span class='icon ion-alert padding' style='font-size:30px;'></span>Atenção</h1>",template:msg, okType: "button-assertive"});
        
    }
     if(!pis){
        
        $scope.showAlert("Informe seu PIS no menu de Configurações");
        $location.path("/tab/configuracoes");
        localStorage.setItem("redirected",true);
        return;
    }
    //    020727948177
	    
    $scope.Filtrar = function(dia){
        $scope.lancamentos = [];
        $scope.closeModal();
       
        if(dia && dia!== new Date().toLocaleDateString()){
            var data  = dia.split('-');
            $scope.data.Dia = data[2]+'/'+data[1]+'/'+data[0];
            $ionicLoading.show({        
                 template: '<h1><i class="icon ion-loading-a"></i></h1>'        
                })       

              var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/"+dia;
                  $http.get(url).then(function(result){
                       var array = result.data;
                      var result = array.map(function(item, rank){
                        return {
                          sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                          hora: item.DtRegistro.slice(11,16) 
                        };                          
                    })
                  $scope.lancamentos = result;
                  $ionicLoading.hide();
                });
        }
        else{
             $scope.showAlert("Informe uma data para filtrar.");        
        }
    };
    
    $scope.BatidasDeHoje = function(){
        $ionicLoading.show({        
         template: '<h1><i class="icon ion-loading-a"></i></h1> '        
        })
        
        $scope.lancamentos = [];
        var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/hoje";
                $http.get(url).then(function(result){
                    var array = result.data;
                    var result = array.map(function(item, rank){
                        return {
                                sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                                hora: item.DtRegistro.slice(11,16) 
                                };                          
                            })
                    $scope.data={Dia: new Date().toLocaleDateString()};
                    $scope.lancamentos = result;
                    $ionicLoading.hide();
                });
    }
    
    
     $ionicModal.fromTemplateUrl('modalDate.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
         modal.height= 30;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };    
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

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
