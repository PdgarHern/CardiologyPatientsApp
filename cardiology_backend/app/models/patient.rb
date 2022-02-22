class Patient < ApplicationRecord
    belongs_to :user
    has_many :followups
    has_many :chats
    has_many :messages
    has_one_attached :img
end
