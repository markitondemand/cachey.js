//Cachey.js is a very small `localStorage` helper with cache expiration built-in. 
//Developed by [Markit On Demand](http://markitondemand.com) on [GitHub](https://github.com/markitondemand/cachey.js).

//Moment.js is required (for cache expiration)
define(['moment'], function(moment){

	//Set expiration time from now
	//in minutes.
    var _setExpires = function(minutes){
        return moment().add('minutes',minutes);
    }

    //API methods
    //----------
    return {

         //Set data to cache.
         //There are 3 parameters, the first two are required.

         //`key` is the storage key (`string`).

         //`data` is the data to store, and it must be valid JSON.

         //`expires` is the number of minutes until the cache expires (`int`). This is optional.
        set: function(key,data,expires){
            if (localStorage[key]){
                console.warn('Cachey key already exists. Overwriting data');
            }
			//Stringify the data for localStorage and add the expiration timestamp.
            localStorage[key] = JSON.stringify({
                data: data,
                expires: (expires) ? _setExpires(expires) : null
            });
        },
        
        //Get data from cache
		//The first and only argument is `key`, the storage key (`string`).
        get: function(key){
            if (!localStorage[key]){
            	//The key doesn't exist in the store.
                console.warn('Cachey key not found');
                return false;
            }
            var d = JSON.parse(localStorage[key]);
            
            if (!d.expires){
            	//If the expiration time hasn't been set, return the data.
                return d.data;
            } else if ( d.expires && moment(d.expires).isAfter(moment()) ){
            	//If the expiration time has been set and it hasn't expired yet, return the data.
                return d.data;
            } else {
            	//The data has expired from the cache.
                console.warn('Cachey data (for '+key+') has expired.', d);
                return false; 
            }
        },

        //Get data from cache (if present and not expired).
        //If the data is _not_ in cache, `retrieve` returns data after setting it in cache.
		//There are 3 parameters, the first two are required.

         //`key` is the storage key (`string`).

         //`data` is the data to store, and it must be valid JSON.

         //`expires` is the number of minutes until the cache expires (`int`). This is optional.
        retrieve: function(key,data,expires){
            var inCache = get(key);
            if (inCache){
                return inCache;
            } else {
                set(key,data,expires);
                return data;
            }
        }
    }

});