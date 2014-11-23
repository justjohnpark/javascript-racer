class Game < ActiveRecord::Base
  has_many :player_games
  has_many :players, through: :player_games

  # validates :correct_number_of_players

  # def correct_number_of_players
  #   if self.players.length != 2
  #     errors.add(:username, "can't be anything other than 2")
  #   end
  # end
end
