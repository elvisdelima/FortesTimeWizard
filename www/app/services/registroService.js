angular.module('app.services', [])
/*
    Serviço que faz o acesso WebApi
*/

.factory("RegistroService",function($http){
    
    var DiferencaDatas = function(dataA,dataB){
                            var diff = dataA.diff(dataB);
                            return moment.utc(diff);
                    };
    
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
        
        getInitialData: function(registros){

                    

                    return {totalTrabalhado:momentTrabalhadas,totalIntervalos:momentIntervalos}
                    
        },

        getProximaQuebraFake: function(){
            var retorno={};
            
            if(moment().hour()>= 8)
                retorno = {Hora : moment("14:00",["HH:mm"]),Mensagem: "Turno Máximo"};
            
            if(moment().hour()>= 12)
                retorno = {Hora : moment("18:00",["HH:mm"]),Mensagem: "Turno Máximo"};            
            
            return retorno;
            
        },
        getTotalTrabalhado:function(registros){
            var result=0;
            if (registros && registros.length>0) {
                registros.forEach(function(dado,index){
                    if(dado.sentido==="Saida")
                        result+=(DiferencaDatas(dado.data,registros[index-1].data))
                    if(dado.sentido==="Entrada" && !registros[index+1])
                        result += (DiferencaDatas(dado.data,moment()));
                });
            };


        },
        getIntervalo  :function(registros){
            var result =0;
            if(registros && registros.length >0){
                registros.forEach(function(dado , index){
                    if(dado.sentido === "Entrada"&& index>0)
                        result+=DiferencaDatas(dado.data,registros[index-1].data);
                });
             }
             return moment.utc(result);
        },
        getTurnoAtual:function(registros){
            var result;
            if(registros && registros.length>0)
                registros.forEach(function(dado,index){
                    if(dado.sentido==="Entrada" && !registros[index+1])
                        result = dado.data;
                });
            if(result)
                return  moment.utc(DiferencaDatas(moment(),result));
            else
                return null;
        },
        getRegistrosHojeFake:function(){            
            
            
            var retorno = [];
            retorno.push({  sentido:"Entrada",
                            data: moment("08:00",["HH:mm"]),
                            hora:  moment("08:00",["HH:mm"]).format("HH:mm")});
           retorno.push({  sentido:"Saida",
                           data: moment("12:00",["HH:mm"]),
                           hora:  moment("12:00",["HH:mm"]).format("HH:mm")});
            retorno.push({  sentido:"Entrada",
                            data: moment("13:00",["HH:mm"]),
                            hora:  moment("13:00",["HH:mm"]).format("HH:mm")});
            // retorno.push({  sentido:"Saida",
            //                 data: moment("17:00",["HH:mm"]),
            //                 hora:  moment("17:00",["HH:mm"]).format("HH:mm")});
                          
            return retorno;
        }

    };
    
});