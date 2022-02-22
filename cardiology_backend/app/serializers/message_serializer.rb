class MessageSerializer < ActiveModel::Serializer
  attributes :id, :value, :doctor_id, :patient_id
  has_one :chat
  # has_one :patient
  # has_one :doctor
end
