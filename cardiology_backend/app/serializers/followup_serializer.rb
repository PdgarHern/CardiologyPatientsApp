class FollowupSerializer < ActiveModel::Serializer
  attributes :id, :startDate, :endDate, :doctor_id, :patient_id, :followuptemplate_id, :hospital_id
end
