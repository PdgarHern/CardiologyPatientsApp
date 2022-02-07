class PatientSerializer < ActiveModel::Serializer
  attributes :id, :name, :clinicRecord, :gender, :birthDate, :phoneNumber, :consentRGPD, :user_id
end
