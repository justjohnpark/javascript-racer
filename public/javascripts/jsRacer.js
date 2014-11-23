$(document).ready(function() {
  var raceReady = false;
  var startTime

  function counter() {
    var sec = $('#race_count span').text()
    var timer = setInterval(function() {
     $('#race_count span').html(sec--);
     if (sec === -1) {
      $('#race_count').fadeOut('fast');
      $('#race').fadeOut('fast');
      $('#go').text('GO!');
      raceReady = true;
      startTime = Date.now();
      clearInterval(timer);
    }
  }, 1000);
  };

  var Player = function(name) {
    this.name = name;
    this.position = 1;

    this.changePosition = function() {
      this.position += 1;
    }
  }

  var player1 = new Player();
  var player2 = new Player();

  $.get('/race', function(response){
    player1.name = response.player1;
    player2.name = response.player2;
  });

  $('#race').on("click", function() {
    counter();
  });

  var winner = null;

  var checkWinner = function(player) {
    if (player.position === 30) {
      winner = player;
      return winner;
    };
  }

  function raceCompleted() {
    $(".winner").html("<h2>" + winner.name + " is the winner!" +"</h2>");
    $(".winner").show();
    $("#winna").show();
    var endTime = Date.now();
    winnerTime = endTime - startTime;
    $.post("/results", {winner: winner.name, duration: winnerTime});
  };

  $(document).on('keyup', function(e) {
    var code = e.keyCode || e.which;

    if(code === 65 && !winner && raceReady) {
      checkWinner(player1);
      player1.changePosition();
      if (winner) {
        raceCompleted();
      } else {
        $("tr#player1_strip td").removeClass("active");
        $("#player1_strip td:nth-child("+player1.position+")").addClass("active");
      }
    }

    if(code === 76 && !winner && raceReady) {
      checkWinner(player2)
      player2.changePosition();
      if (winner) {
        raceCompleted();
      } else {
        $("tr#player2_strip td").removeClass("active");
        $("#player2_strip td:nth-child("+player2.position+")").addClass("active");
      }
    }
  });
});
