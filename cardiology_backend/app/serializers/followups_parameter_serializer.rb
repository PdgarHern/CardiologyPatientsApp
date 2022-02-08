class FollowupsParameterSerializer < ActiveModel::Serializer
  attributes :id
  has_one :followup
  has_one :parameter
end
