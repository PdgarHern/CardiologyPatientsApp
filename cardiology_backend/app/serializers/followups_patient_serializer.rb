class FollowupsPatientSerializer < ActiveModel::Serializer
  attributes :id
  has_one :followup
  has_one :patient
end
