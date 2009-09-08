// All credit goes to Rick Olson.
// Made completely relative with <abbr/> tags by Steve Pomeroy.
(function($) {
  $.fn.relatizeDate = function() {
    return $(this).each(function() {
        var abbr = $('<abbr/>');
        $(abbr).attr('title', $(this).text());
        $(abbr).text($.relatizeDate(this)); 
      $(this).replaceWith( abbr );
    })
  }

  $.relatizeDate = function(element) {
    return $.relatizeDate.timeAgoInWords( new Date($(element).text()) );
  }

  // shortcut
  $r = $.relatizeDate;

  $.extend($.relatizeDate, {
    shortDays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortMonths: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],

    /**
     * Given a formatted string, replace the necessary items and return.
     * Example: Time.now().strftime("%B %d, %Y") => February 11, 2008
     * @param {String} format The formatted string used to format the results
     */
    strftime: function(date, format) {
      var day = date.getDay(), month = date.getMonth();
      var hours = date.getHours(), minutes = date.getMinutes();

      var pad = function(num) { 
        var string = num.toString(10);
        return new Array((2 - string.length) + 1).join('0') + string
      };

      return format.replace(/\%([aAbBcdHImMpSwyY])/g, function(part) {
        switch(part[1]) {
          case 'a': return $r.shortDays[day]; break;
          case 'A': return $r.days[day]; break;
          case 'b': return $r.shortMonths[month]; break;
          case 'B': return $r.months[month]; break;
          case 'c': return date.toString(); break;
          case 'd': return pad(date.getDate()); break;
          case 'H': return pad(hours); break;
          case 'I': return pad((hours + 12) % 12); break;
          case 'm': return pad(month + 1); break;
          case 'M': return pad(minutes); break;
          case 'p': return hours > 12 ? 'PM' : 'AM'; break;
          case 'S': return pad(date.getSeconds()); break;
          case 'w': return day; break;
          case 'y': return pad(date.getFullYear() % 100); break;
          case 'Y': return date.getFullYear().toString(); break;
        }
      })
    },
  
    timeAgoInWords: function(targetDate, includeTime) {
      return $r.distanceOfTimeInWords(targetDate, new Date(), includeTime);
    },
  
    /**
     * Return the distance of time in words between two Date's
     * Example: '5 days ago', 'about an hour ago'
     * @param {Date} fromTime The start date to use in the calculation
     * @param {Date} toTime The end date to use in the calculation
     * @param {Boolean} Include the time in the output
     */
    distanceOfTimeInWords: function(fromTime, toTime, includeTime) {
      var delta = parseInt((toTime.getTime() - fromTime.getTime()) / 1000);
      var s_in_day   = 86400;
      var s_in_week  = 604800;
      var s_in_month = 2629744;
      var s_in_year  = 31556926;
      if (delta < 60) {
          return 'less than a minute ago';
      } else if (delta < 120) {
          return 'about a minute ago';
      } else if (delta < (45*60)) {
          return (parseInt(delta / 60)).toString() + ' minutes ago';
      } else if (delta < (120*60)) {
          return 'about an hour ago';
      } else if (delta < (s_in_day)) {
          return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
      } else if (delta < (2*s_in_day)) {
          return 'yesterday';
      } else if (delta < (s_in_week)) {
        return (parseInt(delta / s_in_day)).toString() + " days ago";
      }else if (delta < (2*s_in_week)){
        return '1 week ago';
      }else if (delta < (s_in_month)){
        return parseInt(delta / s_in_week).toString() + ' weeks ago';
      }else if (delta < (2*s_in_month)){
        return '1 month ago';
      }else if (delta < (s_in_year)){
        return parseInt(delta / s_in_month).toString() + ' months ago';
      }else if (delta < (2*s_in_year)){
          return '1 year ago';
      } else {
        return parseInt(delta / s_in_year).toString() + ' years ago';
      }
    }
  })
})(jQuery);
