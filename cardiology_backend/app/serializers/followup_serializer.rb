class FollowupSerializer < ActiveModel::Serializer
  attributes :id, :startDate, :endDate, :doctor_id, :parameters, :patients
end
