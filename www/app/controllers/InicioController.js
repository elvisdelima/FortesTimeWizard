angular.module('app.controllers',[])
.controller('InicioCtrl', function($scope,RegistroService) {
    var pis = localStorage.getItem("pis");
    var registros = RegistroService.getRegistrosHojeFake(pis);
    
    var Turnos =[];
    var Intervalos=[];
    var entradaEmAberto;
    
    if(registros.length>0){
        registros.forEach(function(h,index){
            if(h.sentido==="Entrada"&&index!==0){
                var diff = h.data.diff(registros[index-1].data);
                var a = moment.duration(diff);
                var diff = moment.utc(diff);
                var intervalo = {
                    flotHrsIntervalo : a.asHours(),
                    dif: diff,
                    horasIntervaloStr :diff.format("HH:mm")
                }
                Intervalos.push(intervalo);

            }
            if(h.sentido ==="Saida"){            
                var diff = h.data.diff(registros[index-1].data);
                var a = moment.duration(diff);
                var diff = moment.utc(diff);
                var turno = {
                    flotHrsTrabalhadas : a.asHours(),
                    dif:diff,
                    horasTrabalhadasStr : diff.format(":mm")
                }
                Turnos.push(turno);            
            }

            if(h.sentido ==="Entrada"&&!registros[index+1]){
                entradaEmAberto = h;
            }
        });
    }
    var totalTrabalhando = "00:00"
    if(entradaEmAberto){
        var now = moment();
        var difNow = now.diff(entradaEmAberto.data);
        var trabalhando = moment.utc(difNow);
        totalTrabalhando = trabalhando.format("HH:mm");
        
    }
    var totalTrabalhado=0;
    var totalIntervalos =0;
    Turnos.forEach(function(t){
        totalTrabalhado+=t.dif;
    });
    Intervalos.forEach(function(i){
        totalIntervalos+=i.dif;
    });
    var momentTrabalhadas = totalTrabalhado > 0? moment.utc(totalTrabalhado).format("HH:mm") : totalTrabalhando;
    var momentIntervalos = totalIntervalos > 0? moment.utc(totalIntervalos).format("HH:mm") : "00:00";
    
    $scope.dadosInicio ={totalTrabalhado:momentTrabalhadas,
                         totalIntarvalos:momentIntervalos,
                         horasDoTurno:totalTrabalhando};    
})