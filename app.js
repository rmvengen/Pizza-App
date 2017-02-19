var pizzaModule = angular.module('pizza_storage_app', []);

pizzaModule.controller("MainController", ['$scope', 'PizzaStorageService',
                    function($scope, PizzaStorageService){
                        
                        var mc = this;
                        
                        //the toppings
                        mc.topping1="";
                        mc.topping2="";
                        mc.topping3="";
                        mc.topping4="";
                        mc.toppings= [];
                        
                        //the topppings for editing
                        mc.editTopping1 = "";
                        mc.editTopping2 = "";
                        mc.editTopping3 = "";
                        mc.editTopping4 = "";
                        
                        //the toppings that they choose
                        mc.selected_topping1;
                        mc.selected_topping2;
                        mc.selected_topping3;
                        mc.selected_topping4;
                        
                        //The topping choices
                        //The main topping options
                        mc.startingToppings = [
                            {
                                unit_name: "Cheese",
                                unit_code: "ch"
                            },
                            
                            {
                                unit_name: "Pepperoni",
                                unit_code: "pep"
                            },
                            {
                                unit_name: "Sausage",
                                unit_code: "saus"
                            }
                            ];
                        //The 'healthy' options    
                        mc.veggies = [
                            {
                                unit_name:"Pineapple",
                                unit_code:"pin"
                            },
                            {
                                unit_name:"Mushrooms",
                                unit_code: "mush",
                                
                            },
                            {
                                unit_name:"Bell Pepper",
                                unit_code:"bell"
                            }
                            ];
                        //the more meat the better options
                        mc.extraMeat = [
                            {
                                unit_name:"Bacon",
                                unit_code: "bac"
                            },
                            {
                                unit_name: "Canadian bacon",
                                unit_code: "can"
                            },
                            {
                                unit_name: "Chicken",
                                unit_code: "chick"
                            }
                            ];  
                            
                            mc.crust = [
                                {
                                    unit_name:"Hand Tossed",
                                    unit_code:"hand"
                                },
                                {
                                    unit_name:"Thin Crust",
                                    unit_code:"thin"
                                },
                                {
                                    unit_name:"Stuffed",
                                    unit_code:"stuff"
                                }
                                ];
            //latest data                
            mc.latestData = function(){
                return PizzaStorageService.getData('my-storage');
                
            }   
            
            //updates the toppings as chosen
            mc.update = function(top4, top1, top2, top3){
                
                if(mc.toppings == null){
                    mc.toppings = [];
                }
                
                var topping = {crust: top4, starting: top1, veggie: top2, moreMeat: top3};
                mc.toppings.push(topping);
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
                
            }
            
            //To be able to edit the forms
            mc.editForm = false;
            mc.showEdit = function(){
                mc.editForm = true;
            }
            mc.hideEdit = function(){
                mc.editForm = false;
            }
            
            mc.editTop1 = function($index){
                mc.toppings = mc.latestData();
                var newTopping = {
                crust: mc.editTopping4.unit_name,
                starting: mc.editTopping1.unit_name,
                veggie: mc.editTopping2.unit_name,
                moreMeat: mc.editTopping3.unit_name
            
                };
                mc.toppings.splice($index, 1, newTopping);
                
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
            }               
            
            //deletes an order
             mc.deleteOrder = function($index){
                mc.toppings = mc.latestData();
                mc.toppings.splice($index, 1);
                
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
            }    
                           
    }]);
           
           //storage         
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
