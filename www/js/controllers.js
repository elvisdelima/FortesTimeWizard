angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('LancamentosCtrl', function($scope, Lancamentos) {
	var batidas = Lancamentos.query({},{'pis': '020727948177'});
	
	$scope.lancamentos = batidas;
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
