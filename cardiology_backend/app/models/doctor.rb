class Doctor < ApplicationRecord
    belongs_to :user
    has_many :followups
    has_one_attached :img
end
