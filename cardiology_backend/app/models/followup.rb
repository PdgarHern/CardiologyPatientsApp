class Followup < ApplicationRecord
    belongs_to :doctor
    belongs_to :patient
    belongs_to :hospital
    belongs_to :followuptemplate
    has_many :answers, dependent: :delete_all

    paginates_per 10
end
