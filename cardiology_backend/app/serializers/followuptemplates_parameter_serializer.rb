class FollowuptemplatesParameterSerializer < ActiveModel::Serializer
  attributes :id, :followuptemplate_id
  # has_one :followuptemplate
  has_one :parameter
end
