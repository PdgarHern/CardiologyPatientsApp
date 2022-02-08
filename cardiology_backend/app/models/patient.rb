class Patient < ApplicationRecord
    belongs_to :user
    has_and_belongs_to_many :followups
    has_one_attached :img
end
