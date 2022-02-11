class FollowupSerializer < ActiveModel::Serializer
  attributes :id, :startDate, :endDate, :patient_id, :followuptemplate_id, :hospital_id

  belongs_to :doctor
end
