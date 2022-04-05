class Patient < ApplicationRecord
    belongs_to :user
    has_many :followups
    has_many :chats, dependent: :delete_all
    has_many :messages
    has_one_attached :img

    paginates_per 10
end
