class FollowuptemplatesParameter < ApplicationRecord
  belongs_to :followuptemplate
  belongs_to :parameter

  paginates_per 10
end
