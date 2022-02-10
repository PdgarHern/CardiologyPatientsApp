class Parameter < ApplicationRecord
    belongs_to :hospital
    has_and_belongs_to_many :followuptemplates
end
