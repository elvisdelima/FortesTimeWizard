//    020727948177
angular.module('app.controllers')
.controller('RegistroCtrl', function($scope,$location,$ionicModal,$ionicLoading,$ionicPopup, RegistroService,NotificaService) {
	
    $scope.data={Filtro:"",Dia: new Date().toLocaleDateString()};
//    $scope.data={};
    
    var pis = localStorage.getItem("pis")
    $scope.$watch("data.Filtro",function(nValue,oValue){
        if(nValue)
        if(nValue.indexOf('-')>=0){
                var data  = nValue.split('-');
                $scope.data.Dia = data[2]+'/'+data[1]+'/'+data[0];
            }
            else{
                $scope.data.Dia = oValue;
            }
        
    });
    
    
    $scope.showAlert=function(msg){
        var alertBox=$ionicPopup.alert({title:"<h1 class='assertive'><span class='icon ion-alert padding' style='font-size:30px;'></span>Atenção</h1>",template:msg, okType: "button-assertive"});
    };
     if(!pis){
        
        $scope.showAlert("Informe seu PIS no menu de Configurações");
        $location.path("/tab/configuracoes");
        localStorage.setItem("redirected",true);
        return;
    }
    $scope.Filtrar = function(){
        $scope.lancamentos = [];
        $scope.closeModal();
        var dia = $scope.data.Filtro;
       
        if(dia && dia!== new Date().toLocaleDateString()){            
            $ionicLoading.show({        
                 template: '<h1><i class="icon ion-loading-a"></i></h1>'        
            });
            RegistroService.getRegistrosFiltro(pis,dia).success(function(data){
              var array = data;
              var result = array.map(function(item, rank){
                            return {sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                                    data: moment(item.DtRegistro,"DD/MM/YYYY HH:mm:ss"),  
                                    hora: moment(item.DtRegistro,"DD/MM/YYYY HH:mm:ss").format("HH:mm")};                          
                            });
              $scope.lancamentos = result;
              $ionicLoading.hide();
            }).error(function(erro){$scope.showAlert("Ocorreu um Erro!");});
        }
        else{
             $scope.showAlert("Informe uma data para filtrar.");        
        }
    };
    
    $scope.BatidasDeHoje = function(){
        $ionicLoading.show({        
         template: '<h1><i class="icon ion-loading-a"></i></h1> '        
        })        
        RegistroService.getRegistrosHoje(pis).success(function(data){
                    var array = data;
                    var result = array.map(function(item, rank){
                        return {
                                sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                                hora: item.DtRegistro.slice(11,16) 
                                };                          
                            });                    
                    $scope.lancamentos = [];
                    $scope.data={Dia: new Date().toLocaleDateString()};
                    $scope.lancamentos = result;
                    $ionicLoading.hide();                  
                }).error(function(err){NotificaService.addNotification(11,"Batidas de hoje solicitadas.","Ação");});
    }
    
    $scope.TesteNotifica = function(){
            NotificaService.addNotification(11,"Batidas de hoje solicitadas.","Teste");
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
