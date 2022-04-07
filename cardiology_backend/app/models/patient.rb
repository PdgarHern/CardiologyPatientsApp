class Patient < ApplicationRecord
    belongs_to :user
    has_many :followups
    has_many :chats, dependent: :delete_all
    has_many :messages
    has_one_attached :img
    attr_accessor :email
    before_validation :create_user
    paginates_per 20
    def create_user
        user=User.new email: email
    end
       
end
