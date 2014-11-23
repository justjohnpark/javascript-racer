get '/' do
  session.clear
  erb :index
end

post '/submit' do
  game = Game.create()
  player1 = Player.find_or_create_by(username: params[:username1])
  player2 = Player.find_or_create_by(username: params[:username2])
  game.players << player1
  game.players << player2
  session[:player1] = player1.username
  session[:player2] = player2.username
  session[:game_id] = game.id
  redirect '/race'
end

get '/race' do
  if request.xhr?
    players = {}
    players[:player1] = session[:player1]
    players[:player2] = session[:player2]
    content_type :json
    return players.to_json
  end
  erb :race
end

post '/results' do
  @game = Game.find(session[:game_id])
  @game.winner = params[:winner]
  @game.race_time = params[:duration]
  @game.save
  redirect "/race"
end

get '/results/:game_id' do
  game = Game.find(session[:game_id])
  @winner = game.winner
  @race_time = game.race_time
  game.players.each {|player| @loser = player.username if player.username != @winner}
  erb :results
end 



