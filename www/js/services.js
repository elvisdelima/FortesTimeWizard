angular.module('starter.services', [])

/**
 * um servico para  recuperar todas os Lancamentos de hoje.
 */
.factory("LancamentosHoje", function ($resource,$q,$http) {
    
    var getRegistrosHoje = function(pis){
        
        
        
        var deferred = $q.defer();
        
        
        deferred.resolve(
        $resource(
                "http://fortesponto.azurewebsites.net/api/Lancamentos/:pis/2014-11-05",
                {pis: pis},
                {
                  'query': {
                    method: 'GET', 
                    isArray: true, 
                    transformResponse: function(data, headers) {
                      var array = JSON.parse(data);
                      var result = array.map(function(item, rank){
                        return {
                          sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                          hora: item.DtRegistro.slice(11,16) 
                        };
                      });
                     
                      return result;
                    }}           
                }    
                ));
//        $http.jsonp("http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/2014-11-05", function(data){
//                 var array = JSON.parse(data);
//                      var result = array.map(function(item, rank){
//                        return {
//                          sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
//                          hora: item.DtRegistro.slice(11,16) 
//                        };
//        })
        
         
    }
    
    return {getRegistrosHoje:getRegistrosHoje};
})
/**
 * um servico para  recuperar todas os Lancamentos de uma data.
 */
.factory("LancamentosFiltro", function ($resource) {
  return $resource(
    "http://fortesponto.azurewebsites.net/api/Lancamentos/:pis/:dia",
    {pis: "@pis",dia:"@dia"},      
    {
      'query': {
        method: 'GET', 
        isArray: true, 
        transformResponse: function(data, headers) {
          var array = JSON.parse(data);
          
          var result = array.map(function(item, rank){
            return {
              sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
              hora: item.DtRegistro.slice(11,16) 
            };
          });

          return result;
        }}           
    }    
  );
})
/**
 * um servico para  pesquisar e recuperar todas as Ocorrencias.
 */
.factory('Ocorrencias', function($http) {
  var ocorrencias = [
      {
      "Dia": "2014-10-20",
      "Batidas": [
        {
          "Tipo": 0,
          "Hora": "sample string 1"
        },
        {
          "Tipo": 0,
          "Hora": "sample string 1"
        }
      ],
      "Quebras": [
        "sample string 1",
        "sample string 2"
      ]
    },
    {
      "Dia": "2014-10-21",
      "Batidas": [
        {
          "Tipo": 0,  
          "Hora": "sample string 1"
        },
        {
          "Tipo": 0,
          "Hora": "sample string 1"
        }
      ],
      "Quebras": [
        "sample string 1",
        "sample string 2"
      ]
    }
  ];
  /*
  var myPIS = localStorage.getitem("PIS");
  var dataIni = moment().format("yyyy-mm-dd");
  var dataFim = moment().format("yyyy-mm-dd");
  
  $http("http://fortesponto.azurewebsites/api/Ocorrencias/"+ myPIS+"/"+dataIni+"/"+dataFim+"").done(function(dados){
      ocorrencias.length = 0;
      dados.forEach(ocorrencias.push.bind(ocorrencias));
   });
*/
  return {
    all: function() {
      return ocorrencias;
    },
    get: function(dia) {
      return ocorrencias.filter(function(item){ return item.Dia == dia})[0];
    }
  }
});