class Hospital < ApplicationRecord
    has_many :doctors
    has_many :patients
    has_many :parameters
    has_many :followuptemplates
    has_many :followups
    has_many :answers
end
