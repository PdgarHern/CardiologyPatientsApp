class Followup < ApplicationRecord
    belongs_to :doctor
    has_and_belongs_to_many :patients
    has_and_belongs_to_many :parameters
end
