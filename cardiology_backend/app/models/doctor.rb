class Doctor < ApplicationRecord
    belongs_to :user
    belongs_to :hospital
    has_many :followups
    has_one_attached :img
end
