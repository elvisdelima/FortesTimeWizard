angular.module('app.services')

.factory("NotificaService",function($cordovaLocalNotification,$cordovaVibration,$cordovaDialogs){
   
//    $cordovaLocalNotification.ontrigger = function (id, state, json) {
//        var vibrate = localStorage.getItem("vibra")=="true";
//        var sound = localStorage.getItem("sound")=="true";
//        
//        if(sound)
//            $cordovaDialogs.beep(1);
//        if(vibrate)
//            $cordovaVibration.vibrate(100);
//        
//    };
    return{
        addNotification: function(id,msg,title){
            return $cordovaLocalNotification.add({
                    id:id,
                    date:moment().add(1,"minute").toDate(),
                    message:msg,
                    title:title
                }).then(function(){
                    $cordovaVibration.vibrate(100);
                });
        }
    };

});
