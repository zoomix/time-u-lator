
var examples = [ '11:00 -> 11:45',
                 '11:00 -> 11:15 + 11:30 -> 11:45' ];

function TimeCtrl($scope) {
  $scope.results = function() {
    if($scope.timeExpression && $scope.timeExpression.length > 0) {
      $scope.examplesOn = false;
      var exp = $scope.timeExpression;
      var date = parseTime(exp);


      return [ formatAsDate(date), formatAsTime(date) ];
    } else {
      $scope.examplesOn = true;
      return examples;
    }
  }
}

function parse(string) {
  return "parsed";
}

function getSum(string) {
  return "summa";
}

function getDuration(string) {
  return "kaka";
}


function parseTime(timeString) {
  return Date.parse(timeString);
}

function formatAsDate(date) {
  return date.toString("yyyy-MM-dd");
}
function formatAsTime(date) {
  return date.toString("HH:mm:ss");
}
