
var examples = [ '11:00 -> 11:45',
                 '11:00 -> 11:15 + 11:30 -> 11:45' ];

function TimeCtrl($scope) {
  $scope.results = function() {
    if($scope.timeExpression && $scope.timeExpression.length > 0) {
      $scope.examplesOn = false;
      var exp = $scope.timeExpression;
      return [ parse(exp) ]
    } else {
      $scope.examplesOn = true;
      return examples;
    }
  }
}

function parse(string) {
  return formatAsTime(recurse(string));
}

function recurse(string) {
  string = string.trim();
  if(string.length <= 2 && string.indexOf(':') == -1) {
    string = string + ":00" //Looks like somebody omitted the minute markers
  }
  if(string.indexOf("+") > 0) {
    var parts = string.split("+");
    return getSum(parts);
  } else if(string.indexOf("->") > 0) {
    var parts = string.split("->");
    return getDuration(parts);
  } else {
    return Date.parse(string);
  }
}

function getSum(parts) {
  var sum = 0;
  var baseTimestamp = null; 
  for(var i in parts) {
    if(parts[i]) {
      var date = recurse(parts[i])
      if(baseTimestamp == null) {
        baseTimestamp = new Date(date);
        baseTimestamp.clearTime();
      }
      sum += (date.getTime() - baseTimestamp);
    }
  }
  return utcTime(sum);
}

function getDuration(parts) {
  if(parts.length == 2 && parts[1]) {
    var start = recurse(parts[0]).getTime();
    var end   = recurse(parts[1]).getTime();
    return utcTime(end - start);
  } else {
    return recurse(parts[0])
  }
}

function utcTime(timeInMilis) {
  var date = new Date(0);
  date.setTime(timeInMilis + date.getTimezoneOffset()*60*1000);
  return date;
}


function formatAsDate(date) {
  return date.toString("yyyy-MM-dd");
}
function formatAsTime(date) {
  return date.toString("HH:mm");
}
