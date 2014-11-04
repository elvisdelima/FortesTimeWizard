(function(){
	'use strict';

	angular.module('starter.services').factory('Friends', ['$http',registrosAPI]);

	function registrosAPI($http){
		
		var currentPIS;

		function getRegistros(callback){
			return $http.get("http://fortesponto.azurewebsites.net/api/Lancamentos/"+ currentPIS +"/Hoje")
				.success(function(data, status){
					conosole.log("Recieved data via HTTP")					
					calbback(data);
				})
				.error(function(){
					conosole.log("Error while making HTTP call")
				});
		}

		function setPIS(PIS){
			currentPIS = PIS;
		}

		return {
			getRegistros: getRegistros,
			setPIS: setPIS
		};
	} 

})();