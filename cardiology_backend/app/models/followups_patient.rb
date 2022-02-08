class FollowupsPatient < ApplicationRecord
  belongs_to :followup
  belongs_to :patient
end
