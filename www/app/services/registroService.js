angular.module('app.services', [])
/*
    Serviço que faz o acesso WebApi
*/

.factory("RegistroService",function($http){
       
    return{
        
        getRegistrosHoje: function(pis){
            var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/hoje";
                return $http.get(url);                    
        },
        getRegistrosFiltro: function(pis,date){
            var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/"+date;
                return $http.get(url);                    
        }
    };
    
});