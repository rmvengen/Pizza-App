<h1>**Pizza App**</h1>

Pizza Ordering Made easy!
<h2>Easiest way to choose your pizza!</h2>
<p>This app was a practice to have things kept in local storage as well as being able to edit something that was already stored.</p>

<h3>How to use:</h3>
```
* Choose your pizza crust
* Choose a starting base (cheese in included on all)
* Pick some 'healthy' veggies
* Add on some of that extra meat for meat lovers!
* If you make a mistake simply click the edit button
* Recreate your pizza and click 'Edit this order'
* Voila! The pizza will be submitted!
```
<h3>Code:</h3>
<p>This part of the code is the hardest to explain what is happening.
``` 
 pizzaModule.factory("PizzaStorageService", function($window, $rootScope){
        
        angular.element($window).on('storage', function(event) {
            if(event.key == 'my-storage') {
                $rootScope.$apply();
            }
        })
        
        return{
            setData: function(key, val){
                $window.localStorage && $window.localStorage.setItem(key,val);
                return this;
            },
            getData: function(key){
                
                var val = $window.localStorage && $window.localStorage.getItem(key);
                var data = angular.fromJson(val);
                return data;
            }
        }
    })         

