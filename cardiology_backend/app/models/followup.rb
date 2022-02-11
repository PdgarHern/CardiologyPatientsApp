class Followup < ApplicationRecord
    belongs_to :doctor
    belongs_to :patient
    belongs_to :hospital
    belongs_to :followuptemplate
end
