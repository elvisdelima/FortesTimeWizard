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
        },
        getRegistrosHojeFake:function(){
            
            
            var retorno = [{sentido:"Entrada",
                            data: moment("08:00",["HH:mm"]),
                            hora:  moment("08:00",["HH:mm"]).format("HH:mm")},
                           {sentido:"Saida",
                            data: moment("11:37",["HH:mm"]),
                            hora:  moment("11:37",["HH:mm"]).format("HH:mm")},
                           {sentido:"Entrada",
                            data: moment("13:00",["HH:mm"]),
                            hora:  moment("13:00",["HH:mm"]).format("HH:mm")},
                           {sentido:"Saida",
                            data: moment("17:00",["HH:mm"]),
                            hora:  moment("17:00",["HH:mm"]).format("HH:mm")},
                           {sentido:"Entrada",
                            data: moment("19:00",["HH:mm"]),
                            hora:  moment("19:00",["HH:mm"]).format("HH:mm")}
            ];
            return retorno;
        }
    };
    
});