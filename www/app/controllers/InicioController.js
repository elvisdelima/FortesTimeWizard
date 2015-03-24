angular.module('app.controllers',["ngCordova"])
.controller('InicioCtrl', function($scope,$interval,RegistroService,NotificaService) {
    $scope.now = moment();
    
    $interval(function(){
        $scope.now = moment();
    },1000)
    
        
    $scope.$watch("now",function(nValue,oValue){
        
        $scope.dadosInicio.totalTrabalhado.add(1,"second");
           
        if($scope.dadosInicio.proximaQuebra.Hora.second()>=0)
            $scope.dadosInicio.proximaQuebra.Hora.add(-1,"second");
            if($scope.dadosInicio.proximaQuebra.Hora.hour()===0 && $scope.dadosInicio.proximaQuebra.Hora.minute()===0 && $scope.dadosInicio.proximaQuebra.Hora.second()===0){
                        $scope.dadosInicio.proximaQuebra = RegistroService.getProximaQuebraFake();
                        NotificaService.notify();
            }                
                
    });
    
    var pis = localStorage.getItem("pis");
    
    var registros = RegistroService.getRegistrosHojeFake(pis);
    
    // var Turnos =[];
    // var Intervalos=[];
    // var entradaEmAberto;
    
    // if(registros.length>0){
    //     registros.forEach(function(h,index){
    //         if(h.sentido==="Entrada"&&index!==0){
    //             var diff = h.data.diff(registros[index-1].data);
    //             var a = moment.duration(diff);
    //             var diff = moment.utc(diff);
    //             var intervalo = {
    //                 flotHrsIntervalo : a.asHours(),
    //                 dif: diff,
    //                 horasIntervaloStr :diff.format("HH:mm")
    //             }
    //             Intervalos.push(intervalo);

    //         }
    //         if(h.sentido ==="Saida"){            
    //             var diff = h.data.diff(registros[index-1].data);
    //             var a = moment.duration(diff);
    //             var diff = moment.utc(diff);
    //             var turno = {
    //                 flotHrsTrabalhadas : a.asHours(),
    //                 dif:diff,
    //                 horasTrabalhadasStr : diff.format(":mm")
    //             }
    //             Turnos.push(turno);            
    //         }

    //         if(h.sentido ==="Entrada"&&!registros[index+1]){
    //             entradaEmAberto = h;
    //         }
    //     });
    // }
    // var totalTrabalhando;
    // if(entradaEmAberto){
    //     var now = moment();
    //     var difNow = now.diff(entradaEmAberto.data);
    //     var trabalhando = moment.utc(difNow);
    //     totalTrabalhando = trabalhando;
        
    // }
    // var totalTrabalhado=0;
    // var totalIntervalos =0;
    // Turnos.forEach(function(t){
    //     totalTrabalhado+=t.dif;
    // });
    // Intervalos.forEach(function(i){
    //     totalIntervalos+=i.dif;
    // });
    
    var totalIntervalos = RegistroService.getIntervalo(registros);
    var totalTrabalhando = RegistroService.getTurnoAtual(registros);
    var totalTrabalhado =RegistroService.getTotalTrabalhado(registros);
   
    var momentTrabalhadas = totalTrabalhado > 0? moment.utc(totalTrabalhado): totalTrabalhando;
    
    var momentIntervalos = totalIntervalos > 0? moment.utc(totalIntervalos):{};
    var proximaQuebra;
    
    RegistroService.getProximaQuebra(pis).success(function(data){
        proximaQuebra= {Hora : moment(data.Hora,["YYYY-MM-DD HH:mm:ss"]),Mensagem: data.Mensagem};
    });
    proximaQuebra = RegistroService.getProximaQuebraFake();
   
    momentTrabalhadas = momentTrabalhadas.add(totalTrabalhando?totalTrabalhando.minute():0,"minute").add(totalTrabalhando?totalTrabalhando.hour():0,"hour")
    proximaQuebra.Hora = moment.utc(proximaQuebra.Hora.diff(moment()));
    
    debugger;
    var testeIntervalo = RegistroService.getIntervalo(registros);
    var testeTurno = RegistroService.getTurnoAtual(registros);
    $scope.dadosInicio ={totalTrabalhado:momentTrabalhadas,
                         totalIntarvalos:momentIntervalos,
                         proximaQuebra:proximaQuebra};
  
})
