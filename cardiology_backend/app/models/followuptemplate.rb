class Followuptemplate < ApplicationRecord
    belongs_to :hospital
    has_many :followups
    has_and_belongs_to_many :parameters
end
