class Doctor < ApplicationRecord
    belongs_to :user
    belongs_to :hospital
    has_many :followups
    has_many :chats, dependent: :destroy
    has_many :messages
    has_one_attached :img
end
