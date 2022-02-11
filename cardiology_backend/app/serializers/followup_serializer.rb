class FollowupSerializer < ActiveModel::Serializer
  attributes :id, :startDate, :endDate, :patient_id, :hospital_id

  belongs_to :followuptemplate
  belongs_to :doctor
end
