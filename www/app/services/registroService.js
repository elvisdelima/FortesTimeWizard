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
        getProximaQuebra: function(pis){
            var url="http://fortesponto.azurewebsites.net/api/Regras/"+pis+"/ProximaQuebra";
                return $http.get(url);                    
        },
        getProximaQuebraFake: function(){
            var retorno={};
            
            if(moment().hour()>= 8)
                retorno = {Hora : moment("14:00",["HH:mm"]),Mensagem: "Turno Máximo"};
            
            if(moment().hour()>= 12)
                retorno = {Hora : moment("18:00",["HH:mm"]),Mensagem: "Turno Máximo"};            
            
            return retorno;
            
        },
     
        
        getRegistrosHojeFake:function(){            
            
            
            var retorno = [];
            if(moment().hour()>=8)
            retorno.push({  sentido:"Entrada",
                            data: moment("08:00",["HH:mm"]),
                            hora:  moment("08:00",["HH:mm"]).format("HH:mm")});
            if(moment().hour()>=12)
           retorno.push({  sentido:"Saida",
                           data: moment("12:00",["HH:mm"]),
                           hora:  moment("12:00",["HH:mm"]).format("HH:mm")});
            if(moment().hour()>=13)
            retorno.push({  sentido:"Entrada",
                            data: moment("13:00",["HH:mm"]),
                            hora:  moment("13:00",["HH:mm"]).format("HH:mm")});
            if(moment().hour()>=17)
            retorno.push({  sentido:"Saida",
                            data: moment("17:00",["HH:mm"]),
                            hora:  moment("17:00",["HH:mm"]).format("HH:mm")});
                          
            return retorno;
        }
    };
    
});