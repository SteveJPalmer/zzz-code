(function(){
	var app = angular.module('store',['config']);
	app.controller('StoreController',['$http','DBService','$sce','$scope',function($http,DBService,$sce,$scope){
		var store = this;
		var http = $http;
       
        //data records models
		store.products = [];
		store.selectedrow = null;
		//player models
		store.playerlink;
		store.playerurl;
		store.playerurldown;
		//Filter
		store.results = 'false';
		store.platform = 'YouTube';
		//Sort
		store.sort = '';
        store.numrows = 20;
		//fingerprint dashboard		
		store.total = 0;
		store.iapstotal = 0;
		//Iaps upload
		store.noticeid;
		store.order = 1;
		store.artistFilter = '';
		store.titleFilter = '';
		store.ownerFilter = '';
		$scope.uploadplatform = 'YouTube';

        //Filtering
        $scope.platform = 'YouTube';
        $scope.artist = '';
        $scope.track = '';

        //initialise records
        DBService.reload(store,$scope);
        $scope.uploadplatform = $scope.platform;
        DBService.refreshDashboard(store);

        //fingerprint dashboard drilldown
        store.hits_youtube = 0;
        store.iaps_youtube = 0;
        store.hits_soundcloud = 0;
        store.iaps_soundcloud = 0;
        store.hits_dailymotion = 0;
        store.iaps_dailymotion = 0;
        store.hits_vimeo = 0;
        store.iaps_vimeo = 0;


		//watches
		$scope.$watch('uploadplatform',function(newValue,oldValue){
			store.uploadmessagetype = 0;
			console.log('uploadplatform $watch called - new value: '+ newValue);
		});

        $scope.$watch('platform',function(newValue,oldValue){
            store.platform = newValue;
            $scope.uploadplatform = newValue;
            console.log('platform $watch called - new value: '+ newValue);
            //DBService.filterArtist($scope);
            $scope.artist = '';
            //$scope.artists = '{}';
            $scope.track = '';
            //$scope.tracks = '{}';
            store.filterArtist(store);
        });

        $scope.$watch('artist',function(newValue,oldValue){
            console.log('artist $watch called - new value: '+ newValue);
            //DBService.filterArtist($scope);
            $scope.track = '';
            store.filterTrack(store);
        });

		/* store methods */
        store.filterArtist = function(store){
            //retrieve artist LOV
            DBService.filterArtist($scope);
        };
        store.filterArtist(store);

        store.filterTrack = function(store){
            //retrieve track LOV
            DBService.filterTrack($scope);
        };

        store.reload = function(){
			store.products = [];
			DBService.reload(store,$scope);
			$scope.uploadplatform = $scope.platform;
			DBService.refreshDashboard(store);
		};

		store.save = function(product){
			DBService.save(product, store);
		    //push data to iaps
		    //DBService.iapsUpload_original(product, store);
		};

		store.iapsUpload = function(store){
			//push data to iaps
			DBService.iapsUpload(store, $scope.uploadplatform);
		};

		store.refreshDashboard = function(store){
    		DBService.refreshDashboard(store);
		};

        store.refreshDashboardDetails = function(store){
            DBService.refreshDashboardDetails(store);
        };

		store.setPlayerLink = function(product){
			console.log('Log:rowclick - switch playerlink to:'+product.link);
			store.playerurl = product.link;
			
			//fromat links for player 	
			if(product.link.indexOf('soundcloud') >= 0 && product.link.indexOf('url=') == -1){
				store.playerlink = "https://w.soundcloud.com/player/?url="+product.link+"&output=embed"
			}
			if(product.link.indexOf('youtube') >= 0){
                store.playerlink = product.link.replace("watch?v=","embed/");
			}

			//set selected row's class
			store.selectedrow = product._id;						
			console.log('Exiting rowclick with values:recordlink:'+product.link);
			console.log('                            :store.playerlink:'+store.playerlink);
            console.log('                            :store.selectedrow:'+store.selectedrow);
		};


		// trustSrc = function(src) {
		// 	return $sce.trustAsResourceUrl(src);
		// }

		// store.stillUp = function(obj){				
		// 	$http.get(obj.url,{"headers":{"Access-Control-Allow-Origin":"*"}})
		// 			.success(function(data){	
		// 			  obj.status = "UP"
		// 			})
		// 		    .error(function(data){
		// 			  obj.status = "DOWN"
		// 			})
		// }		

		// store.trustSrc = function(src) {
		// 	return $sce.trustAsResourceUrl(src);
		// }

	}]);


	app.filter('trusted', ['$sce', function ($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);


})();
