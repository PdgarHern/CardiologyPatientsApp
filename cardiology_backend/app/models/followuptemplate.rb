class Followuptemplate < ApplicationRecord
    belongs_to :hospital
    has_many :followups, dependent: :delete_all
    has_and_belongs_to_many :parameters
end
