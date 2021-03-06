// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/quiz');

    $stateProvider


        .state('quiz', {
            url: '/quiz',
            templateUrl: 'templates/questions/index.html',
            controller: 'MainpageController'
        })

        .state('victory', {
            url: '/victory',
            templateUrl: 'templates/victory/victory.html'
        })

        .state('death', {
            url: '/death',
            templateUrl: 'templates/death/death.html'
        })

        .state('loading', {
            url:'/loading',
            templateUrl: 'templates/start/start.html'
        });

});

routerApp.controller('MainpageController', function($http, $state, $sce){
    this.allTheQuestions;
    this.question;
    $http.get('/questions')
      .then((res) => {
        this.allTheQuestions = res.data;
        this.question = $sce.trustAsHtml(this.allTheQuestions[this.counter].question);
      });
    this.victory = 0;
    this.counter = 0;
    this.answer;
    this.text= '';
    this.submit = function() {
        this.answer = this.text;
        this.text = '';
        if (this.answer === this.allTheQuestions[this.counter].answer){
            this.counter ++;
            this.victory ++;
            if(this.victory === 4){
                $state.go('victory');
                this.counter = 0;
                this.question = $sce.trustAsHtml(this.allTheQuestions[this.counter].question);
                this.victory = 0;
            }
            else{
              this.question = $sce.trustAsHtml(this.allTheQuestions[this.counter].question);
            }
        }
        else{
            this.victory = 0;
            this.counter = 0;
            this.question = $sce.trustAsHtml(this.allTheQuestions[this.counter].question);
            $state.go('death');
        }
    }

})


