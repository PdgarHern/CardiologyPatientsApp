class Answer < ApplicationRecord
    belongs_to :parameter
    belongs_to :followup
    belongs_to :hospital
end
